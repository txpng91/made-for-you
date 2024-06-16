const API_URL = `http://localhost:5000/v1/api`;

/************Account Form************/

// Register user method
export const registerUser = async (newUser) => {
  try {
    const res = await fetch(`${API_URL}/users/sign-up`, {
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
    const res = await fetch(`${API_URL}/users/login`, {
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

export async function getAllProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, {
      headers: {
        'Content-Type': 'application/json',
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
    const res = await fetch(`${API_URL}/products/${id}`);
    const product = await res.json();
    return product;
  } catch (error) {
    console.error(`Unable to fetch product!`, error);
  }
}

/**************Users**************/

// Get user data
export async function getUserData(id) {
  try {
    const res = await fetch(`${API_URL}/users/${id}`);
    const data = await res.json();
    delete data.pasword;
    return data;
  } catch (error) {
    console.error(`Unable to retrieve all users to filter!`, error);
  }
}

/**************Carts*************/

export const getUsersCart = async (id) => {
  try {
    const res = await fetch(`${API_URL}/carts/${id}`);
    const cart = await res.json();
    return cart;
  } catch (error) {
    console.error(`Unable to get the users cart.`, error);
  }
};

export const createCart = async (id) => {
  try {
    const res = await fetch(`${API_URL}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const cart = await res.json();
    return cart;
  } catch (error) {
    console;
  }
};

export const updateCart = async (id, products) => {
  try {
    const res = await fetch(`${API_URL}/carts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products: products }),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("We're having trouble updating your cart.", error);
  }
};
