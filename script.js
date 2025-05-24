// Initialize Swiper for Hero Section
const heroSwiper = new Swiper('.hero-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
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

// Initialize Swiper for offers section
const offersSwiper = new Swiper('.offers-section .swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.offers-section .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.offers-section .swiper-button-next',
        prevEl: '.offers-section .swiper-button-prev',
    },
});

// Initialize Swiper for featured products
const featuredProductsSwiper = new Swiper('.featured-products-section .swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.featured-products-section .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.featured-products-section .swiper-button-next',
        prevEl: '.featured-products-section .swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
});

// Initialize lightbox
try {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });
} catch (e) {
    // Lightbox not loaded, ignore
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('.price').textContent;
        
        // Create cart item
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${productName}</span>
            <span>${productPrice}</span>
            <button class="remove-item">×</button>
        `;
        
        // Add to cart
        document.querySelector('.cart-items').appendChild(cartItem);
        
        // Update cart total
        updateCartTotal();
        
        // Show cart
        document.querySelector('.cart').classList.add('active');
    });
});

// Remove from cart functionality
document.querySelector('.cart-items').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
        e.target.parentElement.remove();
        updateCartTotal();
    }
});

// Update cart total
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const price = item.querySelector('span:last-child').textContent;
        total += parseFloat(price.replace('₹', '').replace(',', ''));
    });
    
    document.querySelector('.cart-total').textContent = `Total: ₹${total.toFixed(2)}`;
}

// Toggle cart
document.querySelector('.cart-icon').addEventListener('click', function() {
    document.querySelector('.cart').classList.toggle('active');
});

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cart = document.querySelector('.cart');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cart.contains(e.target) && !cartIcon.contains(e.target)) {
        cart.classList.remove('active');
    }
});

// Mobile menu toggle
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    document.querySelector('.navbar-collapse').classList.toggle('show');
});

// Search functionality
document.querySelector('.search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = this.querySelector('input').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        Swal.fire({
            title: 'Thank You!',
            text: 'You have successfully subscribed to our newsletter.',
            icon: 'success',
            confirmButtonText: 'Great!',
            confirmButtonColor: '#2563eb'
        });
        
        this.reset();
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Category Card Hover Effect
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Product Image Zoom Effect
document.querySelectorAll('.product-image').forEach(image => {
    image.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    image.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

function initProductSwiper() {
    if (window.Swiper && document.querySelector('.mainSwiper') && document.querySelector('.thumbSwiper')) {
        var thumbSwiper = new Swiper('.thumbSwiper', {
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
        });
        var mainSwiper = new Swiper('.mainSwiper', {
            spaceBetween: 10,
            navigation: {
                nextEl: '.mainSwiper .swiper-button-next',
                prevEl: '.mainSwiper .swiper-button-prev',
            },
            thumbs: {
                swiper: thumbSwiper,
            },
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initProductSwiper();
});

// Review Form Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Star rating selection
    const stars = document.querySelectorAll('#reviewRating .fa-star');
    const ratingInput = document.getElementById('reviewerRating');
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseenter', function () {
            const val = parseInt(this.getAttribute('data-value'));
            highlightStars(val);
        });
        star.addEventListener('mouseleave', function () {
            highlightStars(currentRating);
        });
        star.addEventListener('click', function () {
            currentRating = parseInt(this.getAttribute('data-value'));
            ratingInput.value = currentRating;
            highlightStars(currentRating);
        });
    });
    function highlightStars(rating) {
        stars.forEach(star => {
            const val = parseInt(star.getAttribute('data-value'));
            if (val <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    // Media preview
    const mediaInput = document.getElementById('reviewMedia');
    const mediaPreview = document.getElementById('mediaPreview');
    if (mediaInput) {
        mediaInput.addEventListener('change', function () {
            mediaPreview.innerHTML = '';
            Array.from(mediaInput.files).forEach(file => {
                const url = URL.createObjectURL(file);
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = url;
                    mediaPreview.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = url;
                    video.controls = true;
                    mediaPreview.appendChild(video);
                }
            });
        });
    }

    // Review submit
    const reviewForm = document.getElementById('customerReviewForm');
    const reviewsList = document.getElementById('reviewsList');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('reviewerName').value.trim();
            const rating = parseInt(document.getElementById('reviewerRating').value);
            const text = document.getElementById('reviewText').value.trim();
            const files = mediaInput.files;
            if (!name || !rating || !text) {
                alert('Please fill all fields and select a rating.');
                return;
            }
            // Create review item
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item bg-white p-4 rounded shadow-sm mb-4';
            reviewItem.innerHTML = `
                <div class="review-header d-flex justify-content-between align-items-center mb-3">
                    <div class="reviewer-info">
                        <h5 class="mb-1">${name}</h5>
                        <div class="rating-stars text-warning">
                            ${'<i class="fas fa-star"></i>'.repeat(rating)}${rating < 5 ? '<i class="far fa-star"></i>'.repeat(5-rating) : ''}
                        </div>
                    </div>
                    <div class="review-date text-muted">Just now</div>
                </div>
                <div class="review-content">
                    <p>${text}</p>
                </div>
            `;
            // Media
            if (files.length > 0) {
                const mediaDiv = document.createElement('div');
                mediaDiv.className = 'review-images mt-3';
                Array.from(files).forEach(file => {
                    const url = URL.createObjectURL(file);
                    if (file.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        img.src = url;
                        img.className = 'review-image me-2';
                        img.style.width = '80px';
                        img.style.height = '80px';
                        img.style.objectFit = 'cover';
                        mediaDiv.appendChild(img);
                    } else if (file.type.startsWith('video/')) {
                        const video = document.createElement('video');
                        video.src = url;
                        video.controls = true;
                        video.className = 'review-image me-2';
                        video.style.width = '80px';
                        video.style.height = '80px';
                        video.style.objectFit = 'cover';
                        mediaDiv.appendChild(video);
                    }
                });
                reviewItem.appendChild(mediaDiv);
            }
            // Add to top of reviews
            reviewsList.prepend(reviewItem);
            // Reset form
            reviewForm.reset();
            highlightStars(0);
            mediaPreview.innerHTML = '';
        });
    }
}); 

document.addEventListener('DOMContentLoaded', function () {
    // Swiper debug
    console.log("Swiper check");

    if (window.Swiper && document.querySelector('.mainSwiper') && document.querySelector('.thumbSwiper')) {
        console.log('Initializing Swiper on product page...');
        var thumbSwiper = new Swiper('.thumbSwiper', {
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
        });
        var mainSwiper = new Swiper('.mainSwiper', {
            spaceBetween: 10,
            navigation: {
                nextEl: '.mainSwiper .swiper-button-next',
                prevEl: '.mainSwiper .swiper-button-prev',
            },
            thumbs: {
                swiper: thumbSwiper,
            },
        });
    } else {
        console.log('Swiper or required elements not found!');
    }
});

// Function to create product card HTML
function createProductCard(product) {
    return `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="product-card">
                <div class="product-actions">
                    <button class="product-action-btn like-btn" onclick="toggleWishlist(this, '${product.id}')" title="Add to Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="product-action-btn share-btn" onclick="shareProduct('${product.id}')" title="Share Product">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
                <div class="product-image">
                    <a href="${product.link}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price}</p>
                    <button class="btn btn-primary add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// Function to toggle wishlist
function toggleWishlist(button, productId) {
    const isLiked = button.classList.contains('active');
    
    if (isLiked) {
        // Remove from wishlist
        button.classList.remove('active');
        Swal.fire({
            title: 'Removed from Wishlist',
            text: 'Product has been removed from your wishlist',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        // Add to wishlist
        button.classList.add('active');
        Swal.fire({
            title: 'Added to Wishlist',
            text: 'Product has been added to your wishlist',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    }
}

// Function to share product
function shareProduct(productId) {
    const productUrl = window.location.origin + window.location.pathname + '?product=' + productId;
    
    Swal.fire({
        title: 'Share Product',
        text: 'Copy this link to share the product:',
        input: 'text',
        inputValue: productUrl,
        showCancelButton: true,
        confirmButtonText: 'Copy Link',
        cancelButtonText: 'Close'
    }).then((result) => {
        if (result.isConfirmed) {
            navigator.clipboard.writeText(result.value);
            Swal.fire('Copied!', 'Link copied to clipboard', 'success');
        }
    });
}

// Function to check if product is in wishlist
function checkWishlistStatus() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
    document.querySelectorAll('.like-btn').forEach(button => {
        const productId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (wishlistItems.includes(productId)) {
            button.classList.add('active');
        }
    });
}

// Initialize wishlist status check
document.addEventListener('DOMContentLoaded', function() {
    checkWishlistStatus();
});