import { useEffect, useState } from 'react'
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

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
  }, [])

  return (
    <main className="app">
      <div className="container">
        <header className="page-header">
          <h1>Product Dashboard</h1>
          <p>Manage and view your products.</p>
        </header>

        <section className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  )
}

export default App