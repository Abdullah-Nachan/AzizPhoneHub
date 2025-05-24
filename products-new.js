/**
 * Product data store
 * Contains all product information extracted from static HTML pages
 * Structured for use with dynamic product.html and category.html pages
 */
const products = {
  "airpods01": {
    id: "airpods01",
    name: "AirPods Gen 4 (ANC)",
    image: "images/airpods_gen4.jpg",
    price: "₹1,799",
    description: "The latest AirPods with Active Noise Cancellation for immersive sound experience.",
    category: "airpods"
  },
  "airpods-pro-2": {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    image: "images/airpods_pro2.jpeg",
    price: "₹999",
    description: "Premium wireless earbuds with active noise cancellation and transparency mode.",
    category: "airpods"
  },
  "airpods-pro-2-display": {
    id: "airpods-pro-2-display",
    name: "AirPods Pro 2 with Display",
    image: "images/airpods_pro2_display.png",
    price: "₹1,499",
    description: "AirPods Pro 2 with LED display on the charging case to show battery status and notifications.",
    category: "airpods"
  },
  "airpods-3": {
    id: "airpods-3",
    name: "AirPods 3rd Generation",
    image: "images/Airpods3_buds.jpeg",
    price: "₹949",
    description: "Third-generation AirPods with spatial audio and adaptive EQ for an immersive listening experience.",
    category: "airpods"
  },
  "airpods-2": {
    id: "airpods-2",
    name: "AirPods 2nd Generation",
    image: "images/Airpods2_buds.jpg",
    price: "₹949",
    description: "Second-generation AirPods with H1 chip for faster wireless connection and 'Hey Siri' support.",
    category: "airpods"
  },
  "galaxy-buds-2-pro": {
    id: "galaxy-buds-2-pro",
    name: "Samsung Galaxy Buds 2 Pro",
    image: "images/galaxy_buds_2pro.jpeg",
    price: "₹999",
    description: "Samsung's premium wireless earbuds with intelligent ANC and high-quality sound.",
    category: "airpods"
  },
  "airpods-max": {
    id: "airpods-max",
    name: "AirPods Max",
    image: "images/headphone_airpods_max.jpg",
    price: "₹1,999",
    description: "Over-ear headphones with high-fidelity audio, active noise cancellation, and spatial audio.",
    category: "headphones"
  },
  "bose-qc-ultra": {
    id: "bose-qc-ultra",
    name: "Bose QC Ultra",
    image: "images/headphone_bose_qc_ultra.jpg",
    price: "₹1,699",
    description: "Premium noise-cancelling headphones with exceptional sound quality and comfort.",
    category: "headphones"
  },
  "samsung-watch-ultra": {
    id: "samsung-watch-ultra",
    name: "Samsung Watch Ultra",
    image: "images/smartwatch_samsung_ultra.jpg",
    price: "₹1,499",
    description: "Premium smartwatch with advanced health monitoring and fitness tracking features.",
    category: "smartwatches"
  },
  "active-2-smartwatch": {
    id: "active-2-smartwatch",
    name: "Active 2 Smartwatch",
    image: "images/smartwatch_active2.jpeg",
    price: "₹1,499",
    description: "Fitness-focused smartwatch with heart rate monitoring and activity tracking.",
    category: "smartwatches"
  },
  "gen-9-pro": {
    id: "gen-9-pro",
    name: "Gen 9 Pro Bluetooth Calling Smartwatch",
    image: "images/smartwatch_gen9pro.jpeg",
    price: "₹1,450",
    description: "Feature-rich smartwatch with Bluetooth calling and health monitoring capabilities.",
    category: "smartwatches"
  },
  "t10-ultra": {
    id: "t10-ultra",
    name: "T10 Ultra Bluetooth Smartwatch",
    image: "images/smartwatch_t10ultra.jpeg",
    price: "₹649",
    description: "Affordable smartwatch with essential features and long battery life.",
    category: "smartwatches"
  },
  "z86-pro-max": {
    id: "z86-pro-max",
    name: "Z86 Pro Max Smartwatch",
    image: "images/smartwatch_z86promax.jpeg",
    price: "₹1,599",
    description: "Advanced smartwatch with large display and comprehensive health tracking features.",
    category: "smartwatches"
  },
  "nike-vomero-black": {
    id: "nike-vomero-black",
    name: "Nike Zoom Vomero Triple Black",
    image: "images/shoes_nike_vomero_black.jpg",
    price: "₹1,999",
    description: "Premium running shoes with responsive cushioning and sleek all-black design.",
    category: "shoes"
  },
  "nike-vomero-white": {
    id: "nike-vomero-white",
    name: "Nike Zoom Vomero White-Black",
    image: "images/shoes_nike_vomero_white.jpg",
    price: "₹1,999",
    description: "Stylish running shoes with responsive cushioning in a classic white and black colorway.",
    category: "shoes"
  },
  "puma-suede-crush": {
    id: "puma-suede-crush",
    name: "Puma XL Suede Crush Black White",
    image: "images/shoes_puma_suede.jpg",
    price: "₹1,899",
    description: "Classic Puma suede sneakers with a platform sole and timeless black and white design.",
    category: "shoes"
  },
  "boss-hugo": {
    id: "boss-hugo",
    name: "Boss Hugo",
    image: "images/watch_boss.jpg",
    price: "₹1,799",
    description: "Elegant Boss Hugo watch with premium materials and sophisticated design.",
    category: "casualwatch"
  },
  "cartier-roman": {
    id: "cartier-roman",
    name: "Cartier Roman Dial",
    image: "images/watch_cartier.jpg",
    price: "₹1,799",
    description: "Luxurious Cartier watch with classic Roman numeral dial and timeless design.",
    category: "casualwatch"
  },
  "gshock-manga": {
    id: "gshock-manga",
    name: "G-Shock Manga Edition",
    image: "images/watch_gshock.jpg",
    price: "₹1,799",
    description: "Limited edition G-Shock watch with manga-inspired design and rugged durability.",
    category: "casualwatch"
  },
  "omega-seamaster": {
    id: "omega-seamaster",
    name: "Omega Seamaster",
    image: "images/watch_omega.jpg",
    price: "₹1,799",
    description: "Iconic Omega Seamaster watch with professional diving features and elegant styling.",
    category: "casualwatch"
  },
  "tissot-trace": {
    id: "tissot-trace",
    name: "Tissot T-race Chronograph",
    image: "images/watch_tissot.jpg",
    price: "₹1,599",
    description: "Sports-inspired Tissot chronograph watch with racing design elements.",
    category: "casualwatch"
  },
  "literide-360": {
    id: "literide-360",
    name: "Crocs LiteRide 360",
    image: "images/crocs_literide360.jpeg",
    price: "₹1,799",
    description: "Ultra-comfortable Crocs with LiteRide foam technology for all-day wear.",
    category: "crocs"
  },
  "bayband": {
    id: "bayband",
    name: "Crocs Bayaband",
    image: "images/crocs_bayband.jpeg",
    price: "₹1,899",
    description: "Classic Crocs design with signature Bayaband styling for added flair.",
    category: "crocs"
  },
  "bayband-flip": {
    id: "bayband-flip",
    name: "Crocs Bayaband Flip",
    image: "images/crocs_bayband_flip.jpeg",
    price: "₹1,899",
    description: "Comfortable flip-flop style Crocs with the signature Bayaband design.",
    category: "crocs"
  },
  "bayband-slide": {
    id: "bayband-slide",
    name: "Crocs Bayaband Slide",
    image: "images/crocs_bayband_slide.jpeg",
    price: "₹1,899",
    description: "Slide-style Crocs with Bayaband design for easy on-and-off wear.",
    category: "crocs"
  },
  "echo-clog": {
    id: "echo-clog",
    name: "Crocs Echo Clog",
    image: "images/crocs_echo_clog.jpeg",
    price: "₹1,899",
    description: "Modern clog-style Crocs with enhanced comfort and durability.",
    category: "crocs"
  },
  "yukon": {
    id: "yukon",
    name: "Crocs Yukon",
    image: "images/crocs_yukon.jpeg",
    price: "₹1,899",
    description: "Rugged Crocs design with leather upper for a more refined look.",
    category: "crocs"
  },
  "apple-power-adapter": {
    id: "apple-power-adapter",
    name: "Apple 20W USB-C Power Adapter",
    image: "images/moreproduct_adapter.jpg",
    price: "₹799",
    description: "Fast-charging 20W USB-C power adapter for iPhone, iPad, and AirPods.",
    category: "accessories"
  },
  "type-c-cable": {
    id: "type-c-cable",
    name: "Apple Type C to C Cable",
    image: "images/moreproduct_cable_C.jpeg",
    price: "₹999",
    description: "High-quality USB-C to USB-C cable for fast charging and data transfer.",
    category: "accessories"
  },
  "type-c-lightning-cable": {
    id: "type-c-lightning-cable",
    name: "Apple Type C to Lightning Cable",
    image: "images/moreproduct_cable.jpg",
    price: "₹399",
    description: "Official Apple USB-C to Lightning cable for fast charging iPhone and iPad devices.",
    category: "accessories"
  }
};

/**
 * Get all products as an array
 * @returns {Array} Array of all product objects
 */
function getAllProducts() {
  return Object.values(products);
}

/**
 * Get products filtered by category
 * @param {string} category - Category name to filter by
 * @returns {Array} Array of product objects in the specified category
 */
function getProductsByCategory(category) {
  return Object.values(products).filter(product => product.category === category);
}

/**
 * Get a product by its ID
 * @param {string} id - Product ID to look up
 * @returns {Object|null} Product object or null if not found
 */
function getProductById(id) {
  return products[id] || null;
}

/**
 * Get a list of all available categories
 * @returns {Array} Array of unique category names
 */
function getAllCategories() {
  const categories = new Set(Object.values(products).map(product => product.category));
  return Array.from(categories);
}

// Export the products object and helper functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products, getAllProducts, getProductsByCategory, getProductById, getAllCategories };
}
