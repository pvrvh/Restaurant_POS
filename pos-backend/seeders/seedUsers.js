const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const Table = require('../models/Table');

dotenv.config();

const users = [
  {
    name: 'Parth Sarthi',
    email: 'parthsarthi2103@restro.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'John Waiter',
    email: 'waiter@restaurant.com',
    password: 'waiter123',
    role: 'waiter',
  },
  {
    name: 'Chef Mike',
    email: 'chef@restaurant.com',
    password: 'chef123',
    role: 'chef',
  },
];

const menuItems = [
  {
    name: 'Spring Rolls',
    description: 'Crispy vegetable spring rolls with sweet chili sauce',
    price: 120,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783',
  },
  {
    name: 'Chicken Wings',
    description: 'Spicy buffalo wings with ranch dressing',
    price: 180,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d',
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan and croutons',
    price: 150,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
  },
  {
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice with tender chicken pieces',
    price: 280,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
  },
  {
    name: 'Paneer Tikka Masala',
    description: 'Cottage cheese in creamy tomato gravy',
    price: 250,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7',
  },
  {
    name: 'Grilled Salmon',
    description: 'Fresh salmon with herbs and lemon butter',
    price: 450,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
  },
  {
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with chocolate ganache',
    price: 120,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
  },
  {
    name: 'Ice Cream Sundae',
    description: 'Vanilla ice cream with chocolate sauce and nuts',
    price: 100,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
  },
  {
    name: 'Mango Lassi',
    description: 'Sweet and creamy mango yogurt drink',
    price: 80,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4',
  },
  {
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    price: 90,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d',
  },
];

const tables = [
  { tableNumber: 1, capacity: 2, status: 'available' },
  { tableNumber: 2, capacity: 4, status: 'available' },
  { tableNumber: 3, capacity: 2, status: 'available' },
  { tableNumber: 4, capacity: 6, status: 'available' },
  { tableNumber: 5, capacity: 4, status: 'available' },
  { tableNumber: 6, capacity: 2, status: 'available' },
  { tableNumber: 7, capacity: 4, status: 'available' },
  { tableNumber: 8, capacity: 8, status: 'available' },
  { tableNumber: 9, capacity: 4, status: 'available' },
  { tableNumber: 10, capacity: 2, status: 'available' },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await MenuItem.deleteMany();
    await Table.deleteMany();
    console.log('🗑️  Cleared existing data');

    // Insert users (using create to trigger password hashing middleware)
    const createdUsers = [];
    for (const userData of users) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }
    console.log(`✅ ${createdUsers.length} users created`);

    // Insert menu items
    const createdMenuItems = await MenuItem.insertMany(menuItems);
    console.log(`✅ ${createdMenuItems.length} menu items created`);

    // Insert tables
    const createdTables = await Table.insertMany(tables);
    console.log(`✅ ${createdTables.length} tables created`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin - Email: admin@restaurant.com, Password: admin123');
    console.log('Waiter - Email: waiter@restaurant.com, Password: waiter123');
    console.log('Chef - Email: chef@restaurant.com, Password: chef123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
