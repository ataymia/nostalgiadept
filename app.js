// ==========================================
// Under Construction Password Protection
// ==========================================
const CONSTRUCTION_PASSWORD = 'ataymiadagoat';
const CONSTRUCTION_SESSION_KEY = 'construction_access_granted';

function checkConstructionAccess() {
    // Check if access was already granted in this session
    const accessGranted = sessionStorage.getItem(CONSTRUCTION_SESSION_KEY);
    if (accessGranted === 'true') {
        hideConstructionOverlay();
    } else {
        showConstructionOverlay();
    }
}

function showConstructionOverlay() {
    document.body.classList.add('construction-active');
    const overlay = document.getElementById('constructionOverlay');
    if (overlay) {
        overlay.classList.remove('hidden');
    }
}

function hideConstructionOverlay() {
    document.body.classList.remove('construction-active');
    const overlay = document.getElementById('constructionOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function verifyConstructionPassword() {
    const passwordInput = document.getElementById('constructionPassword');
    const errorDiv = document.getElementById('constructionError');
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === CONSTRUCTION_PASSWORD) {
        // Grant access for this session
        sessionStorage.setItem(CONSTRUCTION_SESSION_KEY, 'true');
        hideConstructionOverlay();
        errorDiv.textContent = '';
        passwordInput.value = '';
    } else {
        // Show error message
        errorDiv.textContent = '❌ Incorrect password. Try again!';
        passwordInput.value = '';
        passwordInput.focus();
        
        // Shake animation on error
        const content = document.querySelector('.construction-content');
        content.style.animation = 'none';
        setTimeout(() => {
            content.style.animation = '';
        }, 10);
    }
}

// ==========================================
// State Management
// ==========================================
let products = [];
let cart = [];
let currentFilter = 'all';
let currentCollection = null;
let searchTerm = '';

// ==========================================
// Initialize App
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Check construction access first
    checkConstructionAccess();
    
    // Setup construction password form
    const constructionSubmit = document.getElementById('constructionSubmit');
    const constructionPassword = document.getElementById('constructionPassword');
    
    if (constructionSubmit) {
        constructionSubmit.addEventListener('click', verifyConstructionPassword);
    }
    
    if (constructionPassword) {
        constructionPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                verifyConstructionPassword();
            }
        });
    }
    
    // Load main app
    loadProducts();
    loadCart();
    setupEventListeners();
    updateCartBadge();
});

// ==========================================
// Load Products from JSON
// ==========================================
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        products = await response.json();
        renderProducts();
        renderSubscriptions();
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('productGrid').innerHTML = 
            '<p class="no-results">Error loading products. Please refresh the page.</p>';
    }
}

// ==========================================
// Event Listeners Setup
// ==========================================
function setupEventListeners() {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Navigation links
    document.querySelectorAll('.nav-link[data-filter]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.dataset.filter;
            applyFilter(filter);
            navMenu.classList.remove('active');
            document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            applyFilter(filter);
        });
    });

    // Collection buttons
    document.querySelectorAll('[data-collection]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const collection = e.target.dataset.collection;
            filterByCollection(collection);
            document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Hero CTA buttons
    document.querySelectorAll('.hero-buttons .btn[data-filter]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.dataset.filter;
            applyFilter(filter);
            document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderProducts();
    });

    // Cart
    const cartButton = document.getElementById('cartButton');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCart = document.getElementById('closeCart');
    
    cartButton.addEventListener('click', () => {
        cartDrawer.classList.add('open');
    });
    
    closeCart.addEventListener('click', () => {
        cartDrawer.classList.remove('open');
    });

    // Clear cart
    document.getElementById('clearCart').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            saveCart();
            renderCart();
            updateCartBadge();
        }
    });

    // Checkout
    document.getElementById('checkoutButton').addEventListener('click', () => {
        showCheckoutModal();
    });

    // Modal close buttons
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('productModal').classList.remove('open');
    });

    document.getElementById('closeCheckoutModal').addEventListener('click', () => {
        document.getElementById('checkoutModal').classList.remove('open');
    });

    // Close modals on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    });
}

// ==========================================
// Filter & Search Functions
// ==========================================
function applyFilter(filter) {
    currentFilter = filter;
    currentCollection = null;
    searchTerm = '';
    document.getElementById('searchInput').value = '';
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    renderProducts();
}

