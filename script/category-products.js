function getCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
}

function renderCategoryProducts(categoryName) {
    const grid = document.getElementById('category-product-grid');
    const title = document.getElementById('category-title');

    if (!grid || !window.productData) return;

    if (!categoryName || categoryName.trim() === "") {
        title.textContent = "All Products";
        categoryName = null;
    } else {
        title.textContent = decodeURIComponent(categoryName);
    }

    const allProducts = Object.values(window.productData);

    const filteredProducts = categoryName
        ? allProducts.filter(product =>
            product.category &&
            product.category.trim().toLowerCase() === categoryName.trim().toLowerCase()
        )
        : allProducts;

    if (filteredProducts.length === 0) {
        grid.innerHTML = `<div class="empty-message">
            <p>No products found in this category.</p>
        </div>`;
        return;
    }

    grid.innerHTML = '';

    filteredProducts.forEach(product => {
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

document.addEventListener("DOMContentLoaded", () => {
    const category = getCategoryFromUrl();
    renderCategoryProducts(category);
});
