const API_URL = `https://fakestoreapi.com`;

/************Account Form************/

// Register user method
export const registerUser = async (newUser) => {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Unable to register user for this reason: ', error);
  }
};

// Log in use method

export const logUser = async (loginUser) => {
  try {
    const res = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUser),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(`Unable to log in user for this reason: `, error);
  }
};

/**************Products*************/

// Fetch all products

export async function getAllProducts(token) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(`Unable to retrieve products!`, error);
  }
}

// Fatch a product from products

export async function getAProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();
    return product;
  } catch (error) {
    console.error(`Unable to fetch product!`, error);
  }
}

/**************Users**************/

// Get all users
export async function getUsers(passedUsername) {
  try {
    const res = await fetch(`https://fakestoreapi.com/users`);
    const result = await res.json();
    const userData = result.find(
      (filteredUser) => filteredUser.username === passedUsername
    );
    return userData;
  } catch (error) {
    console.error(`Unable to retrieve all users to filter!`, error);
  }
}

/**************Carts*************/

export const getUsersCart = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/carts`);
    const carts = await res.json();
    const cart = carts.find((usersCart) => usersCart.userId === id);

    return cart.products;
  } catch (error) {
    console.error(`Unable to get the user's cart.`, error);
  }
};
