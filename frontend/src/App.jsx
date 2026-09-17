import { useEffect, useState } from 'react'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import './App.css'

const API_URL =
  'https://my-json-server.typicode.com/haidiralii/frontend-assessment-ali/products'

const CATEGORIES = ['Electronics', 'Home & Kitchen', 'Apparel']

const STATUSES = ['In Stock', 'Out of Stock']

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

function App() {
  const [products, setProducts] = useState([])

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesCategory =
      categoryFilter === '' || product.category === categoryFilter

    const matchesStatus =
      statusFilter === '' || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  function openCreateForm() {
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  function openEditForm(product) {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setSelectedProduct(null)
  }

  function openProductDetails(product) {
    setSelectedProduct(product)
    setIsDetailsOpen(true)
  }

  function closeProductDetails() {
    setIsDetailsOpen(false)
    setSelectedProduct(null)
  }

  function handleProductCreated(createdProduct) {
    setProducts((currentProducts) => [
      ...currentProducts,
      createdProduct,
    ])
  }

  function handleProductUpdated(updatedProduct) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product,
      ),
    )
  }

  async function handleProductDelete(product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`,
    )

    if (!confirmed) {
      return
    }

    setIsDeleting(true)
    setDeleteError('')

    try {
      const response = await fetch(
        `${API_URL}/${product.id}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        throw new Error('Failed to delete product.')
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (currentProduct) =>
            currentProduct.id !== product.id,
        ),
      )
    } catch (error) {
      setDeleteError(
        `Failed to delete ${product.name}. Please try again.`,
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <main className="app">
      <div className="container">
        <header className="page-header">
          <div className="page-header-content">
            <h1>Product Dashboard</h1>
            <p>Manage and view your products.</p>
          </div>

          <button
            type="button"
            className="add-product-button"
            onClick={openCreateForm}
          >
            <span className="add-product-icon">+</span>
            Add Product
          </button>
        </header>

        <section className="filter-toolbar">
          <div className="search-field">
            <label htmlFor="search">Search Product</label>

            <input
              id="search"
              type="search"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <div className="filter-field">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
            >
              <option value="">All Categories</option>

              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="status">Status</label>

            <select
              id="status"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="">All Statuses</option>

              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </section>

        {deleteError && (
          <div className="empty-state">
            <p>{deleteError}</p>
          </div>
        )}

        <section className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="product-name">{product.name}</td>

                  <td>
                    <span className="badge category-badge">
                      {product.category}
                    </span>
                  </td>

                  <td>{formatPrice(product.price)}</td>

                  <td>
                    <span
                      className={`badge status-badge ${
                        product.status === 'In Stock'
                          ? 'status-in-stock'
                          : 'status-out-of-stock'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td>{formatDate(product.createdAt)}</td>

                  <td>
                    <div className="product-actions">
                      <button
                        type="button"
                        className="view-product-button"
                        onClick={() =>
                          openProductDetails(product)
                        }
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="edit-product-button"
                        onClick={() => openEditForm(product)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-product-button"
                        onClick={() =>
                          handleProductDelete(product)
                        }
                        disabled={isDeleting}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <p>No products found.</p>
            </div>
          )}
        </section>
      </div>

      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          onClose={closeForm}
          onProductCreated={handleProductCreated}
          onProductUpdated={handleProductUpdated}
        />
      )}

      {isDetailsOpen && (
        <ProductDetails
          product={selectedProduct}
          onClose={closeProductDetails}
        />
      )}
    </main>
  )
}

export default App