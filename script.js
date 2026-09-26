/*
 1. DỮ LIỆU SẢN PHẨM 
*/
const products = [
    { id: 1, name: "Apple iPhone 17", price: 27500000, category: "phone", image: "image\\images.jpg" },
    { id: 2, name: "Samsung Galaxy S26", price: 22500000, category: "phone", image: "image\\images (1).jpg" },
    { id: 3, name: "Xiaomi 15", price: 15399000, category: "phone", image: "image\\images (2).jpg" },
    { id: 4, name: "Samsung Galaxy Z Fold 8 (Kế nhiệm Galaxy Z Fold 6)", price: 46000000, category: "phone", image: "image\\shopping (6).jpg" },
    { id: 5, name: "OPPO Find X9 Ultra (Kế thừa dòng Find N3 / Find X)", price: 32500000, category: "phone", image: "image\\shopping (7).jpg" },
    { id: 6, name: "vivo X300 Ultra", price: 35000000, category: "phone", image: "image\\images (6).jpg" },

    { id: 7, name: "MSI Titan 18 HX", price: 130000000, category: "laptop", image: "image\\images (3).jpg" },
    { id: 8, name: "ASUS ROG Strix SCAR 18", price: 120000000, category: "laptop", image: "image\\images (4).jpg" },
    { id: 9, name: "Lenovo Legion 9i", price: 110000000, category: "laptop", image: "image\\images (5).jpg" },
    { id: 10, name: "Alienware M18 R2 (2024)", price: 65000000, category: "laptop", image: "image\\shopping (3).jpg" },
    { id: 11, name: "Razer Blade 18 (2025)", price: 115000000, category: "laptop", image: "image\\shopping (4).jpg" },
    { id: 12, name: "Acer Predator Helios 18 AI (2026)", price: 169990000, category: "laptop", image: "image\\shopping (5).jpg" },

    { id: 13, name: "Thẻ Steam Wallet 500K", price: 500000, category: "game", image: "image\\z8267026093710_3d626401b280b5564e845d0b5bf86d95.jpg" },
    { id: 14, name: "Thẻ Steam Wallet 75K", price: 75000, category: "game", image: "image\\img-loader.webp" },
    { id: 15, name: "Thẻ Roblox 800 Robux", price: 250000, category: "game", image: "image\\z8266988891136_b6a99cbeaca5bca8ef8bff4aff5f4b49.jpg" },

    { id: 16, name: "Chuột Gaming Logitech", price: 650000, category: "tech", image: "image\\z8266988899604_501e54ce648ee0f58646ff281b48fd02.jpg" },
    { id: 17, name: "Tai nghe Gaming Logitech", price: 700000, category: "tech", image: "image\\tai-nghe-gaming-logitech-pro-x-2-2.jpg" },
    { id: 18, name: "Bàn phím cơ không dây", price: 850000, category: "tech", image: "image\\z8266988900856_81150ce0c9d8993aa2c3b94fa9e36707.jpg" },
    { id: 19, name: "Tivi LG OLED evo AI C5", price: 64890000, category: "tech", image: "image\\shopping.jpg" },
    { id: 20, name: "Tủ Lạnh Samsung Family Hub 616L", price: 31590000, category: "tech", image: "image\\shopping (1).jpg" },
    { id: 21, name: "Robot Hút Bụi Dreame X40 Ultra", price: 21900000, category: "tech", image: "image\\shopping (2).jpg" },

    { id: 22, name: "Áo khoác Hoodie", price: 350000, category: "fashion", image: "image\\z8267018447892_1a793c0f81a5030b2f14e78213c49e1a.jpg" },
    { id: 23, name: "Quần Baggy", price: 249000, category: "fashion", image: "image\\vn-11134211-23020-ndv8tc1rqsnv12.jpg" },
    { id: 24, name: "Balo thời trang", price: 400000, category: "fashion", image: "image\\z8266988913600_23182f9ba2621ec1ca64caa211e46471.jpg" }
];

/*
 2. QUẢN LÝ TRẠNG THÁI 
 */
let cart = (JSON.parse(localStorage.getItem("myCart")) || []).map(item => ({
    ...item,
    quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1
}));

function saveCartToLocalStorage() {
    localStorage.setItem("myCart", JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCartToLocalStorage();
    refreshAllCartUIs();
}

function removeFromCart(index) {
    const item = cart[index];
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

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

/*
  3. XỬ LÝ GIAO DIỆN 
 */

function refreshAllCartUIs() {
    updateNavbarCart();
    updateCartUI("cart-items", "cart-total");             
    updateCartUI("popup-cart-items", "popup-cart-total"); 
}

function updateNavbarCart() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const navCounts = document.querySelectorAll("#cart-count");
    navCounts.forEach(el => el.innerText = totalQuantity);
}

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
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <div>
                    <span class="price-highlight">${itemTotal.toLocaleString('vi-VN')} đ</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})" title="Xóa sản phẩm">X</button>
                </div>
            `;
            cartItemsContainer.appendChild(li);
        });
    }
    cartTotalContainer.innerText = total.toLocaleString('vi-VN');
}

function renderProducts() {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";

    const categoryFilter = document.getElementById("category")?.value || "all";
    const searchInput = document.getElementById("search-input")?.value.toLowerCase().trim() || "";

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
            <div class="product-info-wrapper">
                <h3>${product.name}</h3>
                <p class="product-price">₫${product.price.toLocaleString('vi-VN')}</p>
                <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
            </div>
        `;
        productList.appendChild(productEl);
    });
}

function renderSellerProducts() {
    const sellerProductList = document.getElementById("seller-product-list");
    if (!sellerProductList) return;

    sellerProductList.innerHTML = "";

    products.forEach((product) => {
        const fakeStock = Math.floor(Math.random() * 100) + 10;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <div class="seller-product-item">
                    <img src="${product.image}" alt="${product.name}">
                    <span style="font-weight: 500; color: #333;">${product.name}</span>
                </div>
            </td>
            <td>${product.category.toUpperCase()}</td>
            <td style="color: var(--shopee-orange); font-weight: bold;">
                ₫${product.price.toLocaleString('vi-VN')}
            </td>
            <td>${fakeStock}</td>
            <td>
                <button class="btn-edit" onclick="alert('Tính năng Sửa đang cập nhật!')">Sửa</button>
                <button class="btn-delete" onclick="alert('Tính năng Xóa đang cập nhật!')">Xóa</button>
            </td>
        `;
        sellerProductList.appendChild(tr);
    });
}

/*
4. LẮNG NGHE SỰ KIỆN
*/
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    const categorySelect = document.getElementById("category");

    if (categoryFromUrl && categorySelect) {
        categorySelect.value = categoryFromUrl;
    }

    refreshAllCartUIs();
    renderProducts();

    if (categorySelect) {
        categorySelect.addEventListener("change", renderProducts);
    }

    let debounceTimer;
    document.getElementById("search-input")?.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            renderProducts();
        }, 300);
    });

    document.getElementById("checkout-btn")?.addEventListener("click", handleCheckout);
    document.getElementById("popup-checkout-btn")?.addEventListener("click", handleCheckout);

    const cartOverlay = document.getElementById("cart-overlay");
    document.getElementById("cart-icon-btn")?.addEventListener("click", () => {
        cartOverlay?.classList.add("active");
    });
    document.getElementById("close-cart")?.addEventListener("click", () => {
        cartOverlay?.classList.remove("active");
    });

    cartOverlay?.addEventListener("click", (e) => {
        if (e.target === cartOverlay) cartOverlay.classList.remove("active");
    });
});