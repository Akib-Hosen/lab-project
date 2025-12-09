function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function initializeControls() {
    document.querySelectorAll('.product-tabs .tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const targetTab = e.target.dataset.tab;

            document.querySelectorAll('.product-tabs .tab-button')
                .forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            document.querySelectorAll('#tab-content .tab-content-section')
                .forEach(sec => sec.style.display = 'none');

            document.querySelector(`#tab-content [data-tab="${targetTab}"]`)
                .style.display = 'block';
        });
    });

    const qtyInput = document.getElementById('product-qty');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');

    if (qtyInput) {
        qtyMinus.onclick = () => qtyInput.value = Math.max(1, +qtyInput.value - 1);
        qtyPlus.onclick = () => qtyInput.value = +qtyInput.value + 1;
    }
}

function renderProductPage(productId) {
    const product = window.productData[productId];
    const detailArea = document.getElementById("product-details-area");
    const tabContent = document.getElementById("tab-content");

    if (!product) {
        detailArea.innerHTML = "<h2>Product not found.</h2>";
        return;
    }

    document.getElementById("page-title").textContent = product.name;
    document.getElementById("current-category").textContent = product.category;
    document.getElementById("current-product-name").textContent = product.name;

    const renderColorOptions = colors =>
        colors?.length
            ? `<select>${colors.map(c => `<option>${c}</option>`).join("")}</select>`
            : "<select disabled><option>N/A</option></select>";

    detailArea.innerHTML = `
        <div class="product-main-flex">
            <div class="product-image-gallery">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="pricing"><span class="current-price">${product.price}</span></div>
                <div class="delivery-details">
                    <p>Delivery: ${product.delivery || "N/A"}</p>
                    <p>Warranty: ${product.warranty || "None"}</p>
                </div>
                <div class="product-options">
                    <label>Color:</label>
                    ${renderColorOptions(product.color)}
                </div>
                <div class="buy-actions">
                    <div class="quantity-selector">
                        <button id="qty-minus">-</button>
                        <input type="number" value="1" id="product-qty">
                        <button id="qty-plus">+</button>
                    </div>
                    <button class="btn btn-buy">Buy Now</button>
                    <button class="btn btn-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    tabContent.innerHTML = `
        <div class="tab-content-section" data-tab="details">
            <ul>${product.details.map(d => `<li>${d}</li>`).join("")}</ul>
        </div>
        <div class="tab-content-section" data-tab="specs" style="display:none;">
            <ul>${product.specs.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const productId = getProductIdFromUrl();
    if (productId && window.productData[productId]) {
        renderProductPage(productId);
        initializeControls();
    }
});
