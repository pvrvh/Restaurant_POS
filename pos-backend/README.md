# Restaurant POS Backend API

Node.js backend for restaurant POS system using Express and MongoDB.

## Features

- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ JWT authentication
- ✅ Role-based access control (Admin, Waiter, Chef)
- ✅ MVC architecture
- ✅ Centralized error handling
- ✅ CORS enabled
- ✅ Environment variables with dotenv

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Edit `.env` file with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant_pos
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

3. Start MongoDB (if using local):
```bash
mongod
```

4. Run the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Orders
- `GET /api/orders` - Get all orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `POST /api/orders` - Create new order (Protected)
- `PUT /api/orders/:id/status` - Update order status (Protected)
- `DELETE /api/orders/:id` - Delete order (Admin only)

### Menu Items
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get menu item by ID
- `POST /api/menu` - Create menu item (Admin only)
- `PUT /api/menu/:id` - Update menu item (Admin only)
- `DELETE /api/menu/:id` - Delete menu item (Admin only)

### Tables
- `GET /api/tables` - Get all tables (Protected)
- `GET /api/tables/:id` - Get table by ID (Protected)
- `POST /api/tables` - Create table (Admin only)
- `PUT /api/tables/:id/status` - Update table status (Protected)
- `DELETE /api/tables/:id` - Delete table (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

## Project Structure

```
pos-backend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── orderController.js # Order management
│   ├── menuController.js  # Menu item management
│   ├── tableController.js # Table management
│   └── userController.js  # User management
├── middleware/
│   ├── authMiddleware.js  # JWT authentication
│   └── errorHandler.js    # Error handling
├── models/
│   ├── User.js           # User model
│   ├── Order.js          # Order model
│   ├── MenuItem.js       # Menu item model
│   └── Table.js          # Table model
├── routes/
│   ├── authRoutes.js     # Auth routes
│   ├── orderRoutes.js    # Order routes
│   ├── menuRoutes.js     # Menu routes
│   ├── tableRoutes.js    # Table routes
│   └── userRoutes.js     # User routes
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Dependencies
├── server.js            # Entry point
└── README.md            # Documentation
```

## User Roles

- **Admin**: Full access to all endpoints
- **Waiter**: Can manage orders and tables
- **Chef**: Can view and update order status

## License

ISC
