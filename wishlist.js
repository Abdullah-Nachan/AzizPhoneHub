// Wishlist functionality
class Wishlist {
    constructor() {
        this.items = this.loadWishlist();
        this.updateWishlistCount();
    }

    // Load wishlist from localStorage
    loadWishlist() {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    }

    // Save wishlist to localStorage
    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
        this.updateWishlistCount();
    }

    // Add item to wishlist
    addItem(productId) {
        if (!this.items.includes(productId)) {
            this.items.push(productId);
            this.saveWishlist();
            return true;
        }
        return false;
    }

    // Remove item from wishlist
    removeItem(productId) {
        const index = this.items.indexOf(productId);
        if (index > -1) {
            this.items.splice(index, 1);
            this.saveWishlist();
            return true;
        }
        return false;
    }

    // Toggle item in wishlist
    toggleItem(productId) {
        if (this.hasItem(productId)) {
            this.removeItem(productId);
            return false;
        } else {
            this.addItem(productId);
            return true;
        }
    }


    // Check if item is in wishlist
    hasItem(productId) {
        return this.items.includes(productId);
    }

    // Get all wishlist items
    getItems() {
        return this.items;
    }

    // Clear wishlist
    clearWishlist() {
        this.items = [];
        this.saveWishlist();
    }

    // Update wishlist count in the UI
    updateWishlistCount() {
        const count = this.items.length;
        const countElements = document.querySelectorAll('.wishlist-count-badge');
        
        countElements.forEach(element => {
            if (count > 0) {
                element.textContent = count;
                element.style.display = 'flex';
            } else {
                element.style.display = 'none';
            }
        });

        // Also update the mobile navigation if it exists
        const mobileWishlistBadge = document.getElementById('mobile-nav-wishlist-count');
        if (mobileWishlistBadge) {
            if (count > 0) {
                mobileWishlistBadge.textContent = count;
                mobileWishlistBadge.style.display = 'flex';
            } else {
                mobileWishlistBadge.style.display = 'none';
            }
        }


        // Also update the desktop navigation if it exists
        const desktopWishlistBadge = document.getElementById('desktop-nav-wishlist-count');
        if (desktopWishlistBadge) {
            if (count > 0) {
                desktopWishlistBadge.textContent = count;
                desktopWishlistBadge.style.display = 'flex';
            } else {
                desktopWishlistBadge.style.display = 'none';
            }
        }
    }
}

// Initialize wishlist
const wishlist = new Wishlist();

// Update wishlist count when the page loads
document.addEventListener('DOMContentLoaded', function() {
    wishlist.updateWishlistCount();
});

// Make wishlist available globally
window.wishlist = wishlist;
