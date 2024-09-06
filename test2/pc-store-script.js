
// Updated product data with additional items
const products = [
    { name: 'ADESSO IMOUSES50', price: 25, image: '/img/mouseadesso.jpg' },
    { name: 'Logitech M100 Wired Ambidextrous', price: 20, image: '/img/mouselogitech.jpg' },
    { name: 'NZXT H9 Flow', price: 300, image: '/img/casenzth.jpg' },
    { name: 'CORSAIR 3500X ARGB', price: 199, image: '/img/casepurple.jpg' },
    { name: 'MSI Apex Pro', price: 180, image: '/img/msiheadset.jpg' },
    { name: 'Razer BlackWidow V3', price: 170, image: '/img/razer.jpg' },
    { name: 'Samsung Odyssey G5', price: 450, image: '/img/samsung.jpg' },
    { name: 'RTX 2080', price: 750, image: '/img/2080.jpg' },
    { name: 'Asus keyboard', price: 50, image: '/img/asuskeyboard.jpg' },
    { name: 'AMD Ryzen 2700', price: 200, image: '/img/ryzen2700.jpg' },
];

// Function to populate product carousel
function populateProductCarousel() {
    const track = document.querySelector('.product-carousel-track');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>AZN ${product.price}</p>
            <button onclick="addToCart('${product.name}')">Add to Cart</button>
        `;
        track.appendChild(productElement);
    });
}

// Carousel navigation logic
function setupCarousel() {
    const track = document.querySelector('.product-carousel-track');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const products = document.querySelectorAll('.product');
    const productWidth = products[0].getBoundingClientRect().width;
    let currentIndex = 0;

    function updateCarouselPosition() {
        track.style.transform = `translateX(-${currentIndex * productWidth}px)`;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < products.length - 4) { // Adjust based on how many items are visible
            currentIndex++;
            updateCarouselPosition();
        }
    });
}

// Function to add item to cart
function addToCart(productName) {
    alert(`${productName} added to cart!`);
    // In a real application, you would update the cart state here
}

// Function to handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const email = document.querySelector('#login-form input[type="email"]').value;
    alert(`Logging in with email: ${email}`);
    // In a real application, you would handle authentication here
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateProductCarousel();
    setupCarousel();
    document.querySelector('#login-form').addEventListener('submit', handleLogin);

    // Carousel functionality
    let items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showNextItem() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }

    setInterval(showNextItem, 3000); // Change slide every 3 seconds
});


let cart = [];

// Function to add item to cart
function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    cart.push(product);
    updateCartDisplay();
    alert(`${productName} added to cart!`);
}

// Function to update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear the existing cart items
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">AZN ${item.price}</span>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('cart-total').innerText = `AZN ${total}`;
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the specified index
    updateCartDisplay();
}

// Toggle cart visibility
function toggleCart() {
    document.getElementById('cart').classList.toggle('active');
}

// Toggle login page visibility
function toggleLogin() {
    document.getElementById('login-page').classList.toggle('active');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateProductCarousel();
    setupCarousel();
    document.querySelector('#login-form').addEventListener('submit', handleLogin);
    document.getElementById('checkout-btn').addEventListener('click', toggleLogin);
    document.getElementById('close-cart-btn').addEventListener('click', toggleCart);
    document.getElementById('close-login-btn').addEventListener('click', toggleLogin);

    // Carousel functionality
    let items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showNextItem() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }

    setInterval(showNextItem, 3000); // Change slide every 3 seconds
});

// Additional event to open cart
document.querySelector('.cart-icon').addEventListener('click', toggleCart);

document.getElementById('login-icon').addEventListener('click', toggleLogin);
