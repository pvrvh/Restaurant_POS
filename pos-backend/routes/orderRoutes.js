const express = require('express');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getOrders).post(protect, createOrder);
router.route('/:id').get(protect, getOrder).delete(protect, admin, deleteOrder);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
