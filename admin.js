// ==========================================
// Admin Configuration
// ==========================================
const ADMIN_PASSWORD = 'changeme123'; // CHANGE THIS IN PRODUCTION!

// ==========================================
// State Management
// ==========================================
let products = [];
let editingId = null;

// ==========================================
// Initialize Admin
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupSubscriptionToggle();
});

// ==========================================
// Authentication
// ==========================================
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (isLoggedIn) {
        showAdminContent();
        loadProducts();
    } else {
        showLoginScreen();
    }
}

function login() {
    const password = document.getElementById('passwordInput').value;
    
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        showAdminContent();
        loadProducts();
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        showLoginScreen();
    }
}

function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('adminContent').classList.remove('active');
}

function showAdminContent() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminContent').classList.add('active');
}

// ==========================================
// Load Products
// ==========================================
async function loadProducts() {
    // First check if there's a draft in localStorage
    const draft = localStorage.getItem('productsDraft');
    
    if (draft) {
        const useDraft = confirm('Found a saved draft. Would you like to load it? Click Cancel to load from server.');
        if (useDraft) {
            products = JSON.parse(draft);
            renderProductsTable();
            return;
        }
    }

    // Load from server
    try {
        const response = await fetch('products.json');
        products = await response.json();
        renderProductsTable();
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Error loading products from server. Please refresh the page.');
    }
}

// ==========================================
// Render Products Table
// ==========================================
function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td><strong>${product.name}</strong></td>
            <td>${product.category}</td>
            <td>${product.collections.slice(0, 2).join(', ')}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <span class="status-badge ${product.inStock ? 'status-in-stock' : 'status-out-of-stock'}">
                    ${product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
            </td>
            <td>${product.subscription ? '✓ Yes' : '✗ No'}</td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-outline" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn btn-secondary" onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ==========================================
// Form Management
// ==========================================
function openAddForm() {
    editingId = null;
    document.getElementById('formTitle').textContent = 'Add Product';
    document.getElementById('productForm').reset();
    document.getElementById('editingId').value = '';
    document.getElementById('productInStock').checked = true;
    document.getElementById('productCurrency').value = 'USD';
    document.getElementById('editForm').classList.add('active');
}

function editProduct(id) {
    editingId = id;
    const product = products.find(p => p.id === id);
    
    if (!product) {
        alert('Product not found!');
        return;
    }

    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('editingId').value = id;
    
    // Populate form fields
    document.getElementById('productName').value = product.name;
    document.getElementById('productSlug').value = product.slug;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productCollections').value = product.collections.join(', ');
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productOriginalPrice').value = product.originalPrice || '';
    document.getElementById('productCurrency').value = product.currency;
    document.getElementById('productShortDescription').value = product.shortDescription;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productImages').value = product.images.join(', ');
    document.getElementById('productTags').value = product.tags.join(', ');
    document.getElementById('productPaymentLink').value = product.paymentLink || '';
    document.getElementById('productFeatured').checked = product.isFeatured;
    document.getElementById('productNew').checked = product.isNew;
    document.getElementById('productInStock').checked = product.inStock;
    document.getElementById('productSubscription').checked = product.subscription;
    
    // Subscription fields
    if (product.subscription) {
        document.getElementById('subscriptionFields').style.display = 'block';
        document.getElementById('productBillingInterval').value = product.billingInterval || 'monthly';
        document.getElementById('productIncludes').value = product.includes || '';
        document.getElementById('productSurpriseFactor').value = product.surpriseFactor || '';
    }
    
    // Variants
    if (product.variants && product.variants.length > 0) {
        document.getElementById('productVariants').value = JSON.stringify(product.variants, null, 2);
    } else {
        document.getElementById('productVariants').value = '';
    }

    document.getElementById('editForm').classList.add('active');
}

function closeForm() {
    document.getElementById('editForm').classList.remove('active');
    editingId = null;
}

function setupSubscriptionToggle() {
    const subscriptionCheckbox = document.getElementById('productSubscription');
    const subscriptionFields = document.getElementById('subscriptionFields');
    
    subscriptionCheckbox.addEventListener('change', (e) => {
        subscriptionFields.style.display = e.target.checked ? 'block' : 'none';
    });
}

// ==========================================
// Save Product
// ==========================================
function saveProduct(event) {
    event.preventDefault();

    const formData = {
        id: editingId || generateId(),
        name: document.getElementById('productName').value,
        slug: document.getElementById('productSlug').value,
        category: document.getElementById('productCategory').value,
        collections: document.getElementById('productCollections').value
            .split(',')
            .map(c => c.trim())
            .filter(c => c),
        price: parseFloat(document.getElementById('productPrice').value),
        originalPrice: parseFloat(document.getElementById('productOriginalPrice').value) || null,
        currency: document.getElementById('productCurrency').value,
        shortDescription: document.getElementById('productShortDescription').value,
        description: document.getElementById('productDescription').value,
        images: document.getElementById('productImages').value
            .split(',')
            .map(i => i.trim())
            .filter(i => i),
        isFeatured: document.getElementById('productFeatured').checked,
        isNew: document.getElementById('productNew').checked,
        inStock: document.getElementById('productInStock').checked,
        tags: document.getElementById('productTags').value
            .split(',')
            .map(t => t.trim())
            .filter(t => t),
        paymentLink: document.getElementById('productPaymentLink').value || '',
        subscription: document.getElementById('productSubscription').checked,
    };

    // Add subscription-specific fields
    if (formData.subscription) {
        formData.billingInterval = document.getElementById('productBillingInterval').value;
        const includes = document.getElementById('productIncludes').value;
        const surpriseFactor = document.getElementById('productSurpriseFactor').value;
        
        if (includes) formData.includes = includes;
        if (surpriseFactor) formData.surpriseFactor = surpriseFactor;
    }

    // Parse variants
    const variantsText = document.getElementById('productVariants').value.trim();
    if (variantsText) {
        try {
            formData.variants = JSON.parse(variantsText);
        } catch (error) {
            alert('Invalid JSON format for variants. Please check the format.');
            return;
        }
    } else {
        formData.variants = [];
    }

    // Update or add product
    if (editingId) {
        const index = products.findIndex(p => p.id === editingId);
        if (index >= 0) {
            products[index] = formData;
        }
    } else {
        products.push(formData);
    }

    renderProductsTable();
    closeForm();
    
    // Auto-save to localStorage
    saveDraft();
    
    alert('Product saved! Remember to download the updated JSON file to commit changes.');
}

// ==========================================
// Delete Product
// ==========================================
function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    
    if (!product) {
        alert('Product not found!');
        return;
    }

    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        products = products.filter(p => p.id !== id);
        renderProductsTable();
        saveDraft();
        alert('Product deleted! Remember to download the updated JSON file to commit changes.');
    }
}

// ==========================================
// Draft Management
// ==========================================
function saveDraft() {
    localStorage.setItem('productsDraft', JSON.stringify(products));
    alert('Draft saved to browser! Your changes are preserved locally.');
}

function resetToServer() {
    if (confirm('This will discard all local changes and reload from the server. Are you sure?')) {
        localStorage.removeItem('productsDraft');
        loadProducts();
        alert('Reset to server version complete!');
    }
}

// ==========================================
// JSON Export
// ==========================================
function downloadJSON() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'products.json';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('products.json downloaded! Upload this file to your repository to publish changes.');
}

// ==========================================
// Utility Functions
// ==========================================
function generateId() {
    return 'product-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Allow Enter key on login
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('loginScreen').style.display !== 'none') {
        login();
    }
});
