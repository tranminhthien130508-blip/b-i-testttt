const products = [
    { id: 1, name: "Apple iPhone 17", price: 27500000, category: "phone", image: "image\\images.jpg" },
    { id: 2, name: "Samsung Galaxy S26", price: 22500000, category: "phone", image: "image\\images (1).jpg" },
    { id: 3, name: "Xiaomi 15", price: 15399000, category: "phone", image: "image\\images (2).jpg" },

    { id: 4, name: "MSI Titan 18 HX", price: 130000000, category: "laptop", image: "image\\images (3).jpg" },
    { id: 5, name: "ASUS ROG Strix SCAR 18", price: 120000000, category: "laptop", image: "image\\images (4).jpg" },
    { id: 6, name: "Lenovo Legion 9i", price: 110000000, category: "laptop", image: "image\\images (5).jpg" },

    { id: 7, name: "Thẻ Steam Wallet 500K", price: 500000, category: "game", image: "image\\z8267026093710_3d626401b280b5564e845d0b5bf86d95.jpg" },
    { id: 8, name: "Thẻ Steam Wallet 75K", price: 75000, category: "game", image: "image\\img-loader.webp" },
    { id: 9, name: "Thẻ Roblox 800 Robux", price: 250000, category: "game", image: "image\\z8266988891136_b6a99cbeaca5bca8ef8bff4aff5f4b49.jpg" },

    { id: 10, name: "Chuột Gaming Logitech", price: 650000, category: "tech", image: "image\\z8266988899604_501e54ce648ee0f58646ff281b48fd02.jpg" },
    { id: 11, name: "Tai nghe Gaming Logitech", price: 700000, category: "tech", image: "image\\tai-nghe-gaming-logitech-pro-x-2-2.jpg" },
    { id: 12, name: "Bàn phím cơ không dây", price: 850000, category: "tech", image: "image\\z8266988900856_81150ce0c9d8993aa2c3b94fa9e36707.jpg" },

    { id: 13, name: "Áo khoác Hoodie", price: 350000, category: "fashion", image: "image\\z8267018447892_1a793c0f81a5030b2f14e78213c49e1a.jpg" },
    { id: 14, name: "Quần Baggy", price: 249000, category: "fashion", image: "image\\vn-11134211-23020-ndv8tc1rqsnv12.jpg" },
    { id: 15, name: "Balo thời trang", price: 400000, category: "fashion", image: "image\\z8266988913600_23182f9ba2621ec1ca64caa211e46471.jpg" }
];

let cart = JSON.parse(localStorage.getItem("myCart")) || [];

function saveCartToLocalStorage() {
    localStorage.setItem("myCart", JSON.stringify(cart));
}

function updateNavbarCart() {
    const navCounts = document.querySelectorAll("#cart-count");
    navCounts.forEach(el => el.innerText = cart.length);
}

// Hàm hiển thị và lọc sản phẩm (Kết hợp cả Tìm kiếm và Danh mục)
function renderProducts() {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";

    // Lấy giá trị hiện tại của bộ lọc và ô tìm kiếm
    const categoryFilter = document.getElementById("category") ? document.getElementById("category").value : "all";
    const searchInput = document.getElementById("search-input") ? document.getElementById("search-input").value.toLowerCase().trim() : "";

    // Bước 1: Lọc theo danh mục
    let filteredProducts = categoryFilter === "all"
        ? products
        : products.filter(p => p.category === categoryFilter);

    // Bước 2: Lọc tiếp theo từ khóa tìm kiếm
    if (searchInput !== "") {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchInput));
    }

    // Nếu không có sản phẩm nào khớp
    if (filteredProducts.length === 0) {
        productList.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #777; font-size: 1.2rem; padding: 2rem;">Không tìm thấy sản phẩm nào phù hợp.</p>';
        return;
    }

    // In sản phẩm ra màn hình
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
    updatePopupCartUI();  
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

function updatePopupCartUI() {
    const popupCartItems = document.getElementById("popup-cart-items");
    const popupCartTotal = document.getElementById("popup-cart-total");
    if (!popupCartItems || !popupCartTotal) return;

    popupCartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        popupCartItems.innerHTML = '<p class="empty-msg">Giỏ hàng trống</p>';
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
            popupCartItems.appendChild(li);
        });
    }
    popupCartTotal.innerText = total.toLocaleString('vi-VN');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateNavbarCart();
    updateCartUI();
    updatePopupCartUI();
}

function handleCheckout() {
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
    } else {
        alert("Đặt hàng thành công! Đang tiến hành thanh toán...");
        cart = [];
        saveCartToLocalStorage();
        updateNavbarCart();
        updateCartUI();
        updatePopupCartUI();
        
        const cartOverlay = document.getElementById("cart-overlay");
        if (cartOverlay) cartOverlay.classList.remove("active");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateNavbarCart();
    renderProducts(); // Gọi hàm hiển thị lúc tải trang
    updateCartUI();
    updatePopupCartUI();

    // Lắng nghe sự kiện thay đổi trên BỘ LỌC DANH MỤC
    const categoryFilter = document.getElementById("category");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", renderProducts);
    }

    // Lắng nghe sự kiện gõ phím trên THANH TÌM KIẾM (Tìm realtime không cần bấm nút)
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", renderProducts);
    }

    // Các sự kiện cho Giỏ hàng và Pop-up
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) checkoutBtn.addEventListener("click", handleCheckout);

    const popupCheckoutBtn = document.getElementById("popup-checkout-btn");
    if (popupCheckoutBtn) popupCheckoutBtn.addEventListener("click", handleCheckout);

    const cartIconBtn = document.getElementById("cart-icon-btn");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCartBtn = document.getElementById("close-cart");

    if (cartIconBtn && cartOverlay) {
        cartIconBtn.addEventListener("click", () => cartOverlay.classList.add("active"));
    }

    if (closeCartBtn && cartOverlay) {
        closeCartBtn.addEventListener("click", () => cartOverlay.classList.remove("active"));
    }

    if (cartOverlay) {
        cartOverlay.addEventListener("click", (e) => {
            if (e.target === cartOverlay) cartOverlay.classList.remove("active");
        });
    }
});