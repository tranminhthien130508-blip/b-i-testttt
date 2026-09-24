
const products = [
    { id: 1, name: "Thẻ Steam Wallet 75K", price: 75000, category: "game", image: "image\\img-loader.webp" },
    { id: 2, name: "Thẻ Steam Wallet 500K", price: 500000, category: "game", image: "image\\z8267026093710_3d626401b280b5564e845d0b5bf86d95.jpg" },
    { id: 3, name: "Thẻ Roblox 800 Robux", price: 250000, category: "game", image: "image\\z8266988891136_b6a99cbeaca5bca8ef8bff4aff5f4b49.jpg" },
    { id: 4, name: "Chuột Gaming Logitech", price: 650000, category: "tech", image: "image\\z8266988899604_501e54ce648ee0f58646ff281b48fd02.jpg" },
    { id: 5, name: "Bàn phím cơ không dây", price: 850000, category: "tech", image: "image\\z8266988900856_81150ce0c9d8993aa2c3b94fa9e36707.jpg" },
    { id: 6, name: "Tai nghe Gaming Logitech Pro X 2 Lightspeed (Wireless/ Bluetooth/ 3.5mm)", price: 4649000, category: "tech", image: "image\\tai-nghe-gaming-logitech-pro-x-2-2.jpg" },
    { id: 7, name: "Áo khoác Hoodie", price: 350000, category: "fashion", image: "image\\z8267018447892_1a793c0f81a5030b2f14e78213c49e1a.jpg" },
    { id: 8, name: "Quần Baggy", price: 441000, category: "fashion", image: "image\\vn-11134211-23020-ndv8tc1rqsnv12.jpg" },
    { id: 9, name: "Balo thời trang", price: 400000, category: "fashion", image: "image\\z8266988913600_23182f9ba2621ec1ca64caa211e46471.jpg" }
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