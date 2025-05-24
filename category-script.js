/**
 * Dynamic Category Page Script
 * This script handles loading products filtered by category from the URL parameter
 * and populating the category template with the appropriate content
 */

// Global variables to store the current state
let allCategoryProducts = [];
let filteredProducts = [];
let currentCategory = '';
let currentSortOption = 'featured';
let currentFilters = {
    minPrice: 0,
    maxPrice: 5000,
    brands: [],
    inStock: true
};

document.addEventListener('DOMContentLoaded', function() {
    // Get the category from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    currentCategory = category;
    
    // If no category is provided, redirect to home page
    if (!category) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update page title and header based on category
    updateCategoryHeader(category);
    
    // Get products for the specified category
    allCategoryProducts = getProductsByCategory(category);
    filteredProducts = [...allCategoryProducts];
    
    // If no products found, show the "No products found" message
    if (allCategoryProducts.length === 0) {
        document.getElementById('no-products-found').classList.remove('d-none');
        document.getElementById('products-grid').classList.add('d-none');
        return;
    }
    
    // Populate the products grid with the filtered products
    populateProductsGrid(filteredProducts);
    
    // Initialize the wishlist functionality
    initWishlist();
    
    // Initialize filter and sort functionality
    initFilterAndSort();
});

/**
 * Updates the page title and category header based on the selected category
 * @param {string} category - The selected category
 */
function updateCategoryHeader(category) {
    // Format the category name for display (capitalize first letter, etc.)
    const formattedCategory = formatCategoryName(category);
    
    // Update page title
    document.title = `${formattedCategory} - Aziz Phone Hub`;
    document.getElementById('category-title').textContent = `${formattedCategory} - Aziz Phone Hub`;
    
    // Update category header
    document.getElementById('category-header-title').textContent = `${formattedCategory} Collection`;
    
    // Set appropriate description based on category
    let description = 'Discover our premium selection of products';
    
    switch(category) {
        case 'smartwatches':
            description = 'Discover our premium selection of smart watches and fitness trackers';
            break;
        case 'airpods':
            description = 'Explore our collection of AirPods and wireless earbuds';
            break;
        case 'headphones':
            description = 'Browse our high-quality headphones for immersive sound experiences';
            break;
        case 'shoes':
            description = 'Step into style with our premium collection of shoes';
            break;
        default:
            description = `Explore our collection of ${formattedCategory}`;
    }
    
    document.getElementById('category-header-description').textContent = description;
}

/**
 * Formats a category name for display (capitalizes first letter of each word)
 * @param {string} category - The category name to format
 * @returns {string} The formatted category name
 */
function formatCategoryName(category) {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Populates the products grid with the filtered products
 * @param {Array} products - The array of products to display
 */
function populateProductsGrid(products) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    // If no products match the filters, show a message
    if (products.length === 0) {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.className = 'col-12 text-center py-5';
        noProductsMessage.innerHTML = `
            <div class="alert alert-info">
                <h4><i class="fas fa-info-circle me-2"></i> No Products Found</h4>
                <p>No products match your current filters. Try adjusting your filter criteria.</p>
                <button class="btn btn-outline-primary mt-2" id="clear-filters-btn">Clear All Filters</button>
            </div>
        `;
        productsGrid.appendChild(noProductsMessage);
        
        // Add event listener to the clear filters button
        document.getElementById('clear-filters-btn').addEventListener('click', function() {
            resetFilters();
        });
        
        return;
    }
    
    // Create and append a product card for each product
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Re-initialize event listeners for the newly created product cards
    initProductCardListeners();
}

/**
 * Initialize filter and sort functionality
 */
