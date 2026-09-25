/**
 * --------------------------------------------------------------------------
 * 1. DỮ LIỆU SẢN PHẨM (MOCK DATA)
 * --------------------------------------------------------------------------
 */
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

/**
 * --------------------------------------------------------------------------
 * 2. QUẢN LÝ TRẠNG THÁI (STATE MANAGEMENT)
 * --------------------------------------------------------------------------
 */
// Khởi tạo giỏ hàng từ localStorage để duy trì trạng thái khi chuyển trang
let cart = JSON.parse(localStorage.getItem("myCart")) || [];

function saveCartToLocalStorage() {
    localStorage.setItem("myCart", JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push(product);
    saveCartToLocalStorage();
    refreshAllCartUIs();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    refreshAllCartUIs();
}

function handleCheckout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }
    
    alert("Đặt hàng thành công! Đang tiến hành thanh toán...");
    cart = [];
    saveCartToLocalStorage();
    refreshAllCartUIs();
    
    const cartOverlay = document.getElementById("cart-overlay");
    if (cartOverlay) cartOverlay.classList.remove("active");
}

/**
 * --------------------------------------------------------------------------
 * 3. XỬ LÝ GIAO DIỆN (UI RENDERING)
 * --------------------------------------------------------------------------
 */

// Cập nhật tất cả các UI liên quan đến giỏ hàng cùng một lúc
function refreshAllCartUIs() {
    updateNavbarCart();
    updateCartUI("cart-items", "cart-total");             // Sidebar
    updateCartUI("popup-cart-items", "popup-cart-total"); // Popup
}

function updateNavbarCart() {
    const navCounts = document.querySelectorAll("#cart-count");
    navCounts.forEach(el => el.innerText = cart.length);
}

// Hàm dùng chung để render danh sách giỏ hàng (tránh lặp code)
function updateCartUI(listContainerId, totalContainerId) {
    const cartItemsContainer = document.getElementById(listContainerId);
    const cartTotalContainer = document.getElementById(totalContainerId);
    
    if (!cartItemsContainer || !cartTotalContainer) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Giỏ hàng trống</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name}</span>
                <div>
                    <span class="price-highlight">${item.price.toLocaleString('vi-VN')} đ</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})" title="Xóa sản phẩm">X</button>
                </div>
            `;
            cartItemsContainer.appendChild(li);
        });
    }
    cartTotalContainer.innerText = total.toLocaleString('vi-VN');
}

// Hiển thị và lọc sản phẩm (Kết hợp Tìm kiếm và Danh mục)
function renderProducts() {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";

    const categoryFilter = document.getElementById("category")?.value || "all";
    const searchInput = document.getElementById("search-input")?.value.toLowerCase().trim() || "";

    // Lọc mảng sản phẩm
    let filteredProducts = products.filter(p => {
        const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
        const matchSearch = p.name.toLowerCase().includes(searchInput);
        return matchCategory && matchSearch;
    });

    if (filteredProducts.length === 0) {
        productList.innerHTML = '<p class="no-products-msg">Không tìm thấy sản phẩm nào phù hợp.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productEl = document.createElement("div");
        productEl.className = "product-card";
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p class="product-price">${product.price.toLocaleString('vi-VN')} đ</p>
            <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        `;
        productList.appendChild(productEl);
    });
}

/**
 * --------------------------------------------------------------------------
 * 4. LẮNG NGHE SỰ KIỆN (EVENT LISTENERS)
 * --------------------------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", () => {
    // Khởi tạo UI ban đầu
    refreshAllCartUIs();
    renderProducts();

    // Bộ lọc & Tìm kiếm
    document.getElementById("category")?.addEventListener("change", renderProducts);
    document.getElementById("search-input")?.addEventListener("input", renderProducts);

    // Xử lý thanh toán
    document.getElementById("checkout-btn")?.addEventListener("click", handleCheckout);
    document.getElementById("popup-checkout-btn")?.addEventListener("click", handleCheckout);

    // Đóng/Mở Popup Giỏ hàng
    const cartOverlay = document.getElementById("cart-overlay");
    document.getElementById("cart-icon-btn")?.addEventListener("click", () => {
        cartOverlay?.classList.add("active");
    });
    document.getElementById("close-cart")?.addEventListener("click", () => {
        cartOverlay?.classList.remove("active");
    });

    // Đóng popup khi click ra ngoài vùng giỏ hàng
    cartOverlay?.addEventListener("click", (e) => {
        if (e.target === cartOverlay) cartOverlay.classList.remove("active");
    });
});