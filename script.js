const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
const productGrid = document.querySelector('.product-grid');
const categoryBtns = document.querySelectorAll('.category-btn');

let categories = [];

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        categories = data.categories;
        renderProducts('Men');
    })
    .catch(error => console.error('Error fetching data:', error));

function renderProducts(categoryName) {
     productGrid.innerHTML = '';
    const category = categories.find(cat => cat.category_name === categoryName);

    if (category) {
        category.category_products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');
            imgContainer.style.position = 'relative';

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.title;

            if (product.badge_text !== null) {
                const badge = document.createElement('div');
                badge.classList.add('badge');
                badge.textContent = product.badge_text;
                badge.style.backgroundColor = 'white';
                badge.style.color = 'black';
                badge.style.padding = '5px 10px';
                badge.style.borderRadius = '5px';
                badge.style.position = 'absolute';
                badge.style.top = '10px';
                badge.style.left = '10px';
                badge.style.fontWeight = '600';
                imgContainer.appendChild(badge);
            }

            imgContainer.appendChild(img);

            const details = document.createElement('div');
            details.classList.add('details');

            const titleVendor = document.createElement('div');
            titleVendor.classList.add('title-vendor');

            const name = document.createElement('h3');
            const titleText = product.title;
            const maxTitleLength = Math.floor(window.innerWidth * 0.5 / 8);
            name.textContent = titleText.length > maxTitleLength ? `${titleText.slice(0, maxTitleLength)}...` : titleText;

            const vendor = document.createElement('span');
            vendor.textContent = product.vendor;
            vendor.style.fontSize = '0.9rem';

            titleVendor.appendChild(name);
            titleVendor.appendChild(document.createTextNode('\u2022')); // Black dot separator
            titleVendor.appendChild(vendor);


            const priceDetails = document.createElement('div');
            priceDetails.classList.add('price-details');

            const price = document.createElement('span');
            price.textContent = `Rs ${product.price}`;

            const comparePrice = document.createElement('span');
            comparePrice.textContent = `Rs ${product.compare_at_price}`;
            comparePrice.classList.add('compare-price');

            const discountPercentage = Math.round(100 - (product.price / product.compare_at_price * 100));
            const discountText = document.createElement('span');
            discountText.textContent = `${discountPercentage}% off`;
            discountText.classList.add('discount-text');

            priceDetails.appendChild(price);
            priceDetails.appendChild(document.createTextNode(' '));
            priceDetails.appendChild(comparePrice);
            priceDetails.appendChild(document.createTextNode(' '));
            priceDetails.appendChild(discountText);

            const button = document.createElement('button');
            button.textContent = 'Add to Cart';
            button.classList.add('cart-btn');

            details.appendChild(titleVendor);
            details.appendChild(priceDetails);
            details.appendChild(button);

            productCard.appendChild(imgContainer);
            productCard.appendChild(details);

            productGrid.appendChild(productCard);
        });
    }
}

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.textContent.trim();
        renderProducts(category);

        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            const icon = btn.querySelector('.category-icon');
            if (icon) {
                icon.classList.add('hidden');
            }
        });
        btn.classList.add('active');
        const activeIcon = btn.querySelector('.category-icon');
        if (activeIcon) {
            activeIcon.classList.remove('hidden');
        }
    });
});