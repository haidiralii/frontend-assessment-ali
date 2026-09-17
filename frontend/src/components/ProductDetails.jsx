import './ProductDetails.css'

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

function ProductDetails({ product, onClose }) {
  if (!product) {
    return null
  }

  return (
    <div className="product-details-overlay">
      <section
        className="product-details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-details-title"
      >
        <div className="product-details-header">
          <div>
            <p className="product-details-label">Product Details</p>
            <h2 id="product-details-title">{product.name}</h2>
          </div>

          <button
            type="button"
            className="product-details-close"
            onClick={onClose}
            aria-label="Close product details"
          >
            ×
          </button>
        </div>

        <div className="product-details-content">
          <div className="product-detail-item">
            <span className="product-detail-label">Name</span>
            <span className="product-detail-value">
              {product.name}
            </span>
          </div>

          <div className="product-detail-item">
            <span className="product-detail-label">Category</span>
            <span className="product-detail-value">
              <span className="badge category-badge">
                {product.category}
              </span>
            </span>
          </div>

          <div className="product-detail-item">
            <span className="product-detail-label">Price</span>
            <span className="product-detail-value">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="product-detail-item">
            <span className="product-detail-label">Status</span>
            <span className="product-detail-value">
              <span
                className={`badge status-badge ${
                  product.status === 'In Stock'
                    ? 'status-in-stock'
                    : 'status-out-of-stock'
                }`}
              >
                {product.status}
              </span>
            </span>
          </div>

          <div className="product-detail-item">
            <span className="product-detail-label">Created</span>
            <span className="product-detail-value">
              {formatDate(product.createdAt)}
            </span>
          </div>

          <div className="product-detail-item">
            <span className="product-detail-label">Product ID</span>
            <span className="product-detail-value">
              {product.id}
            </span>
          </div>
        </div>

        <div className="product-details-actions">
          <button
            type="button"
            className="product-details-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails