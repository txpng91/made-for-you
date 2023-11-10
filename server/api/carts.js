const express = require('express');
const router = express.Router();

// Import DB Functions
const {
  getAllCarts,
  getCartByUserId,
  createCart,
  updateCart,
} = require('../db/carts');

// GET /api/carts = PUBLIC
router.get('/', async (req, res, next) => {
  try {
    const carts = await getAllCarts();
    res.json(carts);
  } catch (error) {
    next(error);
  }
});

// GET /api/carts/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cart = await getCartByUserId(userId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// POST /api/carts
router.post('/', async (req, res, next) => {
  try {
    const newCart = await createCart(req.body);
    res.json(newCart);
  } catch (error) {
    next(error);
  }
});

// PUT /api/carts/:userId
router.patch('/:userId', async (req, res, next) => {
  try {
    const updatedCart = await updateCart(req.params.userId, req.body);
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
