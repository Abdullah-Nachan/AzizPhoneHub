/**
 * Dynamic Product Page Script
 * This script handles loading product data from the URL parameter
 * and populating the product template with the appropriate content
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the product ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // If no product ID is provided, show error message
    if (!productId) {
        showProductNotFound();
        return;
    }
    
    // Find the product in our data
    const product = getProductById(productId);
    
    // If product not found, show error message
    if (!product) {
        showProductNotFound();
        return;
    }
    
    // Populate the product details
    populateProductDetails(product);
    
    // Populate similar products based on category
    populateSimilarProducts(product);
    
    // Initialize Swiper after images are loaded
    initializeSwiper();
});

/**
 * Shows the product not found message and hides the product details
 */
function showProductNotFound() {
    document.getElementById('product-not-found').classList.remove('d-none');
    document.getElementById('product-details').classList.add('d-none');
}

/**
 * Populates all product details with data from the product object
 * @param {Object} product - The product object containing all product data
 */
function populateProductDetails(product) {
    // Set page title
    document.title = `${product.name} - Aziz Phone Hub`;
    document.getElementById('product-title').textContent = `${product.name} - Aziz Phone Hub`;
    
    // Set product name
    document.getElementById('product-name').textContent = product.name;
    
    // Set product price information
    document.getElementById('product-current-price').textContent = product.price;
    
    // Hide original price and discount if not available
    const originalPriceElement = document.getElementById('product-original-price');
    const discountElement = document.getElementById('product-discount');
    originalPriceElement.style.display = 'none';
    discountElement.style.display = 'none';
    
    // Set default rating (4.5 stars)
    const defaultRating = 4.5;
    const defaultRatingCount = 120;
    populateRatingStars('product-rating-stars', defaultRating);
    document.getElementById('product-rating-count').textContent = `(${defaultRatingCount} ratings)`;
    
    // Set overall rating in reviews section
    document.getElementById('overall-rating').textContent = defaultRating;
    populateRatingStars('overall-rating-stars', defaultRating);
    document.getElementById('overall-rating-count').textContent = `Based on ${defaultRatingCount} reviews`;
    
    // Set product highlights from description
    const highlightsList = document.getElementById('product-highlights');
    highlightsList.innerHTML = '';
    
    // Create highlights from description
    const descriptionPoints = product.description.split('. ');
    descriptionPoints.forEach(point => {
        if (point.trim()) {
            const li = document.createElement('li');
            li.textContent = point.trim() + (point.endsWith('.') ? '' : '.');
            highlightsList.appendChild(li);
        }
    });
    
    // Set product description
    document.getElementById('product-description').textContent = product.description;
    
    // Set product features (use description points as features)
    const featuresList = document.getElementById('product-features');
    featuresList.innerHTML = '';
    
    // Add category as a feature
    const categoryLi = document.createElement('li');
    categoryLi.textContent = `Category: ${formatCategoryName(product.category)}`;
    featuresList.appendChild(categoryLi);
    
    // Add price as a feature
    const priceLi = document.createElement('li');
    priceLi.textContent = `Price: ${product.price}`;
    featuresList.appendChild(priceLi);
    
    // Add other features from description
    descriptionPoints.slice(0, 3).forEach(point => {
        if (point.trim()) {
            const li = document.createElement('li');
            li.textContent = point.trim() + (point.endsWith('.') ? '' : '.');
            featuresList.appendChild(li);
        }
    });
    
    // Set product specifications
    const specificationsTable = document.getElementById('product-specifications');
    specificationsTable.innerHTML = '';
    
    // Add basic specifications
    const specs = [
        ['Product ID', product.id],
        ['Name', product.name],
        ['Category', formatCategoryName(product.category)],
        ['Price', product.price]
    ];
    
    specs.forEach(([key, value]) => {
        const tr = document.createElement('tr');
        
        const tdKey = document.createElement('td');
        tdKey.textContent = key;
        
        const tdValue = document.createElement('td');
        tdValue.textContent = value;
        
        tr.appendChild(tdKey);
        tr.appendChild(tdValue);
        specificationsTable.appendChild(tr);
    });
    
    // Set product images using the images array
    const mainImageSwiper = document.getElementById('main-image-swiper');
    const thumbnailSwiper = document.getElementById('thumbnail-swiper');
    
    mainImageSwiper.innerHTML = '';
    thumbnailSwiper.innerHTML = '';
    
    // Use the images array if available, otherwise fall back to the single image
    const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
    
    // Create slides for each image
    productImages.forEach((imageUrl, index) => {
        // Create main image slide
        const mainDiv = document.createElement('div');
        mainDiv.className = 'swiper-slide';
        
        const mainImg = document.createElement('img');
        mainImg.src = imageUrl;
        mainImg.alt = `${product.name} - Image ${index + 1}`;
        mainImg.loading = 'lazy';
        
        mainDiv.appendChild(mainImg);
        mainImageSwiper.appendChild(mainDiv);
        
        // Create thumbnail slide
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'swiper-slide';
        
        const thumbImg = document.createElement('img');
        thumbImg.src = imageUrl;
        thumbImg.alt = `Thumbnail ${index + 1}`;
        
        thumbDiv.appendChild(thumbImg);
        thumbnailSwiper.appendChild(thumbDiv);
    });
    
    // Reinitialize swiper after adding images
    if (window.mainSwiper) {
        window.mainSwiper.update();
        window.thumbSwiper.update();
    }
    
    // Hide color variants section as we don't have this data
    const colorVariantsList = document.getElementById('product-colors');
    if (colorVariantsList) {
        colorVariantsList.parentElement.style.display = 'none';
    }
}

