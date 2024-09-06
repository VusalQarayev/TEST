// URL for the backend API
const apiUrl = 'http://localhost:5000/api';

// Fetch products from the backend API and display them
async function fetchProducts() {
    try {
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        populateProductCarousel(products); // Call function to display products on the page
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error fetching products. Please try again later.');
    }
}

// Populate the product carousel with fetched products
function populateProductCarousel(products) {
    const track = document.querySelector('.product-carousel-track');
    track.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>AZN ${product.price}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
        `;
        track.appendChild(productElement);
    });
}

// Add a product to the cart by sending a POST request to the backend
async function addToCart(productId) {
    try {
        const response = await fetch(`${apiUrl}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId }) // Send product ID in the request body
        });

        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }

        alert('Product added to cart!');
        updateCartDisplay(); // Refresh cart display
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding product to cart. Please try again.');
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    const email = document.querySelector('#login-form input[type="email"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;

    try {
        const response = await fetch(`${apiUrl}/account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) // Send login credentials
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const user = await response.json();
        displayUserProfile(user); // Display user info on successful login
        alert('Logged in successfully!');
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed. Please check your credentials.');
    }
}

// Handle user logout
async function handleLogout() {
    try {
        const response = await fetch(`${apiUrl}/account/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        alert('Logged out successfully!');
        // Clear user information from UI or redirect to the homepage
        document.getElementById('user-profile').innerHTML = '';
    } catch (error) {
        console.error('Error logging out:', error);
        alert('Error logging out. Please try again.');
    }
}

// Display user profile after login
function displayUserProfile(user) {
    const userProfile = document.getElementById('user-profile');
    userProfile.innerHTML = `
        <h3>Welcome, ${user.firstName} ${user.lastName}</h3>
        <button onclick="handleLogout()">Logout</button>
    `;
}

// Handle registration form submission
async function handleRegister(event) {
    event.preventDefault();
    const firstName = document.querySelector('#register-form input[name="firstName"]').value;
    const lastName = document.querySelector('#register-form input[name="lastName"]').value;
    const email = document.querySelector('#register-form input[name="email"]').value;
    const password = document.querySelector('#register-form input[name="password"]').value;

    try {
        const response = await fetch(`${apiUrl}/account/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password }) // Send registration details
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        alert('Registered successfully! You can now log in.');
    } catch (error) {
        console.error('Error registering:', error);
        alert('Registration failed. Please try again.');
    }
}

// Update cart display (example function, needs implementation based on your UI)
function updateCartDisplay() {
    // Fetch cart items from backend and update the cart UI
    // Example implementation: fetch(`${apiUrl}/cart`).then(response => response.json()).then(updateCartUI);
}

// Fetch products when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);

// Add event listener for login form
document.querySelector('#login-form').addEventListener('submit', handleLogin);

// Add event listener for register form (if you have one)
document.querySelector('#register-form').addEventListener('submit', handleRegister);