function filterByCollection(collection) {
    currentCollection = collection;
    currentFilter = 'all';
    searchTerm = '';
    document.getElementById('searchInput').value = '';
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    
    renderProducts();
}

function getFilteredProducts() {
    let filtered = products;

    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Apply collection filter
    if (currentCollection) {
        filtered = filtered.filter(p => 
            p.collections && p.collections.includes(currentCollection)
        );
    }

    // Apply search
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.shortDescription.toLowerCase().includes(searchTerm) ||
            p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    return filtered;
}

// ==========================================
// Render Functions
// ==========================================
function renderProducts() {
    const grid = document.getElementById('productGrid');
    const noResults = document.getElementById('noResults');
    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${getProductEmoji(product.category)}
                <div class="product-badges">
                    ${product.isNew ? '<span class="badge badge-new">New</span>' : ''}
                    ${product.originalPrice ? '<span class="badge badge-sale">Sale</span>' : ''}
                    ${product.subscription ? '<span class="badge badge-subscription">Monthly</span>' : ''}
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-collections">
                    ${product.collections.slice(0, 2).map(c => 
                        `<span class="collection-tag">${c}</span>`
                    ).join('')}
                </div>
                <p class="product-description">${product.shortDescription}</p>
                <div class="product-price">
                    <span class="price-current">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? 
                        `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn btn-outline" onclick="showProductDetail('${product.id}')">
                        View Details
                    </button>
                    <button class="btn btn-primary" onclick="addToCart('${product.id}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderSubscriptions() {
    const grid = document.getElementById('subscriptionGrid');
    const subscriptions = products.filter(p => p.subscription);

    grid.innerHTML = subscriptions.map(sub => `
        <div class="subscription-card">
            <span class="badge badge-subscription">Monthly Subscription</span>
            <h3>${sub.name}</h3>
            <p>${sub.description}</p>
            <div class="subscription-details">
                ${sub.includes ? `<p><strong>Includes:</strong> ${sub.includes}</p>` : ''}
                ${sub.surpriseFactor ? `<p><strong>Surprise Factor:</strong> ${sub.surpriseFactor}</p>` : ''}
                <p><strong>Billing:</strong> ${sub.billingInterval}</p>
            </div>
            <div class="product-price">
                <span class="price-current">$${sub.price.toFixed(2)}/month</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-outline" onclick="showProductDetail('${sub.id}')">
                    Learn More
                </button>
                <button class="btn btn-primary" onclick="addToCart('${sub.id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function getProductEmoji(category) {
    const emojiMap = {
        '90s': '🎮',
        'regional': '🌎',
        'snacks': '🍿',
        'womens-apparel': '👗',
        'mens-apparel': '👕',
        'shoes': '👟',
        'toys': '🎪'
    };
    return emojiMap[category] || '🎁';
}

