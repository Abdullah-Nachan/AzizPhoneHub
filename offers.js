/**
 * Offers data for the homepage and offer detail pages
 * Each offer contains detailed information and multiple images for the image slider
 */
const offers = [
    {
        id: "apple-watch-airpods-bundle",
        image: "./images/offer series9 and airpods2.jpg",
        images: [
            "./images/offer series9 and airpods2.jpg",
            "./images/Apple watch series 9.jpeg",
            "./images/AppleWatch Series 10.jpeg",
            "./images/smartwatch_series10.jpg",
            "./images/Airpods2_buds.jpg",
            "./images/airpods.jpeg"
        ],
        title: "Apple Watch & AirPods Bundle",
        shortDescription: "Get amazing discounts on this exclusive bundle!",
        fullDescription: "Take advantage of our limited-time offer and save big when you purchase an Apple Watch Series 9 and AirPods 2nd Generation together. This exclusive bundle gives you the perfect combination of premium wearable tech and high-quality audio at an unbeatable price.",
        originalPrice: "₹4,948",
        offerPrice: "₹3,999",
        discount: "20%",
        buttonText: "Shop Now",
        link: "offer.html?id=apple-watch-airpods-bundle",
        includedProducts: [
            "Apple Watch Series 9",
            "AirPods 2nd Generation"
        ],
        highlights: [
            "20% off when purchased as a bundle",
            "Free shipping",
            "1-year warranty on both products",
            "30-day money-back guarantee"
        ],
        expiryDate: "June 30, 2025"
    },
    {
        id: "airpods-max-bundle",
        image: "./images/offer airpodmax and airpods2.jpg",
        images: [
            "./images/offer airpodmax and airpods2.jpg",
            "./images/apple airpods max.jpeg",
            "./images/headphone_airpods_max.jpg",
            "./images/Airpods2_buds.jpg",
            "./images/airpods.jpeg",
            "./images/HeadPhone.jpeg"
        ],
        title: "AirPods Max & AirPods 2 Bundle",
        shortDescription: "Don't miss out on our flash sale!",
        fullDescription: "Experience the best of Apple audio with this exclusive AirPods Max and AirPods 2 bundle. Enjoy premium over-ear sound quality with AirPods Max for immersive listening at home, and take the compact AirPods 2 with you on the go. This limited-time offer gives you both at a significant discount.",
        originalPrice: "₹5,948",
        offerPrice: "₹4,499",
        discount: "25%",
        buttonText: "Explore Deal",
        link: "offer.html?id=airpods-max-bundle",
        includedProducts: [
            "AirPods Max",
            "AirPods 2nd Generation"
        ],
        highlights: [
            "25% off bundle discount",
            "Free premium carrying case",
            "Extended 18-month warranty",
            "Free Apple Music subscription for 3 months"
        ],
        expiryDate: "May 31, 2025"
    },
    {
        id: "airpods-pro-magsafe-bundle",
        image: "./images/offer airpodpro2 and magsafe.jpg",
        images: [
            "./images/offer airpodpro2 and magsafe.jpg",
            "./images/airpods_pro2.jpeg",
            "./images/AirPodsPro2.jpg",
            "./images/magsafe.jpeg",
            "./images/apple magsafe battery pack.jpeg",
            "./images/airpods-images/aripods_pro2/1.webp"
        ],
        title: "AirPods Pro 2 & MagSafe Bundle",
        shortDescription: "Discover our latest deals and promotions!",
        fullDescription: "Power up your Apple experience with this AirPods Pro 2 and MagSafe Battery Pack bundle. Enjoy the premium sound quality and active noise cancellation of AirPods Pro 2, while keeping your iPhone charged on the go with the MagSafe Battery Pack. This perfect pairing is available at a special discounted price for a limited time.",
        originalPrice: "₹1,798",
        offerPrice: "₹1,499",
        discount: "17%",
        buttonText: "Learn More",
        link: "offer.html?id=airpods-pro-magsafe-bundle",
        includedProducts: [
            "AirPods Pro 2",
            "MagSafe Battery Pack 5000mAh"
        ],
        highlights: [
            "17% off bundle discount",
            "Free express shipping",
            "Exclusive silicone case included",
            "Extended battery warranty"
        ],
        expiryDate: "July 15, 2025"
    }
];

/**
 * Get all offers as an array
 * @returns {Array} Array of all offer objects
 */
function getAllOffers() {
    return offers;
}

/**
 * Get an offer by its ID
 * @param {string} id - Offer ID to look up
 * @returns {Object|null} Offer object or null if not found
 */
function getOfferById(id) {
    return offers.find(offer => offer.id === id) || null;
}
