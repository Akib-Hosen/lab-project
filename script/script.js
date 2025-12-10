const bannerImages = [
    "/images/banner1.jpeg",
    "/images/banner2.jpeg",
    "/images/banner3.jpeg",
    "/images/banner4.jpeg",
    "/images/banner5.jpeg"
];


const categoryData = [
    { name: "Groceries", img: "/images/groceries.webp", subs: ["Snacks", "Beverages"], url: "groceries.html" },
    { name: "Fashion", img: "/images/men.webp", subs: ["Men", "Women"], url: "fashion.html" },
    { name: "Electronics", img: "/images/electro.webp", subs: ["Mobiles", "Laptops"], url: "electronics.html" },
    { name: "Tv & Appliances", img: "/images/tv.webp", subs: ["TV", "Fridge"], url: "tv-appliances.html" },
    { name: "Health & Beauty", img: "/images/beauty.webp", subs: ["Skin Care"], url: "health-beauty.html" },
    { name: "Sports & Outdoors", img: "/images/sports.webp", subs: ["Jerseys"], url: "sports.html" },
    { name: "Home & Living", img: "/images/home.webp", subs: ["Decor"], url: "home-living.html" }
];


window.SharedData = {
    categoryData: categoryData
};

window.SharedFunctions = {
    initCategories: function () {
        const list = document.getElementById('category_list');
        if (!list) return;

        SharedData.categoryData.forEach(cat => {
            const mainDiv = document.createElement('div');
            mainDiv.className = 'main-category';
            
            // --- MODIFIED: Dynamic URL for dropdown categories ---
            const categoryUrl = `category-products.html?category=${encodeURIComponent(cat.name)}`;
            
            mainDiv.innerHTML = `
                <a href="${categoryUrl}">
                    ${cat.name} <span class="arrow">›</span>
                </a>
            `;

            if (cat.subs.length > 0) {
                const sub = document.createElement('div');
                sub.className = 'submenu';
                cat.subs.forEach(s => {
                    sub.innerHTML += `<a href="${categoryUrl}&sub=${encodeURIComponent(s)}">${s}</a>`;
                });
                mainDiv.appendChild(sub);
            }
            list.appendChild(mainDiv);
        });
    }
};


let sliderIndex = 0;
const slider = document.getElementById("slider");
let slideInterval;

function updateSlider(direction) {
    sliderIndex = (sliderIndex + direction + bannerImages.length) % bannerImages.length;
    slider.src = bannerImages[sliderIndex];
}

function startAutoSlide() {
    slideInterval = setInterval(() => updateSlider(1), 4000);
}

function handleManualSlide(direction) {
    clearInterval(slideInterval);
    updateSlider(direction);
    startAutoSlide();
}

function initSlider() {
    if (!slider) return;

    updateSlider(0);

    const next = document.getElementById("nextBtn");
    const prev = document.getElementById("prevBtn");

    if (next) next.addEventListener("click", () => handleManualSlide(1));
    if (prev) prev.addEventListener("click", () => handleManualSlide(-1));

    startAutoSlide();
}


function initCategories() {
    const grid = document.getElementById('category-grid');

    if (grid) {
        categoryData.forEach(cat => {
            const card = document.createElement('a');
            // --- MODIFIED: Dynamic URL for category grid cards ---
            card.href = `category-products.html?category=${encodeURIComponent(cat.name)}`;
            // -----------------------------------------------------------
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-img-circle">
                    <img src="${cat.img}" alt="${cat.name}">
                </div>
                <p>${cat.name}</p>
            `;
            grid.appendChild(card);
        });
    }
    window.SharedFunctions.initCategories();
}


function featuredProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid || !window.productData) return;

    // Convert object to array
    const products = Object.values(window.productData);

    products.forEach(product => {
        const card = document.createElement('a');
        card.href = product.url || "#";
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img"><img src="${product.image}" alt="${product.name}"></div>
            <p class="product-name">${product.name}</p>
            <div class="product-price">
                <span class="original-price">${product.price}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}


window.onload = () => {
    initSlider();
    initCategories();
    featuredProducts();
};