// ==========================================
// Product Detail Modal
// ==========================================
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                ${getProductEmoji(product.category)}
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <div class="product-detail-collections">
                    ${product.collections.map(c => 
                        `<span class="collection-tag">${c}</span>`
                    ).join('')}
                </div>
                ${product.subscription ? 
                    `<div class="subscription-details">
                        <p><strong>📦 This is a monthly subscription box</strong></p>
                        ${product.includes ? `<p>${product.includes}</p>` : ''}
                        ${product.surpriseFactor ? `<p>${product.surpriseFactor}</p>` : ''}
                    </div>` : ''}
                <div class="product-price">
                    <span class="price-current">$${product.price.toFixed(2)}${product.subscription ? '/month' : ''}</span>
                    ${product.originalPrice ? 
                        `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <p class="product-detail-description">${product.description}</p>
                
                ${product.variants && product.variants.length > 0 ? `
                    <div class="variant-selector">
                        <label for="variantSelect">Select Size/Variant:</label>
                        <select id="variantSelect">
                            ${product.variants.map(v => `
                                <option value="${v.label}" ${!v.inStock ? 'disabled' : ''}>
                                    ${v.label} ${!v.inStock ? '(Out of Stock)' : ''}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                ` : ''}
                
                <div class="quantity-selector">
                    <label for="quantityInput">Quantity:</label>
                    <input type="number" id="quantityInput" min="1" value="1">
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-primary btn-block" onclick="addToCartFromModal('${product.id}')">
                        Add to Cart
                    </button>
                    ${product.paymentLink ? `
                        <a href="${product.paymentLink}" target="_blank" class="btn btn-secondary btn-block">
                            Checkout via Stripe
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    document.getElementById('productModal').classList.add('open');
}

// ==========================================
// Cart Functions
// ==========================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if product has variants - if so, open detail modal instead
    if (product.variants && product.variants.length > 0) {
        showProductDetail(productId);
        return;
    }

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        quantity: 1,
        variant: null
    };

    const existingIndex = cart.findIndex(item => 
        item.id === productId && item.variant === null
    );

    if (existingIndex >= 0) {
        cart[existingIndex].quantity++;
    } else {
        cart.push(cartItem);
    }

    saveCart();
    renderCart();
    updateCartBadge();
    
    // Show cart drawer
    document.getElementById('cartDrawer').classList.add('open');
}

function addToCartFromModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const quantityInput = document.getElementById('quantityInput');
    const variantSelect = document.getElementById('variantSelect');
    
    const quantity = parseInt(quantityInput?.value || 1);
    const variant = variantSelect?.value || null;

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        quantity: quantity,
        variant: variant
    };

    const existingIndex = cart.findIndex(item => 
        item.id === productId && item.variant === variant
    );

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push(cartItem);
    }

    saveCart();
    renderCart();
    updateCartBadge();
    
    // Close product modal and show cart
    document.getElementById('productModal').classList.remove('open');
    document.getElementById('cartDrawer').classList.add('open');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartBadge();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        renderCart();
        updateCartBadge();
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');

    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartEmpty.style.display = 'block';
        cartFooter.style.display = 'none';
        return;
    }

    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image">
                ${getProductEmoji(item.category)}
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                ${item.variant ? `<div class="cart-item-variant">Size: ${item.variant}</div>` : ''}
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    updateSubtotal();
}

function updateSubtotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').textContent = totalItems;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
        renderCart();
    }
}

// ==========================================
// Checkout Modal
// ==========================================
function showCheckoutModal() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const checkoutContent = document.getElementById('checkoutContent');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Check if all items have payment links
    const allHaveLinks = cart.every(item => {
        const product = products.find(p => p.id === item.id);
        return product && product.paymentLink;
    });

    if (allHaveLinks) {
        checkoutContent.innerHTML = `
            <div class="cart-summary">
                <h3>Order Summary</h3>
                ${cart.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>${item.name} ${item.variant ? `(${item.variant})` : ''} x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
                <div style="border-top: 2px solid #ccc; margin-top: 1rem; padding-top: 1rem; display: flex; justify-content: space-between; font-weight: bold; font-size: 1.25rem;">
                    <span>Total:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
            </div>
            <div style="margin-top: 2rem;">
                <h3>Complete Your Purchase</h3>
                <p>Click the buttons below to checkout each item via Stripe:</p>
                ${cart.map(item => {
                    const product = products.find(p => p.id === item.id);
                    return `
                        <a href="${product.paymentLink}" target="_blank" class="btn btn-primary btn-block" style="margin-bottom: 0.5rem;">
                            Checkout: ${item.name} ${item.variant ? `(${item.variant})` : ''} - $${(item.price * item.quantity).toFixed(2)}
                        </a>
                    `;
                }).join('')}
            </div>
        `;
    } else {
        checkoutContent.innerHTML = `
            <div class="cart-summary">
                <h3>Order Summary</h3>
                ${cart.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>${item.name} ${item.variant ? `(${item.variant})` : ''} x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
                <div style="border-top: 2px solid #ccc; margin-top: 1rem; padding-top: 1rem; display: flex; justify-content: space-between; font-weight: bold; font-size: 1.25rem;">
                    <span>Total:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
            </div>
            <div style="margin-top: 2rem;">
                <h3>How to Complete Your Payment</h3>
                <p>We accept the following payment methods:</p>
                <ul style="line-height: 2;">
                    <li><strong>Stripe:</strong> Some items have direct payment links</li>
                    <li><strong>CashApp:</strong> $nostalgiadept</li>
                    <li><strong>PayPal:</strong> payments@nostalgiadept.com</li>
                    <li><strong>Venmo:</strong> @nostalgiadept</li>
                </ul>
                <p style="margin-top: 1rem;">Please include your order details in the payment note. We'll send a confirmation email once payment is received!</p>
            </div>
        `;
    }

    document.getElementById('checkoutModal').classList.add('open');
    document.getElementById('cartDrawer').classList.remove('open');
}
