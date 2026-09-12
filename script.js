
const products = [
    { id: 1, name: "Thẻ Steam Wallet 500K", price: 500000, category: "game", image: "https://via.placeholder.com/200x180/1a1a2e/FFFFFF/?text=Steam+Wallet" },
    { id: 2, name: "Thẻ Roblox 800 Robux", price: 250000, category: "game", image: "https://via.placeholder.com/200x180/e74c3c/FFFFFF/?text=Roblox+Card" },
    { id: 3, name: "Chuột Gaming Logitech", price: 650000, category: "tech", image: "https://via.placeholder.com/200x180/34495e/FFFFFF/?text=Chuot+Gaming" },
    { id: 4, name: "Bàn phím cơ không dây", price: 850000, category: "tech", image: "https://via.placeholder.com/200x180/34495e/FFFFFF/?text=Ban+Phim+Co" },
    { id: 5, name: "Áo khoác Hoodie", price: 350000, category: "fashion", image: "https://via.placeholder.com/200x180/95a5a6/FFFFFF/?text=Ao+Hoodie" },
    { id: 6, name: "Balo thời trang", price: 400000, category: "fashion", image: "https://via.placeholder.com/200x180/95a5a6/FFFFFF/?text=Balo" }
];

let cart = JSON.parse(localStorage.getItem("myCart")) || [];

function saveCartToLocalStorage() {
    localStorage.setItem("myCart", JSON.stringify(cart));
}

function updateNavbarCart() {
    const navCounts = document.querySelectorAll("#cart-count");
    navCounts.forEach(el => el.innerText = cart.length);
}

function renderProducts(filterCategory = "all") {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";

    const filteredProducts = filterCategory === "all"
        ? products
        : products.filter(p => p.category === filterCategory);

    filteredProducts.forEach(product => {
        const productEl = document.createElement("div");
        productEl.className = "product-card";
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString('vi-VN')} đ</p>
            <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        `;
        productList.appendChild(productEl);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push(product);
    saveCartToLocalStorage();
    updateNavbarCart();
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Giỏ hàng trống</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name}</span>
                <div>
                    <span style="color:#e94560; font-weight:bold">${item.price.toLocaleString('vi-VN')} đ</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
                </div>
            `;
            cartItems.appendChild(li);
        });
    }

    cartTotal.innerText = total.toLocaleString('vi-VN');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateNavbarCart();
    updateCartUI();
}

document.addEventListener("DOMContentLoaded", () => {
    updateNavbarCart();

    renderProducts();
    updateCartUI();

    const categoryFilter = document.getElementById("category");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", (e) => {
            renderProducts(e.target.value);
        });
    }

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Giỏ hàng trống!");
            } else {
                alert("Đặt hàng thành công! Đang tiến hành thanh toán...");
                cart = [];
                saveCartToLocalStorage();
                updateNavbarCart();
                updateCartUI();
            }
        });
    }
});