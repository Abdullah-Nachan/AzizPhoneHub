/**
 * Checkout functionality for Aziz Phone Hub
 * Handles checkout process and form validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout
    initializeCheckout();
    
    // Setup event listeners
    setupCheckoutEventListeners();
});

// Initialize checkout
function initializeCheckout() {
    // Check if cart is empty
    if (cart.items.length === 0) {
        // Redirect to cart page
        window.location.href = 'cart.html';
        return;
    }
    
    // Render checkout items
    renderCheckoutItems();
    
    // Update checkout summary
    updateCheckoutSummary();
}

// Setup checkout event listeners
function setupCheckoutEventListeners() {
    // Checkout form
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateCheckoutForm()) {
                // Process checkout
                processCheckout();
            }
        });
    }
    
    // Shipping option radios
    const shippingOptions = document.querySelectorAll('input[name="shipping-option"]');
    
    if (shippingOptions.length > 0) {
        shippingOptions.forEach(option => {
            option.addEventListener('change', function() {
                updateCheckoutSummary();
            });
        });
    }
    
    // Same address checkbox
    const sameAddressCheckbox = document.getElementById('same-address');
    
    if (sameAddressCheckbox) {
        sameAddressCheckbox.addEventListener('change', function() {
            // Toggle billing address fields
            toggleBillingAddressFields(this.checked);
        });
    }
}

// Validate checkout form
function validateCheckoutForm() {
    // Get form elements
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const country = document.getElementById('country');
    const state = document.getElementById('state');
    const zip = document.getElementById('zip');
    
    // Validate email
    if (!email.value || !isValidEmail(email.value)) {
        showError('Please enter a valid email address');
        email.focus();
        return false;
    }
    
    // Validate phone
    if (!phone.value || !isValidPhone(phone.value)) {
        showError('Please enter a valid phone number');
        phone.focus();
        return false;
    }
    
    // Validate first name
    if (!firstName.value.trim()) {
        showError('Please enter your first name');
        firstName.focus();
        return false;
    }
    
    // Validate last name
    if (!lastName.value.trim()) {
        showError('Please enter your last name');
        lastName.focus();
        return false;
    }
    
    // Validate address
    if (!address.value.trim()) {
        showError('Please enter your address');
        address.focus();
        return false;
    }
    
    // Validate country
    if (!country.value) {
        showError('Please select your country');
        country.focus();
        return false;
    }
    
    // Validate state
    if (!state.value) {
        showError('Please select your state');
        state.focus();
        return false;
    }
    
    // Validate zip
    if (!zip.value.trim() || !isValidZip(zip.value)) {
        showError('Please enter a valid pincode');
        zip.focus();
        return false;
    }
    
    return true;
}

// Process checkout
function processCheckout() {
    // Show loading
    Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we process your order',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });
    
    // Simulate processing (in a real app, this would be an API call)
    setTimeout(() => {
        // Generate order number
        const orderNumber = generateOrderNumber();
        
        // Clear cart
        cart.clearCart();
        
        // Show success message
        Swal.fire({
            title: 'Order Placed!',
            html: `
                <p>Your order has been successfully placed.</p>
                <p>Order Number: <strong>${orderNumber}</strong></p>
                <p>Thank you for shopping with Aziz Phone Hub!</p>
            `,
            icon: 'success',
            confirmButtonText: 'Continue Shopping'
        }).then(() => {
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }, 2000);
}

// Toggle billing address fields
function toggleBillingAddressFields(isSameAddress) {
    // In a real implementation, this would show/hide billing address fields
    console.log('Same address:', isSameAddress);
}

// Show error message
function showError(message) {
    Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone
function isValidPhone(phone) {
    // Basic validation - in a real app, this would be more sophisticated
    return phone.replace(/\D/g, '').length >= 10;
}

// Validate zip
function isValidZip(zip) {
    // Basic validation for Indian pincode
    return /^\d{6}$/.test(zip.replace(/\D/g, ''));
}

// Generate order number
function generateOrderNumber() {
    const timestamp = new Date().getTime().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `AZ-${timestamp}-${random}`;
}

// Update checkout summary based on shipping option
function updateCheckoutSummary() {
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const taxElement = document.getElementById('checkout-tax');
    const totalElement = document.getElementById('checkout-total');
    
    if (!subtotalElement || !shippingElement || !taxElement || !totalElement) return;
    
    const subtotal = cart.getTotal();
    
    // Get selected shipping option
    const expressShipping = document.getElementById('express-shipping');
    const shippingCost = expressShipping && expressShipping.checked ? 199 : 0;
    
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax + shippingCost;
    
    subtotalElement.textContent = formatCurrency(subtotal);
    shippingElement.textContent = shippingCost > 0 ? formatCurrency(shippingCost) : 'Free';
    taxElement.textContent = formatCurrency(tax);
    totalElement.textContent = formatCurrency(total);
}

// Format currency
function formatCurrency(amount) {
    return '₹' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
