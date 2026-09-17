import { useEffect, useState } from 'react'
import ProductForm from './components/ProductForm'
import './App.css'

const API_URL =
  'https://my-json-server.typicode.com/haidiralii/frontend-assessment-ali/products'

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

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
  }, [])

  const categories = [...new Set(products.map((product) => product.category))]

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

  return (
    <main className="app">
      <div className="container">
        <header className="page-header">
          <div>
            <h1>Product Dashboard</h1>
            <p>Manage and view your products.</p>
          </div>

          <button
            type="button"
            className="add-product-button"
            onClick={() => {
              setSelectedProduct(null)
              setIsFormOpen(true)
            }}
          >
            + Add Product
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
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="filter-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="">All Categories</option>

              {categories.map((category) => (
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
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </section>

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

                  {/* Tambahkan ini */}
                  <td>
                    <button
                      type="button"
                      className="edit-product-button"
                      onClick={() => {
                        setSelectedProduct(product)
                        setIsFormOpen(true)
                      }}
                    >
                      Edit
                    </button>
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
          onClose={() => {
            setIsFormOpen(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </main>
  )
}

export default App