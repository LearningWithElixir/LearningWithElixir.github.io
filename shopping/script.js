const products = [
    { id: 1, name: "Luxury Watch", price: 299.99, image: "/images/watch.jpg"},
    { id: 2, name: "Designer Handbag", price: 199.99, image: "/images/bag.jpg"},
    { id: 3, name: "Silk Scarf", price: 79.99, image: "/images/scarf.jpg"},
    { id: 4, name: "Leather Shoes", price: 149.99, image: "/images/shoes.jpg"},
    { id: 5, name: "Sunglasses", price: 129.99, image: "/images/glasses.jpg"},
    { id: 6, name: "Diamond Necklace", price: 599.99, image: "/images/necklace.jpg"},
    { id: 7, name: "Gold Bracelet", price: 349.99, image: "/images/bracelet.jpg"},
    { id: 8, name: "Designer Perfume", price: 89.99, image: "/images/perfume.jpg"}
];

const cart = {};
const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalAmount = document.getElementById("total-amount");
const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const overlay =  document.getElementById("overlay");
const checkoutBtn = document.getElementById("checkout-btn");

function displayProducts() {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML=`
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    for (const [productId, quantity] of Object.entries(cart)) {
        const product = products.find(p => p.id === parseInt(productId));
        const itemTotal = product.price * quantity;
        total += itemTotal;
        count += quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML= `
        <img src="${product.image}" alt="${product.name}">
        <div class="cart-item-info">
            <h4 class="cart-item-name">${product.name}</h4>
            <p class="cart-item-price">$${product.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
            <button class="quantity-btn minus" data-id="${product.id}">-</button>
            <span>${quantity}</span>
            <button class="quantity-btn plus" data-id="${product.id}">+</button>
        </div>
        `;
        cartItems.appendChild(cartItem);
    }

    totalAmount.textContent = total.toFixed(2);
    cartCount.textContent = count;
}

function addToCart(productId) {
    cart[productId] = (cart[productId] || 0)+1;
    updateCart();
}

function removeFromCart(productId) {
    if (cart[productId] > 1) {
        cart[productId]--;
    } else {
        delete cart[productId];
    }
    updateCart();
}

productsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const productId = parseInt(e.target.getAttribute("data-id"));
        addToCart(productId);
    }
});

cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("quantity-btn")) {
        const productId = parseInt(e.target.getAttribute("data-id"));
        if (e.target.classList.contains("plus")) {
            addToCart(productId);
        } else if (e.target.classList.contains("minus")) {
            removeFromCart(productId);
        }
    }
});

cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("open");
    overlay.classList.add("open");
});

overlay.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
    overlay.classList.remove("open");
});

checkoutBtn.addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty. Add some items before checking out");
    } else {
        alert("Thank you for your purchase!");
        cart = {};
        updateCart();
        cartSidebar.classList.remove("open");
        overlay.classList.remove("open");
    }
});

displayProducts();
updateCart();