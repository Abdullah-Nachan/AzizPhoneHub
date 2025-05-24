/**
 * Shop page functionality for Aziz Phone Hub
 * Handles product display, filtering, and cart interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize shop page
    initializeShopPage();
});

// Initialize shop page
function initializeShopPage() {
    // Update product cards with proper cart and wishlist functionality
    updateProductCards();
    
    // Initialize filters
    initializeFilters();
}

// Update product cards with proper cart and wishlist functionality
function updateProductCards() {
    // Get all product cards
    const productCards = document.querySelectorAll('.card');
    
    productCards.forEach(card => {
        // Get product elements
        const addToCartBtn = card.querySelector('.btn-primary:not(.buy-now)') || card.querySelector('.btn-primary');
        const buyNowBtn = card.querySelector('.buy-now');
        const likeBtn = card.querySelector('.like-btn');
        
        // If there's no proper add to cart button, update the existing one
        if (addToCartBtn && !addToCartBtn.classList.contains('add-to-cart')) {
            // Get product ID from any existing data attribute or from the link
            let productId = '';
            if (addToCartBtn.dataset.productId) {
                productId = addToCartBtn.dataset.productId;
            } else {
                const productLink = card.querySelector('a');
                if (productLink && productLink.href) {
                    const url = new URL(productLink.href);
                    const params = new URLSearchParams(url.search);
                    productId = params.get('id') || '';
                    
                    // Extract ID from path if not in query params
                    if (!productId && url.pathname) {
                        const pathParts = url.pathname.split('/');
                        const filename = pathParts[pathParts.length - 1];
                        if (filename.includes('.html')) {
                            // For paths like ./headphones/bose-qc-ultra.html
                            const nameWithoutExt = filename.replace('.html', '');
                            productId = nameWithoutExt;
                        }
                    }
                }
            }
            
            if (productId) {
                // Update button
                addToCartBtn.classList.add('add-to-cart');
                addToCartBtn.dataset.productId = productId;
                addToCartBtn.textContent = 'Add to Cart';
                
                // Fix the card layout if needed
                const cardBody = card.querySelector('.card-body');
                if (cardBody && !cardBody.classList.contains('d-flex')) {
                    cardBody.classList.add('d-flex', 'flex-column');
                    
                    // Move price and buttons to the correct position
                    const title = cardBody.querySelector('.card-title');
                    const price = cardBody.querySelector('.price');
                    
                    // Create container for buttons
                    const buttonContainer = document.createElement('div');
                    buttonContainer.className = 'mt-auto d-flex gap-2';
                    
                    // Move add to cart button to container
                    addToCartBtn.classList.remove('w-100');
                    addToCartBtn.classList.add('flex-grow-1');
                    buttonContainer.appendChild(addToCartBtn);
                    
                    // Create buy now button if it doesn't exist
                    if (!buyNowBtn) {
                        const newBuyNowBtn = document.createElement('button');
                        newBuyNowBtn.className = 'btn btn-outline-primary buy-now';
                        newBuyNowBtn.dataset.productId = productId;
                        newBuyNowBtn.innerHTML = '<i class="fas fa-bolt"></i>';
                        buttonContainer.appendChild(newBuyNowBtn);
                    }
                    
                    // Add button container to card body
                    cardBody.appendChild(buttonContainer);
                }
            }
        }
        
        // If there's no like button, add one
        if (!likeBtn) {
            // Get product ID
            let productId = '';
            const addToCartButton = card.querySelector('.add-to-cart');
            if (addToCartButton && addToCartButton.dataset.productId) {
                productId = addToCartButton.dataset.productId;
            } else {
                const productLink = card.querySelector('a');
                if (productLink && productLink.href) {
                    const url = new URL(productLink.href);
                    const params = new URLSearchParams(url.search);
                    productId = params.get('id') || '';
                    
                    // Extract ID from path if not in query params
                    if (!productId && url.pathname) {
                        const pathParts = url.pathname.split('/');
                        const filename = pathParts[pathParts.length - 1];
                        if (filename.includes('.html')) {
                            // For paths like ./headphones/bose-qc-ultra.html
                            const nameWithoutExt = filename.replace('.html', '');
                            productId = nameWithoutExt;
                        }
                    }
                }
            }
            
            if (productId) {
                // Get product image container
                const productImage = card.querySelector('.product-image');
                if (productImage) {
                    // Make sure it has position relative
                    productImage.classList.add('position-relative');
                    
                    // Create like button
                    const newLikeBtn = document.createElement('button');
                    newLikeBtn.className = 'btn like-btn position-absolute top-0 end-0 m-2';
                    newLikeBtn.dataset.productId = productId;
                    newLikeBtn.innerHTML = '<i class="fas fa-heart"></i>';
                    
                    // Add active class if product is in wishlist
                    if (typeof wishlist !== 'undefined' && wishlist.hasItem(productId)) {
                        newLikeBtn.classList.add('active');
                    }
                    
                    // Add like button to product image container
                    productImage.appendChild(newLikeBtn);
                }
            }
        }
    });
    
    // Add event listeners to all add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        // Remove existing event listeners
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-add event listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            
            // Add to cart
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
    
    // Add event listeners to all buy now buttons
    document.querySelectorAll('.buy-now').forEach(button => {
        // Remove existing event listeners
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-add event listeners
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            
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
    
    // Add event listeners to all like buttons
    document.querySelectorAll('.like-btn').forEach(button => {
        // Remove existing event listeners
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-add event listeners
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.dataset.productId;
            
            if (typeof wishlist !== 'undefined') {
                // Toggle wishlist item
                const isAdded = wishlist.toggleItem(productId);
                
                // Update button state
                if (isAdded) {
                    this.classList.add('active');
                    
                    // Show success message
                    Swal.fire({
                        title: 'Added to wishlist!',
                        text: 'The item has been added to your wishlist.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                } else {
                    this.classList.remove('active');
                    
                    // Show success message
                    Swal.fire({
                        title: 'Removed from wishlist!',
                        text: 'The item has been removed from your wishlist.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            }
        });
    });
}

// Initialize filters
function initializeFilters() {
    // Category filter
    const categorySelect = document.querySelector('.filter-group select');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const category = this.value;
            
            // Get URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            
            // Update category parameter
            if (category) {
                urlParams.set('cat', category);
            } else {
                urlParams.delete('cat');
            }
            
            // Redirect to updated URL
            window.location.href = `${window.location.pathname}?${urlParams.toString()}`;
        });
        
        // Set selected category from URL
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('cat');
        if (category) {
            categorySelect.value = category;
        }
    }
    
    // Price range filter
    const minPriceInput = document.querySelector('.filter-group input[placeholder="Min"]');
    const maxPriceInput = document.querySelector('.filter-group input[placeholder="Max"]');
    const applyFilterBtn = document.querySelector('.filter-group + .filter-group + .filter-group + .d-grid .btn-primary');
    
    if (minPriceInput && maxPriceInput && applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            const minPrice = minPriceInput.value;
            const maxPrice = maxPriceInput.value;
            
            // Get URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            
            // Update price parameters
            if (minPrice) {
                urlParams.set('min', minPrice);
            } else {
                urlParams.delete('min');
            }
            
            if (maxPrice) {
                urlParams.set('max', maxPrice);
            } else {
                urlParams.delete('max');
            }
            
            // Redirect to updated URL
            window.location.href = `${window.location.pathname}?${urlParams.toString()}`;
        });
        
        // Set price range from URL
        const urlParams = new URLSearchParams(window.location.search);
        const minPrice = urlParams.get('min');
        const maxPrice = urlParams.get('max');
        
        if (minPrice) {
            minPriceInput.value = minPrice;
        }
        
        if (maxPrice) {
            maxPriceInput.value = maxPrice;
        }
    }
    
    // Reset filters
    const resetFilterBtn = document.querySelector('.filter-group + .filter-group + .filter-group + .d-grid .btn-outline-secondary');
    
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function() {
            // Redirect to shop page without parameters
            window.location.href = window.location.pathname;
        });
    }
    
    // Sort options
    const sortSelect = document.querySelector('.filter-group:nth-child(3) select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sort = this.value;
            
            // Get URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            
            // Update sort parameter
            if (sort) {
                urlParams.set('sort', sort);
            } else {
                urlParams.delete('sort');
            }
            
            // Redirect to updated URL
            window.location.href = `${window.location.pathname}?${urlParams.toString()}`;
        });
        
        // Set selected sort from URL
        const urlParams = new URLSearchParams(window.location.search);
        const sort = urlParams.get('sort');
        
        if (sort) {
            sortSelect.value = sort;
        }
    }
    
    // Mobile sort options
    const sortButtons = document.querySelectorAll('#sortPanel .sort-options button');
    
    if (sortButtons.length > 0) {
        sortButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                let sort = '';
                
                switch (index) {
                    case 0:
                        sort = 'popularity';
                        break;
                    case 1:
                        sort = 'price-low';
                        break;
                    case 2:
                        sort = 'price-high';
                        break;
                    case 3:
                        sort = 'newest';
                        break;
                }
                
                // Get URL parameters
                const urlParams = new URLSearchParams(window.location.search);
                
                // Update sort parameter
                if (sort) {
                    urlParams.set('sort', sort);
                } else {
                    urlParams.delete('sort');
                }
                
                // Redirect to updated URL
                window.location.href = `${window.location.pathname}?${urlParams.toString()}`;
            });
        });
    }
}
