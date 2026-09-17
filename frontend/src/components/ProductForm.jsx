import { useState } from 'react'
import './ProductForm.css'

const API_URL =
  'https://my-json-server.typicode.com/haidiralii/frontend-assessment-ali/products'

const CATEGORIES = ['Electronics', 'Home & Kitchen', 'Apparel']

const STATUSES = ['In Stock', 'Out of Stock']

const INITIAL_FORM_DATA = {
  name: '',
  category: '',
  price: '',
  status: 'In Stock',
}

function validateField(field, value) {
  switch (field) {
    case 'name':
      if (!value.trim()) {
        return 'Name is required.'
      }

      return ''

    case 'category':
      if (!CATEGORIES.includes(value)) {
        return 'Please select a valid category.'
      }

      return ''

    case 'price': {
      if (!value.trim()) {
        return 'Price is required.'
      }

      const numericPrice = Number(value)

      if (!Number.isFinite(numericPrice)) {
        return 'Price must be a valid number.'
      }

      if (numericPrice <= 0) {
        return 'Price must be greater than 0.'
      }

      return ''
    }

    case 'status':
      if (!STATUSES.includes(value)) {
        return 'Please select a valid status.'
      }

      return ''

    default:
      return ''
  }
}

function validateForm(formData) {
  const errors = {}

  Object.keys(formData).forEach((field) => {
    const error = validateField(field, formData[field])

    if (error) {
      errors[field] = error
    }
  })

  return errors
}

function ProductForm({
  product,
  onClose,
  onProductCreated,
  onProductUpdated,
}) {
  const isEditMode = Boolean(product)

  const [formData, setFormData] = useState(
    product
      ? {
          name: product.name,
          category: product.category,
          price: String(product.price),
          status: product.status,
        }
      : { ...INITIAL_FORM_DATA },
  )

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const isFormValid = Object.keys(validateForm(formData)).length === 0

  function handleChange(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }))

    setSubmitError('')

    if (touched[field]) {
      const error = validateField(field, value)

      setErrors((currentErrors) => {
        const nextErrors = { ...currentErrors }

        if (error) {
          nextErrors[field] = error
        } else {
          delete nextErrors[field]
        }

        return nextErrors
      })
    }
  }

  function handleBlur(field) {
    setTouched((currentTouched) => ({
      ...currentTouched,
      [field]: true,
    }))

    const error = validateField(field, formData[field])

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors }

      if (error) {
        nextErrors[field] = error
      } else {
        delete nextErrors[field]
      }

      return nextErrors
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateForm(formData)

    setErrors(validationErrors)

    setTouched({
      name: true,
      category: true,
      price: true,
      status: true,
    })

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    const productData = {
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      status: formData.status,
    }

    try {
      const response = await fetch(
        isEditMode ? `${API_URL}/${product.id}` : API_URL,
        {
          method: isEditMode ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            isEditMode
              ? productData
              : {
                  ...productData,
                  createdAt: new Date().toISOString(),
                },
          ),
        },
      )

      if (!response.ok) {
        throw new Error(
          isEditMode
            ? 'Failed to update product.'
            : 'Failed to create product.',
        )
      }

      const savedProduct = await response.json()

      if (isEditMode) {
        onProductUpdated(savedProduct)
      } else {
        onProductCreated(savedProduct)
      }

      onClose()
    } catch (error) {
      setSubmitError(
        isEditMode
          ? 'Failed to update product. Please try again.'
          : 'Failed to create product. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="product-form-overlay">
      <div className="product-form-modal">
        <div className="product-form-header">
          <div>
            <h2>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>

            <p>
              {isEditMode
                ? 'Update product information.'
                : 'Add a new product.'}
            </p>
          </div>

          <button
            type="button"
            className="product-form-close"
            onClick={onClose}
            aria-label="Close form"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="product-form-field">
            <label htmlFor="product-name">Name</label>

            <input
              id="product-name"
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(event) =>
                handleChange('name', event.target.value)
              }
              onBlur={() => handleBlur('name')}
              aria-invalid={Boolean(errors.name)}
              disabled={isSubmitting}
            />

            {errors.name && (
              <span className="product-form-error">
                {errors.name}
              </span>
            )}
          </div>

          <div className="product-form-field">
            <label htmlFor="product-category">Category</label>

            <select
              id="product-category"
              value={formData.category}
              onChange={(event) =>
                handleChange('category', event.target.value)
              }
              onBlur={() => handleBlur('category')}
              aria-invalid={Boolean(errors.category)}
              disabled={isSubmitting}
            >
              <option value="">Select category</option>

              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <span className="product-form-error">
                {errors.category}
              </span>
            )}
          </div>

          <div className="product-form-field">
            <label htmlFor="product-price">Price</label>

            <input
              id="product-price"
              type="number"
              min="0"
              step="any"
              placeholder="Enter product price"
              value={formData.price}
              onChange={(event) =>
                handleChange('price', event.target.value)
              }
              onBlur={() => handleBlur('price')}
              aria-invalid={Boolean(errors.price)}
              disabled={isSubmitting}
            />

            {errors.price && (
              <span className="product-form-error">
                {errors.price}
              </span>
            )}
          </div>

          <div className="product-form-field">
            <label htmlFor="product-status">Status</label>

            <select
              id="product-status"
              value={formData.status}
              onChange={(event) =>
                handleChange('status', event.target.value)
              }
              onBlur={() => handleBlur('status')}
              aria-invalid={Boolean(errors.status)}
              disabled={isSubmitting}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {errors.status && (
              <span className="product-form-error">
                {errors.status}
              </span>
            )}
          </div>

          {submitError && (
            <div className="product-form-error">
              {submitError}
            </div>
          )}

          <div className="product-form-actions">
            <button
              type="button"
              className="product-form-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="product-form-submit"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting
                ? isEditMode
                  ? 'Saving...'
                  : 'Creating...'
                : isEditMode
                  ? 'Save Changes'
                  : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm