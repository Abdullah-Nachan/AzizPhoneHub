/**
 * Cart and Wishlist functionality for Aziz Phone Hub
 * Handles cart and wishlist operations using localStorage
 */

// Initialize cart and wishlist when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    initializeCart();
    
    // Initialize wishlist
    initializeWishlist();
    
    // Setup event listeners
    setupEventListeners();
});

// Cart functionality
const cart = {
    items: [],
    
    // Add item to cart
    addItem: function(productId, quantity = 1) {
        // Check if product exists in products.js
        if (!products[productId]) {
            console.error(`Product with ID ${productId} not found`);
            return false;
        }
        
        // Check if item already exists in cart
        const existingItemIndex = this.items.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            // Update quantity if item exists
            this.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item if it doesn't exist
            const product = products[productId];
            this.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        // Save cart to localStorage
        this.saveCart();
        
        // Update UI
        updateCartUI();
        
        return true;
    },
    
    // Remove item from cart
    removeItem: function(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        
        // Save cart to localStorage
        this.saveCart();
        
        // Update UI
        updateCartUI();
    },
    
    // Update item quantity
    updateQuantity: function(productId, quantity) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            if (quantity <= 0) {
                // Remove item if quantity is 0 or less
                this.removeItem(productId);
            } else {
                // Update quantity
                this.items[itemIndex].quantity = quantity;
                
                // Save cart to localStorage
                this.saveCart();
                
                // Update UI
                updateCartUI();
            }
        }
    },
    
    // Clear cart
    clearCart: function() {
        this.items = [];
        
        // Save cart to localStorage
        this.saveCart();
        
        // Update UI
        updateCartUI();
    },
    
    // Get cart total
    getTotal: function() {
        return this.items.reduce((total, item) => {
            return total + (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity);
        }, 0);
    },
    
    // Get cart count
    getCount: function() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },
    
    // Save cart to localStorage
    saveCart: function() {
        localStorage.setItem('azizCart', JSON.stringify(this.items));
    },
    
    // Load cart from localStorage
    loadCart: function() {
        const savedCart = localStorage.getItem('azizCart');
        
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart);
            } catch (e) {
                console.error('Error parsing cart from localStorage:', e);
                this.items = [];
            }
        }
    }
};

// Wishlist functionality
const wishlist = {
    items: [],
    
    // Add item to wishlist
    addItem: function(productId) {
        // Check if product exists in products.js
        if (!products[productId]) {
            console.error(`Product with ID ${productId} not found`);
            return false;
        }
        
        // Check if item already exists in wishlist
        const existingItem = this.items.find(item => item.id === productId);
        
        if (!existingItem) {
            // Add new item if it doesn't exist
            const product = products[productId];
            this.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image
            });
            
            // Save wishlist to localStorage
            this.saveWishlist();
            
            // Update UI
            updateWishlistUI();
            
            return true;
        }
        
        return false;
    },
    
    // Remove item from wishlist
    removeItem: function(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        
        // Save wishlist to localStorage
        this.saveWishlist();
        
        // Update UI
        updateWishlistUI();
    },
    
    // Toggle item in wishlist (add if not exists, remove if exists)
    toggleItem: function(productId) {
        const existingItemIndex = this.items.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            // Remove item if it exists
            this.removeItem(productId);
            return false; // Item was removed
        } else {
            // Add item if it doesn't exist
            this.addItem(productId);
            return true; // Item was added
        }
    },
    
    // Check if item exists in wishlist
    hasItem: function(productId) {
        return this.items.some(item => item.id === productId);
    },
    
    // Get wishlist count
    getCount: function() {
        return this.items.length;
    },
    
    // Save wishlist to localStorage
    saveWishlist: function() {
        localStorage.setItem('azizWishlist', JSON.stringify(this.items));
    },
    
    // Load wishlist from localStorage
    loadWishlist: function() {
        const savedWishlist = localStorage.getItem('azizWishlist');
        
        if (savedWishlist) {
            try {
                this.items = JSON.parse(savedWishlist);
            } catch (e) {
                console.error('Error parsing wishlist from localStorage:', e);
                this.items = [];
            }
        }
    }
};

// Initialize cart
function initializeCart() {
    // Load cart from localStorage
    cart.loadCart();
    
    // Update UI
    updateCartUI();
}

// Initialize wishlist
function initializeWishlist() {
    // Load wishlist from localStorage
    wishlist.loadWishlist();
    
    // Update UI
    updateWishlistUI();
}

// Update cart UI
function updateCartUI() {
    // Update cart count badges
    const cartCountElements = document.querySelectorAll('.cart-count-badge');
    const cartCount = cart.getCount();
    
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
        element.style.display = cartCount > 0 ? 'block' : 'none';
    });
    
    // Check if we're on the cart page
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    
    if (cartItemsContainer && emptyCartMessage && cartContent) {
        // We're on the cart page
        if (cart.items.length === 0) {
            // Show empty cart message
            emptyCartMessage.classList.remove('d-none');
            cartContent.classList.add('d-none');
        } else {
            // Show cart content
            emptyCartMessage.classList.add('d-none');
            cartContent.classList.remove('d-none');
            
            // Render cart items
            renderCartItems();
            
            // Update cart summary
            updateCartSummary();
        }
    }
    
    // Check if we're on the checkout page
    const checkoutItemsContainer = document.getElementById('checkout-items');
    
    if (checkoutItemsContainer) {
        // We're on the checkout page
        renderCheckoutItems();
        updateCheckoutSummary();
    }
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (!cartItemsContainer) return;
    
    // Clear container
    cartItemsContainer.innerHTML = '';
    
    // Add each item to the container
    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item mb-3';
        itemElement.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-3 col-md-2">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                        </div>
                        <div class="col-9 col-md-4">
                            <h5 class="mb-1">${item.name}</h5>
                            <p class="text-muted mb-0">
                                <a href="product.html?id=${item.id}" class="text-decoration-none">View details</a>
                            </p>
                        </div>
                        <div class="col-6 col-md-2 mt-3 mt-md-0">
                            <div class="quantity-control d-flex align-items-center">
                                <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-product-id="${item.id}">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" class="form-control form-control-sm mx-2 quantity-input" 
                                    value="${item.quantity}" min="1" data-product-id="${item.id}">
                                <button class="btn btn-sm btn-outline-secondary increase-quantity" data-product-id="${item.id}">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-6 col-md-2 mt-3 mt-md-0 text-end">
                            <p class="price mb-0">${item.price}</p>
                            <p class="item-total text-success mb-0">
                                ${calculateItemTotal(item)}
                            </p>
                        </div>
                        <div class="col-12 col-md-2 mt-3 mt-md-0 text-end">
                            <div class="d-flex flex-column align-items-end">
                                <button class="btn btn-sm btn-outline-danger remove-from-cart mb-2" data-product-id="${item.id}">
                                    <i class="fas fa-trash me-1"></i> Remove
                                </button>
                                <button class="btn btn-sm btn-outline-primary move-to-wishlist" data-product-id="${item.id}">
                                    <i class="fas fa-heart me-1"></i> Save for later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    // Add event listeners to the newly created elements
    addCartItemEventListeners();
}

// Add event listeners to cart item elements
function addCartItemEventListeners() {
    // Decrease quantity buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const itemIndex = cart.items.findIndex(item => item.id === productId);
            
            if (itemIndex !== -1) {
                const currentQuantity = cart.items[itemIndex].quantity;
                cart.updateQuantity(productId, currentQuantity - 1);
            }
        });
    });
    
    // Increase quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const itemIndex = cart.items.findIndex(item => item.id === productId);
            
            if (itemIndex !== -1) {
                const currentQuantity = cart.items[itemIndex].quantity;
                cart.updateQuantity(productId, currentQuantity + 1);
            }
        });
    });
    
    // Quantity input fields
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.dataset.productId;
            const newQuantity = parseInt(this.value) || 1;
            
            cart.updateQuantity(productId, newQuantity);
        });
    });
    
    // Remove from cart buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            
            // Show confirmation dialog
            Swal.fire({
                title: 'Remove item?',
                text: 'Are you sure you want to remove this item from your cart?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, remove it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    cart.removeItem(productId);
                    
                    Swal.fire(
                        'Removed!',
                        'The item has been removed from your cart.',
                        'success'
                    );
                }
            });
        });
    });
    
    // Move to wishlist buttons
    document.querySelectorAll('.move-to-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            
            // Add to wishlist
            wishlist.addItem(productId);
            
            // Remove from cart
            cart.removeItem(productId);
            
            // Show success message
            Swal.fire({
                title: 'Saved for later!',
                text: 'The item has been moved to your wishlist.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        });
    });
}

// Update cart summary
function updateCartSummary() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const taxElement = document.getElementById('cart-tax');
    const totalElement = document.getElementById('cart-total');
    
    if (!subtotalElement || !taxElement || !totalElement) return;
    
    const subtotal = cart.getTotal();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    subtotalElement.textContent = formatCurrency(subtotal);
    taxElement.textContent = formatCurrency(tax);
    totalElement.textContent = formatCurrency(total);
}

// Render checkout items
function renderCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    
    if (!checkoutItemsContainer) return;
    
    // Clear container
    checkoutItemsContainer.innerHTML = '';
    
    // Add each item to the container
    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item d-flex align-items-center mb-3 pb-3 border-bottom';
        itemElement.innerHTML = `
            <div class="checkout-item-image me-3">
                <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" style="width: 60px;">
            </div>
            <div class="checkout-item-details flex-grow-1">
                <div class="d-flex justify-content-between">
                    <h6 class="mb-0">${item.name}</h6>
                    <span class="text-muted">${item.price}</span>
                </div>
                <p class="text-muted small mb-0">Quantity: ${item.quantity}</p>
            </div>
        `;
        
        checkoutItemsContainer.appendChild(itemElement);
    });
}

// Update checkout summary
function updateCheckoutSummary() {
    const subtotalElement = document.getElementById('checkout-subtotal');
    const taxElement = document.getElementById('checkout-tax');
    const totalElement = document.getElementById('checkout-total');
    
    if (!subtotalElement || !taxElement || !totalElement) return;
    
    const subtotal = cart.getTotal();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    subtotalElement.textContent = formatCurrency(subtotal);
    taxElement.textContent = formatCurrency(tax);
    totalElement.textContent = formatCurrency(total);
}

// Update wishlist UI
function updateWishlistUI() {
    // Update wishlist count badges
    const wishlistCountElements = document.querySelectorAll('.wishlist-count-badge');
    const wishlistCount = wishlist.getCount();
    
    wishlistCountElements.forEach(element => {
        element.textContent = wishlistCount;
        element.style.display = wishlistCount > 0 ? 'block' : 'none';
    });
    
    // Check if we're on the wishlist page
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const emptyWishlistMessage = document.getElementById('empty-wishlist');
    const wishlistContent = document.getElementById('wishlist-content');
    
    if (wishlistItemsContainer && emptyWishlistMessage && wishlistContent) {
        // We're on the wishlist page
        if (wishlist.items.length === 0) {
            // Show empty wishlist message
            emptyWishlistMessage.classList.remove('d-none');
            wishlistContent.classList.add('d-none');
        } else {
            // Show wishlist content
            emptyWishlistMessage.classList.add('d-none');
            wishlistContent.classList.remove('d-none');
            
            // Render wishlist items
            renderWishlistItems();
        }
    }
    
    // Update like buttons on product cards
    updateLikeButtons();
}

// Render wishlist items
function renderWishlistItems() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    
    if (!wishlistItemsContainer) return;
    
    // Clear container
    wishlistItemsContainer.innerHTML = '';
    
    // Add each item to the container
    wishlist.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'col-md-6 col-lg-4 mb-4';
        itemElement.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="wishlist-item-actions">
                    <button class="btn btn-sm btn-danger remove-from-wishlist" data-product-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text price">${item.price}</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary add-to-cart-from-wishlist" data-product-id="${item.id}">
                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                        </button>
                        <a href="product.html?id=${item.id}" class="btn btn-outline-secondary">View Details</a>
                    </div>
                </div>
            </div>
        `;
        
        wishlistItemsContainer.appendChild(itemElement);
    });
    
    // Add event listeners to the newly created elements
    addWishlistItemEventListeners();
}

// Add event listeners to wishlist item elements
function addWishlistItemEventListeners() {
    // Remove from wishlist buttons
    document.querySelectorAll('.remove-from-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            
            // Show confirmation dialog
            Swal.fire({
                title: 'Remove item?',
                text: 'Are you sure you want to remove this item from your wishlist?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, remove it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    wishlist.removeItem(productId);
                    
                    Swal.fire(
                        'Removed!',
                        'The item has been removed from your wishlist.',
                        'success'
                    );
                }
            });
        });
    });
    
    // Add to cart from wishlist buttons
    document.querySelectorAll('.add-to-cart-from-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            
            // Add to cart
            cart.addItem(productId);
            
            // Remove from wishlist
            wishlist.removeItem(productId);
            
            // Show success message
            Swal.fire({
                title: 'Added to cart!',
                text: 'The item has been moved to your cart.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        });
    });
}

// Update like buttons on product cards
function updateLikeButtons() {
    document.querySelectorAll('.like-btn').forEach(button => {
        const productId = button.getAttribute('data-product-id');
        
        if (wishlist.hasItem(productId)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Calculate item total
function calculateItemTotal(item) {
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    const total = price * item.quantity;
    
    return formatCurrency(total);
}

// Format currency
function formatCurrency(amount) {
    return '₹' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Setup event listeners
function setupEventListeners() {
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            
            // Add to cart
            if (cart.addItem(productId)) {
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
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            
            // Clear cart first
            cart.clearCart();
            
            // Add to cart
            if (cart.addItem(productId)) {
                // Redirect to checkout
                window.location.href = 'checkout.html';
            }
        });
    });
    
    // Like buttons (wishlist toggle)
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.dataset.productId;
            
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
        });
    });
}

// Function to toggle wishlist item (used globally)
function toggleWishlist(button, productId) {
    // Toggle wishlist item
    const isAdded = wishlist.toggleItem(productId);
    
    // Update button state
    if (isAdded) {
        button.classList.add('active');
        
        // Show success message
        Swal.fire({
            title: 'Added to wishlist!',
            text: 'The item has been added to your wishlist.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
    } else {
        button.classList.remove('active');
        
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
