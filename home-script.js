// Home page script to handle dynamic offers and other functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load dynamic offers with loading indicator
    showLoadingIndicator();
    
    // Simulate a small delay to ensure offers.js is loaded
    setTimeout(() => {
        loadDynamicOffers();
        hideLoadingIndicator();
        
        // Initialize Swiper after offers are loaded
        initializeSwiper();
        
        // Initialize featured products
        initializeFeaturedProducts();
    }, 300);
});

// Function to show loading indicator
function showLoadingIndicator() {
    const offersContainer = document.getElementById('offers-container');
    if (!offersContainer) return;
    
    // Create and add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p>Loading offers...</p>
    `;
    
    // Clear container and add loading indicator
    offersContainer.innerHTML = '';
    
    // Create a slide for the loading indicator
    const loadingSlide = document.createElement('div');
    loadingSlide.className = 'swiper-slide';
    loadingSlide.appendChild(loadingIndicator);
    
    offersContainer.appendChild(loadingSlide);
}

// Function to hide loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

// Function to load dynamic offers from offers.js
function loadDynamicOffers() {
    const offersContainer = document.getElementById('offers-container');
    if (!offersContainer) {
        console.error('Offers container not found');
        return;
    }
    
    try {
        // Check if offers array exists (from offers.js)
        if (typeof offers !== 'undefined' && Array.isArray(offers) && offers.length > 0) {
            // Clear any existing content
            offersContainer.innerHTML = '';
            
            // Add each offer to the container
            offers.forEach(offer => {
                const offerSlide = document.createElement('div');
                offerSlide.className = 'swiper-slide';
                
                // Create responsive image with lazy loading
                offerSlide.innerHTML = `
                    <div class="offer-content">
                        <div class="offer-image">
                            <img src="${offer.image}" alt="${offer.title}" loading="lazy">
                        </div>
                        <div class="offer-details">
                            <h2>${offer.title}</h2>
                            <p>${offer.shortDescription || offer.fullDescription}</p>
                            <div class="offer-price-container">
                                <span class="offer-price">${offer.offerPrice || ''}</span>
                                <span class="offer-original-price">${offer.originalPrice || ''}</span>
                            </div>
                            <a href="offer.html?id=${offer.id}" class="offer-btn">${offer.buttonText}</a>
                        </div>
                    </div>
                `;
                
                offersContainer.appendChild(offerSlide);
                
                // Add event listener to track offer clicks
                const offerBtn = offerSlide.querySelector('.offer-btn');
                if (offerBtn) {
                    offerBtn.addEventListener('click', function() {
                        console.log(`Offer clicked: ${offer.title}`);
                        // You could add analytics tracking here
                    });
                }
            });
        } else {
            // Fallback content if offers aren't available
            showFallbackOffers(offersContainer);
        }
    } catch (error) {
        console.error('Error loading offers:', error);
        showFallbackOffers(offersContainer);
    }
}

// Function to show fallback offers if dynamic loading fails
function showFallbackOffers(container) {
    console.warn('Using fallback offers');
    
    // Default fallback offer
    const fallbackOffer = {
        image: "./images/offer series9 and airpods2.jpg",
        title: "Special Offer",
        description: "Get amazing discounts on selected items!",
        link: "shop.html",
        buttonText: "Shop Now"
    };
    
    // Create a fallback slide
    const fallbackSlide = document.createElement('div');
    fallbackSlide.className = 'swiper-slide';
    
    fallbackSlide.innerHTML = `
        <div class="offer-content">
            <div class="offer-image">
                <img src="${fallbackOffer.image}" alt="${fallbackOffer.title}">
            </div>
            <h2>${fallbackOffer.title}</h2>
            <p>${fallbackOffer.description}</p>
            <a href="${fallbackOffer.link}" class="offer-btn">${fallbackOffer.buttonText}</a>
        </div>
    `;
    
    container.innerHTML = '';
    container.appendChild(fallbackSlide);
}

// Function to initialize Swiper
function initializeSwiper() {
    // Initialize Offers Swiper
    new Swiper('.offersSwiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// Function to initialize featured products
function initializeFeaturedProducts() {
    // Get all add to cart buttons in featured products
    const addToCartButtons = document.querySelectorAll('.featured-products-row .add-to-cart');
    const buyNowButtons = document.querySelectorAll('.featured-products-row .buy-now');
    const likeButtons = document.querySelectorAll('.featured-products-row .like-btn');
    
    // Add event listeners to add to cart buttons
    addToCartButtons.forEach(button => {
        // Remove existing event listeners
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-add event listeners
    document.querySelectorAll('.featured-products-row .add-to-cart').forEach(button => {
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
    
    // Add event listeners to buy now buttons
    buyNowButtons.forEach(button => {
        // Remove existing event listeners
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-add event listeners
    document.querySelectorAll('.featured-products-row .buy-now').forEach(button => {
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
    
    // Add event listeners to like buttons
    likeButtons.forEach(button => {
        // Get the onclick attribute
        const onclickAttr = button.getAttribute('onclick');
        
        // If it has an onclick attribute, remove it and add an event listener instead
        if (onclickAttr) {
            button.removeAttribute('onclick');
            
            // Extract product ID from the onclick attribute
            const match = onclickAttr.match(/toggleWishlist\(this,\s*['"](.*?)['"]\)/);
            if (match && match[1]) {
                const productId = match[1];
                button.dataset.productId = productId;
                
                // Add active class if product is in wishlist
                if (typeof wishlist !== 'undefined' && wishlist.hasItem(productId)) {
                    button.classList.add('active');
                }
            }
        }
    });
    
    // Re-add event listeners to like buttons
    document.querySelectorAll('.featured-products-row .like-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.dataset.productId;
            
            if (typeof wishlist !== 'undefined' && productId) {
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
