# 🛍️ Nike Shoes – E-Commerce Frontend (Next.js)

A modern e-commerce frontend built with **Next.js (App Router)** showcasing product listing, product variations, order placement, order success flow, and user orders — integrated with backend APIs.

---

## 🚀 Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **GSAP** – hover animations
- **JWT Authentication**
- **REST APIs**

---

## ✨ Features

### 🧾 Product Listing
- Fetches products dynamically from API
- Displays product image, name, colors, and sizes
- Smooth hover animation using GSAP
- Color switching updates product image
- Clean, minimal UI based on Figma design

### 🛒 Purchase Product
- Buy product using **variation_product_id**
- JWT-protected API request
- On successful purchase:
  - Redirects to **Order Success** page
  - Displays order ID, product name, cropped image, price, and order time

### ✅ Order Success Page
- Receives order details via URL search params
- Displays confirmation UI as per Figma
- Shows:
  - Product image
  - Product name
  - Order ID
  - Amount paid
  - Order date & time

### 📦 My Orders Page
- Fetches user orders from API
- JWT protected
- Displays:
  - Product name (includes color & size as per backend response)
  - Order ID
  - Order date
  - Paid amount
- Uses static placeholder image (backend does not provide image)

---

## 🔐 Authentication

- JWT token is stored in `localStorage`
- Required for:
  - Purchasing product
  - Fetching user orders

---

## 🔗 API Endpoints Used

### Get Products
