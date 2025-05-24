/**
 * Dynamic Offer Page Script
 * This script handles loading offer data from the URL parameter
 * and populating the offer template with the appropriate content
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the offer ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const offerId = urlParams.get('id');
    
    // If no offer ID is provided, show error message
    if (!offerId) {
        showOfferNotFound();
        return;
    }
    
    // Find the offer in our data
    const offer = getOfferById(offerId);
    
    // If offer not found, show error message
    if (!offer) {
        showOfferNotFound();
        return;
    }
    
    // Populate the offer details
    populateOfferDetails(offer);
    
    // Populate related offers
    populateRelatedOffers(offer);
    
    // Initialize Swiper after images are loaded
    initializeSwiper();
    
    // Set up event listeners for buttons
    setupEventListeners(offer);
});

/**
 * Shows the offer not found message and hides the offer details
 */
function showOfferNotFound() {
    document.getElementById('offer-not-found').classList.remove('d-none');
    document.getElementById('offer-details').classList.add('d-none');
}

/**
 * Populates all offer details with data from the offer object
 * @param {Object} offer - The offer object containing all offer data
 */
function populateOfferDetails(offer) {
    // Set page title
    document.title = `${offer.title} - Aziz Phone Hub`;
    
    // Set offer name
    document.getElementById('offer-title').textContent = offer.title;
    
    // Set offer price information
    document.getElementById('offer-current-price').textContent = offer.offerPrice;
    document.getElementById('offer-original-price').textContent = offer.originalPrice;
    document.getElementById('offer-discount').textContent = `${offer.discount} off`;
    
    // Set expiry date
    document.getElementById('expiry-date').textContent = offer.expiryDate;
    
    // Set included products
    const includedProductsList = document.getElementById('included-products');
    includedProductsList.innerHTML = '';
    
    offer.includedProducts.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product;
        includedProductsList.appendChild(li);
    });
    
    // Set offer highlights
    const highlightsList = document.getElementById('offer-highlights');
    highlightsList.innerHTML = '';
    
    offer.highlights.forEach(highlight => {
        const li = document.createElement('li');
        li.textContent = highlight;
        highlightsList.appendChild(li);
    });
    
    // Set offer description
    document.getElementById('offer-description').textContent = offer.fullDescription;
    
    // Set offer images (use the images array)
    const mainImageSwiper = document.getElementById('main-image-swiper');
    const thumbnailSwiper = document.getElementById('thumbnail-swiper');
    
    mainImageSwiper.innerHTML = '';
    thumbnailSwiper.innerHTML = '';
    
    // Use the images array if available, otherwise fall back to the single image
    const offerImages = offer.images && offer.images.length > 0 ? offer.images : [offer.image];
    
    // Create slides for each image
    offerImages.forEach((imageUrl, index) => {
        // Create main image slide
        const mainDiv = document.createElement('div');
        mainDiv.className = 'swiper-slide';
        
        const mainImg = document.createElement('img');
        mainImg.src = imageUrl;
        mainImg.alt = `${offer.title} - Image ${index + 1}`;
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
}

/**
 * Populates the related offers section with other offers
 * @param {Object} currentOffer - The current offer being viewed
 */
function populateRelatedOffers(currentOffer) {
    // Get the container for related offers
    const relatedOffersContainer = document.querySelector('.related-offers-row');
    if (!relatedOffersContainer) return;
    
    // Clear existing content
    relatedOffersContainer.innerHTML = '';
    
    // Get all offers
    const allOffers = getAllOffers();
    
    // Filter out the current offer
    const filteredOffers = allOffers.filter(offer => offer.id !== currentOffer.id);
    
    // If no related offers, hide the section
    if (filteredOffers.length === 0) {
        document.querySelector('.related-offers').style.display = 'none';
        return;
    }
    
    // Create offer cards for each related offer
    filteredOffers.forEach(offer => {
        // Create offer card
        const offerCard = document.createElement('div');
        offerCard.className = 'offer-card small-card';
        
        // Create offer link
        const offerLink = document.createElement('a');
        offerLink.href = `offer.html?id=${offer.id}`;
        offerLink.className = 'text-decoration-none';
        
        // Create offer image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'offer-image';
        
        // Create offer image
        const image = document.createElement('img');
        image.src = offer.image;
        image.alt = offer.title;
        image.loading = 'lazy';
        
        // Create offer info container
        const infoContainer = document.createElement('div');
        infoContainer.className = 'offer-info';
        
        // Create offer title
        const title = document.createElement('h3');
        title.textContent = offer.title;
        
        // Create offer price
        const priceContainer = document.createElement('div');
        priceContainer.className = 'd-flex align-items-center gap-2';
        
        const currentPrice = document.createElement('span');
        currentPrice.className = 'current-price';
        currentPrice.textContent = offer.offerPrice;
        
        const originalPrice = document.createElement('span');
        originalPrice.className = 'original-price';
        originalPrice.textContent = offer.originalPrice;
        
        // Assemble the card
        priceContainer.appendChild(currentPrice);
        priceContainer.appendChild(originalPrice);
        
        imageContainer.appendChild(image);
        infoContainer.appendChild(title);
        infoContainer.appendChild(priceContainer);
        
        offerLink.appendChild(imageContainer);
        offerLink.appendChild(infoContainer);
        offerCard.appendChild(offerLink);
        
        // Add the card to the container
        relatedOffersContainer.appendChild(offerCard);
    });
}

/**
 * Initializes the Swiper components for offer images
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
    
    // Initialize related offers swiper if needed
    if (document.querySelector('.related-offers-swiper')) {
        new Swiper('.related-offers-swiper', {
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
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
            navigation: {
                nextEl: '.related-swiper-next',
                prevEl: '.related-swiper-prev',
            },
        });
    }
}

/**
 * Sets up event listeners for the Add to Cart and Buy Now buttons
 * @param {Object} offer - The offer object
 */
function setupEventListeners(offer) {
    // Add to Cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Add included products to cart
            if (typeof cart !== 'undefined') {
                // Get the included product IDs (this would need to be added to the offer data)
                const productIds = getProductIdsFromOffer(offer);
                
                // Add each product to cart
                let allAdded = true;
                productIds.forEach(productId => {
                    if (!cart.addItem(productId)) {
                        allAdded = false;
                    }
                });
                
                // Show success message
                if (allAdded) {
                    Swal.fire({
                        title: 'Added to cart!',
                        text: 'The bundle has been added to your cart.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            }
        });
    }
    
    // Buy Now button
    const buyNowBtn = document.getElementById('buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            if (typeof cart !== 'undefined') {
                // Clear cart first
                cart.clearCart();
                
                // Get the included product IDs
                const productIds = getProductIdsFromOffer(offer);
                
                // Add each product to cart
                let allAdded = true;
                productIds.forEach(productId => {
                    if (!cart.addItem(productId)) {
                        allAdded = false;
                    }
                });
                
                // Redirect to checkout if all products were added
                if (allAdded) {
                    window.location.href = 'checkout.html';
                }
            }
        });
    }
}

/**
 * Helper function to get product IDs from offer
 * This is a placeholder function - in a real implementation, 
 * you would need to map offer included products to actual product IDs
 * @param {Object} offer - The offer object
 * @returns {Array} Array of product IDs
 */
function getProductIdsFromOffer(offer) {
    // This is a simplified implementation
    // In a real app, you would need to map the included products to actual product IDs
    
    // Map of offer IDs to product IDs
    const offerToProductMap = {
        'apple-watch-airpods-bundle': ['apple-watch-series-10', 'airpods-2'],
        'airpods-max-bundle': ['airpods-max', 'airpods-2'],
        'airpods-pro-magsafe-bundle': ['airpods-pro-2', 'magsafe']
    };
    
    return offerToProductMap[offer.id] || [];
}
