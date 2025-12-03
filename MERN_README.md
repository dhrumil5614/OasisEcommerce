# Oasis E-Commerce - MERN Stack Application

A complete, full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, product management, shopping cart, wishlist, payment processing with Stripe, and order management.

## Features

### User Features
- ✅ User registration and login with JWT authentication
- ✅ User profile management with address information
- ✅ Password change functionality
- ✅ Browse products with search and filtering
- ✅ Product details page with reviews
- ✅ Add products to cart with quantity management
- ✅ Wishlist functionality
- ✅ Secure checkout with Stripe payment integration
- ✅ Order history and tracking
- ✅ Sell products (user marketplace)

### Admin Features
- ✅ Category management
- ✅ Product moderation
- ✅ Order management and status updates

### Technical Features
- ✅ RESTful API architecture
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ File upload for product images
- ✅ Redux Toolkit for state management
- ✅ Responsive design with Tailwind CSS
- ✅ Form validation
- ✅ Error handling and user feedback
- ✅ Pagination for product listings

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Stripe** - Payment processing
- **React Icons** - Icon library
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Stripe** - Payment processing
- **Helmet** - Security headers
- **Morgan** - Logging
- **CORS** - Cross-origin resource sharing

## Project Structure

```
OasisEcommerce/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── productController.js
│   │   └── wishlistController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Wishlist.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── productRoutes.js
│   │   └── wishlistRoutes.js
│   ├── uploads/
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   └── SellProduct.jsx
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── orderSlice.js
│   │   │   │   ├── productSlice.js
│   │   │   │   └── wishlistSlice.js
│   │   │   └── store.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── cartService.js
│   │   │   ├── orderService.js
│   │   │   ├── paymentService.js
│   │   │   ├── productService.js
│   │   │   └── wishlistService.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── MERN_README.md
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Stripe account for payment processing

### 1. Clone the repository
```bash
git clone <repository-url>
cd OasisEcommerce
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your configurations
# Required variables:
# - MONGODB_URI (MongoDB connection string)
# - JWT_SECRET (random secret key)
# - STRIPE_SECRET_KEY (from Stripe dashboard)
# - STRIPE_PUBLISHABLE_KEY (from Stripe dashboard)
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your configurations
# Required variables:
# - VITE_API_URL (backend API URL, default: http://localhost:5000/api)
# - VITE_STRIPE_PUBLISHABLE_KEY (from Stripe dashboard)
```

### 4. Database Setup

The application will automatically connect to MongoDB when you start the backend server. Make sure your MongoDB instance is running.

To seed the database with sample categories, you can create a seed script or add categories manually through the API.

### 5. Running the Application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/oasis-ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products (with pagination & filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Protected)
- `PUT /api/products/:id` - Update product (Protected)
- `DELETE /api/products/:id` - Delete product (Protected)
- `POST /api/products/:id/reviews` - Add product review (Protected)
- `POST /api/products/upload` - Upload product image (Protected)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:productId` - Update cart item quantity (Protected)
- `DELETE /api/cart/:productId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Wishlist
- `GET /api/wishlist` - Get user wishlist (Protected)
- `POST /api/wishlist` - Add item to wishlist (Protected)
- `DELETE /api/wishlist/:productId` - Remove item from wishlist (Protected)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Payment
- `POST /api/payment/create-payment-intent` - Create Stripe payment intent (Protected)
- `GET /api/payment/config` - Get Stripe publishable key

## Key Features Explained

### Authentication
- JWT-based authentication system
- Passwords hashed with bcrypt
- Protected routes using middleware
- User sessions managed with Redux

### Shopping Cart
- Real-time cart updates
- Quantity management
- Automatic price calculation
- Persistent cart data

### Payment Processing
- Stripe integration for secure payments
- Payment intent creation
- Order confirmation after successful payment
- Automatic inventory updates

### Product Management
- Image upload functionality
- Category-based organization
- Search and filter capabilities
- Product reviews and ratings

## Deployment

### Backend Deployment (Heroku example)
```bash
# Install Heroku CLI and login
heroku login

# Create new Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set STRIPE_SECRET_KEY=your_stripe_secret_key

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set environment variables in your hosting dashboard

## Testing

To test the payment functionality:
- Use Stripe test card: 4242 4242 4242 4242
- Any future expiry date
- Any 3-digit CVC

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@oasis-ecommerce.com or create an issue in the repository.

## Acknowledgments

- Original Flask application provided the foundation for features
- MERN stack community for excellent documentation
- Stripe for payment processing capabilities