function initFilterAndSort() {
    // Price range sliders
    const minPriceSlider = document.getElementById('minPriceRange');
    const maxPriceSlider = document.getElementById('maxPriceRange');
    const minPriceDisplay = document.getElementById('minPriceValue');
    const maxPriceDisplay = document.getElementById('maxPriceValue');
    
    // Set initial values
    minPriceDisplay.textContent = `₹${minPriceSlider.value}`;
    maxPriceDisplay.textContent = `₹${maxPriceSlider.value}`;
    currentFilters.minPrice = parseInt(minPriceSlider.value);
    currentFilters.maxPrice = parseInt(maxPriceSlider.value);
    
    // Update min price slider and display
    minPriceSlider.addEventListener('input', function() {
        const minValue = parseInt(this.value);
        const maxValue = parseInt(maxPriceSlider.value);
        
        if (minValue > maxValue) {
            maxPriceSlider.value = minValue;
            maxPriceDisplay.textContent = `₹${minValue}`;
            currentFilters.maxPrice = minValue;
        }
        
        minPriceDisplay.textContent = `₹${minValue}`;
        currentFilters.minPrice = minValue;
        updatePriceTrack(minPriceSlider, maxPriceSlider);
        
        // Apply filters immediately when slider is moved
        applyFilters();
    });
    
    // Update max price slider and display
    maxPriceSlider.addEventListener('input', function() {
        const maxValue = parseInt(this.value);
        const minValue = parseInt(minPriceSlider.value);
        
        if (maxValue < minValue) {
            minPriceSlider.value = maxValue;
            minPriceDisplay.textContent = `₹${maxValue}`;
            currentFilters.minPrice = maxValue;
        }
        
        maxPriceDisplay.textContent = `₹${maxValue}`;
        currentFilters.maxPrice = maxValue;
        updatePriceTrack(minPriceSlider, maxPriceSlider);
        
        // Apply filters immediately when slider is moved
        applyFilters();
    });
    
    // Initialize price track
    updatePriceTrack(minPriceSlider, maxPriceSlider);
    
    // Brand checkboxes
    const brandCheckboxes = document.querySelectorAll('.filter-brand');
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateBrandFilters();
            // Apply filters immediately when brand selection changes
            applyFilters();
        });
    });
    
    // Availability checkbox
    const availabilityCheckbox = document.getElementById('availabilityInStock');
    availabilityCheckbox.addEventListener('change', function() {
        currentFilters.inStock = this.checked;
        // Apply filters immediately when availability changes
        applyFilters();
    });
    
    // Apply filters button
    const applyFilterBtn = document.getElementById('apply-filter-btn');
    applyFilterBtn.addEventListener('click', function() {
        applyFilters();
    });
    
    // Reset filters button
    const resetFilterBtn = document.getElementById('reset-filter-btn');
    resetFilterBtn.addEventListener('click', function() {
        resetFilters();
    });
    
    // Sort options
    const sortOptions = document.querySelectorAll('.sort-option');
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            const sortBy = this.getAttribute('data-sort');
            currentSortOption = sortBy;
            sortProducts(sortBy);
        });
    });
}

/**
 * Update the brand filters based on checkbox selection
 */
function updateBrandFilters() {
    const brandCheckboxes = document.querySelectorAll('.filter-brand:checked');
    currentFilters.brands = Array.from(brandCheckboxes).map(checkbox => checkbox.value);
}

/**
 * Update the price track to show the selected range
 */
function updatePriceTrack(minSlider, maxSlider) {
    const min = parseInt(minSlider.value);
    const max = parseInt(maxSlider.value);
    const range = parseInt(maxSlider.max) - parseInt(maxSlider.min);
    
    // Calculate percentages for the track
    const minPercent = ((min - parseInt(minSlider.min)) / range) * 100;
    const maxPercent = ((max - parseInt(minSlider.min)) / range) * 100;
    
    // Apply styles to create the track effect
    const track = document.querySelector('.price-track');
    if (track) {
        track.style.background = `linear-gradient(to right, #ddd ${minPercent}%, var(--primary-color) ${minPercent}%, var(--primary-color) ${maxPercent}%, #ddd ${maxPercent}%)`;
    }
}

/**
 * Apply all filters to the products
 */
function applyFilters() {
    // Start with all products in the category
    let filtered = [...allCategoryProducts];
    
    // Apply price filter
    filtered = filtered.filter(product => {
        // Extract numeric price value from the price string (e.g., "₹1,299" -> 1299)
        const price = parseInt(product.price.replace(/[^0-9]/g, ''));
        return price >= currentFilters.minPrice && price <= currentFilters.maxPrice;
    });
    
    // Apply brand filter if any brands are selected
    if (currentFilters.brands.length > 0) {
        filtered = filtered.filter(product => {
            // Check if product name contains any of the selected brands
            return currentFilters.brands.some(brand => 
                product.name.toLowerCase().includes(brand.toLowerCase())
            );
        });
    }
    
    // Apply in-stock filter
    if (currentFilters.inStock) {
        filtered = filtered.filter(product => true); // All products are considered in stock for this demo
    }
    
    // Update the filtered products
    filteredProducts = filtered;
    
    // Apply the current sort option
    sortProducts(currentSortOption);
    
    // Update the UI
    populateProductsGrid(filteredProducts);
}

/**
 * Reset all filters to their default values
 */
