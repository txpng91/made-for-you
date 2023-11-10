const client = require('./index');

// Get all carts
async function getAllCarts() {
  try {
    const { rows } = await client.query(`SELECT * FROM carts`);
    return rows;
  } catch (error) {
    console.error(error.message);
  }
}

// Get all carts
async function getCartByUserId(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(`SELECT * FROM carts WHERE userId=$1;`, [userId]);
    return cart;
  } catch (error) {
    console.error(error.message);
  }
}

// Create a cart
async function createCart(body) {
  try {
    const jsonArrayData = JSON.stringify([
      { productId: body.productId, quantity: body.quantity },
    ]);
    const {
      rows: [cart],
    } = await client.query(
      `INSERT INTO carts (userId, products) VALUES ($1, $2) RETURNING *`,
      [body.userId, jsonArrayData]
    );
    return cart;
  } catch (error) {
    console.error(error.message);
  }
}

// Update products array from user's cart
async function updateCart(userId, fields = {}) {
  // Build a set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  if (setString === 0) {
    return;
  }

  try {
    const {
      rows: [updatedCart],
    } = await client.query(
      `UPDATE carts SET${setString} WHERE userId=${userId} RETURNING *;`,
      Object.values(fields)
    );
    return updatedCart;
  } catch (error) {
    throw error;
  }
}

module.exports = { getAllCarts, getCartByUserId, createCart, updateCart };
