# frontend-assessment-ali

Junior Frontend Developer Technical Assessment

A React-based e-commerce product dashboard built for the Junior Frontend Developer Technical Assessment.

The application demonstrates product management functionality including:

- Product listing
- Search by product name
- Category and status filtering
- Product details
- Create product
- Edit product
- Delete product
- Form validation
- Loading and error states
- Toast notifications
- Optimistic UI updates with rollback

## Tech Stack

- JavaScript (ES6+)
- React
- Vite
- HTML5
- CSS3
- my-json-server

## Repository

GitHub:

https://github.com/haidiralii/frontend-assessment-ali

## Live API

The application uses my-json-server as a mock REST API.

API endpoint:

https://my-json-server.typicode.com/haidiralii/frontend-assessment-ali/products

Available operations:

- GET `/products`
- GET `/products/:id`
- POST `/products`
- PATCH `/products/:id`
- DELETE `/products/:id`

> **Catatan:** Perubahan dari my-json-server hanya disimpan sementara di memory dan tidak disimpan kembali ke repository GitHub. Data dapat kembali seperti semula tergantung session server.

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/haidiralii/frontend-assessment-ali.git
```

Go to the frontend directory:

```bash
cd frontend-assessment-ali/frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

### Environment Variables

No environment variables are required for this project.

---

## Project Architecture

The project is kept simple and component-based.

```text
frontend-assessment-ali/
├── db.json
├── logic-assessment.js
├── logic-assessment.test.js
├── README.md
│
└── frontend/
    └── src/
        ├── components/
        │   ├── ProductDetails.jsx
        │   ├── ProductDetails.css
        │   ├── ProductForm.jsx
        │   └── ProductForm.css
        │
        ├── App.jsx
        ├── App.css
        ├── index.css
        └── main.jsx
```

### Key Components

- `App.jsx` handles the main product state, API requests, search, filters, CRUD operations, loading states, errors, and toast notifications.
- `ProductForm.jsx` is a reusable form for both create and edit operations, including field validation.
- `ProductDetails.jsx` displays product information in a read-only view.
- `logic-assessment.js` contains the vanilla JavaScript solutions for the logic assessment.
- `db.json` contains the seeded product data used by my-json-server.

---

## Decisions & Trade-offs

### React State Management

I used React's built-in `useState` and `useEffect` instead of an external state management library.

The application is small and the product state is mainly handled by `App.jsx`, so adding Redux or another state management library would add unnecessary complexity.

### Reusable Product Form

The same `ProductForm` component is used for both create and edit.

This keeps the form and validation logic in one place instead of creating separate components for each operation.

### Optimistic Updates

For create, edit, and delete operations, the UI is updated immediately before waiting for the API response.

The server response is then used to reconcile the local state. If the request fails, the previous state is restored and an error toast is shown.

This makes the interface feel faster, but the trade-off is that the UI can temporarily show a change before the server confirms it.

### Loading & Error Handling

A loading skeleton is shown while the initial product data is being fetched.

If the initial request fails, the application shows an error state with a retry action. Create, edit, and delete failures are handled with toast notifications and rollback when needed.

---

## Improvements

If I had more time, I would consider:

- Moving API requests into a separate API/service layer.
- Moving the API URL into an environment variable.
- Adding automated tests for validation, CRUD, and error handling.
- Improving accessibility, especially keyboard navigation and focus management.
- Replacing the native delete confirmation with a custom confirmation modal.
- Adding pagination if the product data becomes larger.