function resetFilters() {
    // Reset min price range
    const minPriceSlider = document.getElementById('minPriceRange');
    minPriceSlider.value = 0;
    document.getElementById('minPriceValue').textContent = '₹0';
    currentFilters.minPrice = 0;
    
    // Reset max price range
    const maxPriceSlider = document.getElementById('maxPriceRange');
    maxPriceSlider.value = 5000;
    document.getElementById('maxPriceValue').textContent = '₹5000';
    currentFilters.maxPrice = 5000;
    
    // Update price track
    updatePriceTrack(minPriceSlider, maxPriceSlider);
    
    // Reset brand checkboxes
    const brandCheckboxes = document.querySelectorAll('.filter-brand');
    brandCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    currentFilters.brands = [];
    
    // Reset availability checkbox
    document.getElementById('availabilityInStock').checked = true;
    currentFilters.inStock = true;
    
    // Reset to all products in the category
    filteredProducts = [...allCategoryProducts];
    
    // Reset sort option
    currentSortOption = 'featured';
    
    // Update the UI
    populateProductsGrid(filteredProducts);
}

/**
 * Sort the products based on the selected sort option
 * @param {string} sortBy - The sort option to apply
 */
function sortProducts(sortBy) {
    switch(sortBy) {
        case 'price-low-high':
            filteredProducts.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
                const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
                return priceA - priceB;
            });
            break;
        case 'price-high-low':
            filteredProducts.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
                const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
                return priceB - priceA;
            });
            break;
        case 'newest':
            // For demo purposes, we'll just reverse the array
            filteredProducts.reverse();
            break;
        case 'featured':
        default:
            // Reset to original order
            filteredProducts = [...allCategoryProducts];
            // Then apply filters again
            applyFilters();
            return; // Return early to avoid calling populateProductsGrid twice
    }
    
    // Update the UI with the sorted products
    populateProductsGrid(filteredProducts);
}

/**
 * Initialize event listeners for product cards
 */
function initProductCardListeners() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            if (typeof cart !== 'undefined' && cart.addItem(productId)) {
                // Show success message
                Swal.fire({
                    title: 'Added to cart!',
                    text: 'The item has been added to your cart.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    });
    
    // Buy now buttons
    const buyNowButtons = document.querySelectorAll('.buy-now');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            if (typeof cart !== 'undefined') {
                // Clear cart first
                cart.clearCart();
                
                // Add to cart
                if (cart.addItem(productId)) {
                    // Redirect to checkout
                    window.location.href = 'checkout.html';
                }
            }
        });
    });
}

/**
 * Creates a product card element for a given product
 * @param {Object} product - The product object
 * @returns {HTMLElement} The product card element
 */
function createProductCard(product) {
    // Create column div
    const colDiv = document.createElement('div');
    colDiv.className = 'col-6 col-md-4 col-lg-3';
    
    // Create product card HTML
    colDiv.innerHTML = `
        <div class="product-card">
            <div class="product-actions">
                <button class="product-action-btn like-btn" onclick="toggleWishlist(this, '${product.id}')" title="Add to Wishlist">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-image">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <p class="price mb-0">${product.price}</p>
                    ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ''}
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary add-to-cart flex-grow-1" data-product-id="${product.id}">Add to Cart</button>
                    <button class="btn btn-outline-primary buy-now" data-product-id="${product.id}">
                        <i class="fas fa-bolt"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return colDiv;
}

/**
 * Initializes the wishlist functionality
 */
function initWishlist() {
    // Check if wishlist exists in localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Mark products that are in the wishlist
    wishlist.forEach(productId => {
        const wishlistButtons = document.querySelectorAll(`.like-btn[onclick*="${productId}"]`);
        wishlistButtons.forEach(button => {
            button.classList.add('active');
        });
    });
}

/**
 * Toggles a product in the wishlist
 * @param {HTMLElement} button - The wishlist button element
 * @param {string} productId - The ID of the product to toggle
 */
function toggleWishlist(button, productId) {
    // Prevent the default link behavior
    event.preventDefault();
    
    // Toggle the active class on the button
    button.classList.toggle('active');
    
    // Get the current wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if the product is already in the wishlist
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        // Add the product to the wishlist
        wishlist.push(productId);
        showToast('Product added to wishlist!', 'success');
    } else {
        // Remove the product from the wishlist
        wishlist.splice(index, 1);
        showToast('Product removed from wishlist!', 'info');
    }
    
    // Save the updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Stop event propagation to prevent the link from being followed
    return false;
}

/**
 * Adds a product to the cart
 * @param {string} productId - The ID of the product to add to the cart
 */
function addToCart(productId) {
    // Prevent the default link behavior
    event.preventDefault();
    
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Increment the quantity if the product is already in the cart
        existingItem.quantity += 1;
        showToast('Product quantity updated in cart!', 'success');
    } else {
        // Add the product to the cart with quantity 1
        cart.push({
            id: productId,
            quantity: 1
        });
        showToast('Product added to cart!', 'success');
    }
    
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Stop event propagation to prevent the link from being followed
    return false;
}

/**
 * Shows a toast notification
 * @param {string} message - The message to display
 * @param {string} icon - The icon type (success, error, warning, info)
 */
function showToast(message, icon) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
}