/**
 * Creates and populates star rating elements based on the rating value
 * @param {string} elementId - The ID of the element to populate with stars
 * @param {number} rating - The rating value (e.g., 4.5)
 */
function populateRatingStars(elementId, rating) {
    const starsContainer = document.getElementById(elementId);
    starsContainer.innerHTML = '';
    
    // Create full stars
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('i');
        star.className = 'fas fa-star';
        starsContainer.appendChild(star);
    }
    
    // Create half star if needed
    if (rating % 1 >= 0.5) {
        const halfStar = document.createElement('i');
        halfStar.className = 'fas fa-star-half-alt';
        starsContainer.appendChild(halfStar);
    }
    
    // Create empty stars to fill up to 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        const emptyStar = document.createElement('i');
        emptyStar.className = 'far fa-star';
        starsContainer.appendChild(emptyStar);
    }
}

/**
 * Formats a category name for display (capitalizes first letter of each word)
 * @param {string} category - The category name to format
 * @returns {string} The formatted category name
 */
function formatCategoryName(category) {
    if (!category) return '';
    
    return category.split('-').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

/**
 * Populates the similar products section with products from the same category
 * @param {Object} currentProduct - The current product being viewed
 */
function populateSimilarProducts(currentProduct) {
    // Get the container for similar products
    const similarProductsContainer = document.querySelector('.similar-products-row');
    if (!similarProductsContainer) return;
    
    // Clear existing content
    similarProductsContainer.innerHTML = '';
    
    // Get all products in the same category
    const similarProducts = getProductsByCategory(currentProduct.category);
    
    // Filter out the current product
    const filteredProducts = similarProducts.filter(product => product.id !== currentProduct.id);
    
    // If no similar products, hide the section
    if (filteredProducts.length === 0) {
        document.querySelector('.similar-products').style.display = 'none';
        return;
    }
    
    // Update section title to be more specific
    const sectionTitle = document.querySelector('.similar-products .section-title');
    if (sectionTitle) {
        sectionTitle.textContent = `Similar ${formatCategoryName(currentProduct.category)}`;
    }
    
    // Create product cards for each similar product
    filteredProducts.forEach(product => {
        // Create product card
        const productCard = document.createElement('div');
        productCard.className = 'product-card small-card';
        
        // Create product link
        const productLink = document.createElement('a');
        productLink.href = `product.html?id=${product.id}`;
        productLink.className = 'text-decoration-none';
        
        // Create product image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'product-image';
        
        // Create product image
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;
        image.loading = 'lazy';
        
        // Create product info container
        const infoContainer = document.createElement('div');
        infoContainer.className = 'product-info';
        
        // Create product name
        const name = document.createElement('h3');
        name.textContent = product.name;
        
        // Create product price
        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = product.price;
        
        // Assemble the card
        imageContainer.appendChild(image);
        infoContainer.appendChild(name);
        infoContainer.appendChild(price);
        
        productLink.appendChild(imageContainer);
        productLink.appendChild(infoContainer);
        productCard.appendChild(productLink);
        
        // Add the card to the container
        similarProductsContainer.appendChild(productCard);
    });
}

/**
 * Initializes the Swiper components for product images
 */
function initializeSwiper() {
    // Initialize thumbnail swiper
    window.thumbSwiper = new Swiper('.thumbSwiper', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    
    // Initialize main swiper
    window.mainSwiper = new Swiper('.mainSwiper', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: window.thumbSwiper,
        },
    });
    
    // Initialize similar products swiper if needed
    if (document.querySelector('.similar-products-swiper')) {
        new Swiper('.similar-products-swiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
            navigation: {
                nextEl: '.similar-swiper-next',
                prevEl: '.similar-swiper-prev',
            },
        });
    }
}
