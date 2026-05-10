# 🛒 Full-Stack E-Commerce Platform

A modern full-stack E-Commerce web application built using **ASP.NET Core Web API**, **React.js**, **Tailwind CSS**, and **SQL Server** following **Clean Architecture** principles.

This project demonstrates enterprise-level backend architecture, JWT authentication, role-based authorization, responsive frontend UI, admin dashboard management, shopping cart workflow, and scalable API integration.

---

# 🚀 Features

## 👤 Authentication & Authorization
- JWT Authentication
- Role-Based Authorization (Admin/User)
- Protected Routes
- Secure Password Hashing using BCrypt

---

## 🛍️ E-Commerce Features
- Product Listing
- Product Details
- Shopping Cart System
- Quantity Management
- Checkout Workflow
- Order Management
- Cart Badge
- Responsive Product Cards

---

## 👨‍💼 Admin Dashboard
- Add Products
- Edit Products
- Delete Products
- Product Image Upload
- Product Management Dashboard
- Role-Protected Admin Routes

---

## 🎨 Modern Frontend UI
- React.js
- Tailwind CSS
- Responsive Design
- Modern Navbar
- Hero Landing Page
- Clean Shopping Experience

---

## 🧱 Backend Architecture
- ASP.NET Core Web API
- Clean Architecture
- Repository Pattern
- Entity Framework Core
- SQL Server Integration
- RESTful API Design

---

# 🧠 Planned Advanced Features

## 🎨 Option A — Advanced UI/UX
- Dark Mode
- Toast Notifications
- Loading Skeletons
- Product Detail Pages
- Animations & Micro-interactions
- Modern Dashboard Charts
- Better Mobile Responsiveness

## 💳 Option B — Payment Gateway Integration
- Stripe Payment Integration
- Khalti Payment Gateway
- Order Payment Tracking
- Payment Verification
- Checkout Confirmation

## 📊 Option C — Analytics Dashboard
- Revenue Analytics
- Orders Analytics
- Product Sales Charts
- Monthly Statistics
- Admin Overview Dashboard

---

# 🏗️ Project Structure

```text
EcommercePlatform/
│
├── backend/
│   │
│   ├── Ecommerce.API/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   ├── Extensions/
│   │   ├── wwwroot/
│   │   │   └── images/
│   │   ├── Program.cs
│   │   └── appsettings.json
│   │
│   ├── Ecommerce.Application/
│   │   ├── DTOs/
│   │   ├── Interfaces/
│   │   ├── Services/
│   │   └── Features/
│   │
│   ├── Ecommerce.Domain/
│   │   ├── Entities/
│   │   ├── Enums/
│   │   └── Common/
│   │
│   ├── Ecommerce.Infrastructure/
│   │   ├── Data/
│   │   ├── Repositories/
│   │   ├── Services/
│   │   ├── Migrations/
│   │   └── DependencyInjection/
│   │
│   └── EcommerceSolution.sln
│
├── frontend/
│   └── ecommerce-ui/
│       ├── public/
│       ├── src/
│       │   ├── api/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── context/
│       │   ├── hooks/
│       │   ├── layouts/
│       │   ├── pages/
│       │   ├── routes/
│       │   ├── utils/
│       │   ├── App.js
│       │   └── index.js
│       │
│       ├── package.json
│       └── tailwind.config.js
│
├── docs/
│   └── screenshots/
│
├── .gitignore
├── README.md
└── LICENSE
```

---

# ⚙️ Technologies Used

## Backend
- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQL Server
- JWT Authentication
- BCrypt

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

## Tools & Platforms
- Visual Studio
- VS Code
- Git & GitHub
- Swagger
- Postman

---

# 🔐 Authentication Flow

```text
User Login/Register
        ↓
JWT Token Generated
        ↓
Token Stored in LocalStorage
        ↓
Axios Interceptor Attaches Token
        ↓
Protected API Access
```

---

# 🛒 E-Commerce Workflow

```text
Browse Products
      ↓
Add To Cart
      ↓
Update Quantity
      ↓
Checkout
      ↓
Create Order
      ↓
Clear Cart
```

---

# 🚀 Backend Setup

## 1️⃣ Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

---

## 2️⃣ Navigate to Backend

```bash
cd backend
```

---

## 3️⃣ Restore Packages

```bash
dotnet restore
```

---

## 4️⃣ Update Database

```bash
Update-Database
```

---

## 5️⃣ Run Backend

```bash
dotnet run
```

Backend runs on:

```text
https://localhost:7068
```

---

# 🚀 Frontend Setup

## 1️⃣ Navigate to Frontend

```bash
cd frontend/ecommerce-ui
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Start React App

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 📸 Screenshots

## Home Page

Add screenshot:

```text
docs/screenshots/home.png
```

---

## Products Page

Add screenshot:

```text
docs/screenshots/products.png
```

---

## Admin Dashboard

Add screenshot:

```text
docs/screenshots/admin.png
```

---

# 🔥 Key Learnings

This project helped strengthen skills in:

- Full-Stack Development
- REST API Design
- Authentication & Authorization
- Clean Architecture
- Repository Pattern
- React State Management
- Database Design
- File Upload Handling
- Real-world E-Commerce Workflow
- Responsive UI Development

---

# 📌 Future Improvements

- Wishlist System
- Product Reviews & Ratings
- Search & Filtering
- Pagination
- Email Notifications
- Real-Time Inventory Tracking
- Deployment to Cloud
- Docker Support
- CI/CD Pipeline

---

# 👨‍💻 Author

## Sanjeev Parajuli

- Full-Stack Developer
- ASP.NET Core & React Developer
- Passionate about scalable web applications

---

# ⭐ Support

If you found this project helpful:

⭐ Star the repository
🍴 Fork the project
📢 Share feedback

---

# 📄 License

This project is licensed under the MIT License.

