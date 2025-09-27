// script.js - JavaScript untuk Tedy Fruit Store
// DOM Manipulation dan Event Listeners

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍎 Tedy Fruit Store - JavaScript Loaded');
    
    try {
        // Initialize all features
        initializeDarkMode();
        initializeProductInteractions();
        initializeSmoothScrolling();
        initializeContactForm();
        initializeCartSystem();
        initializeSearchFeature();
        initializeWeatherDisplay();
        
        console.log('✅ All features initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing features:', error);
    }
});

// =============================
// DARK MODE FUNCTIONALITY
// =============================

function initializeDarkMode() {
    try {
        createDarkModeToggle();
        loadDarkModePreference();
    } catch (error) {
        console.error('Error initializing dark mode:', error);
    }
}

function createDarkModeToggle() {
    const header = document.querySelector('.header-inner');
    if (!header) {
        console.warn('Header not found for dark mode toggle');
        return;
    }
    
    // Cek apakah header controls sudah ada
    let headerControls = header.querySelector('.header-controls');
    if (!headerControls) {
        headerControls = document.createElement('div');
        headerControls.className = 'header-controls';
        header.appendChild(headerControls);
    }
    
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'dark-mode-toggle';
    toggleContainer.innerHTML = `
        <button id="darkModeBtn" class="btn btn--ghost" aria-label="Toggle Dark Mode">
            <span id="darkModeIcon">🌙</span>
            <span>Mode Gelap</span>
        </button>
    `;
    
    headerControls.appendChild(toggleContainer);
    
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    try {
        const body = document.body;
        const html = document.documentElement;
        const darkModeIcon = document.getElementById('darkModeIcon');
        const darkModeBtn = document.getElementById('darkModeBtn');
        
        // Toggle pada HTML dan BODY
        body.classList.toggle('dark-mode');
        html.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            if (darkModeIcon) darkModeIcon.textContent = '☀️';
            if (darkModeBtn) darkModeBtn.innerHTML = '<span id="darkModeIcon">☀️</span><span>Mode Terang</span>';
            localStorage.setItem('darkMode', 'enabled');
            showNotification('Mode gelap diaktifkan!');
        } else {
            if (darkModeIcon) darkModeIcon.textContent = '🌙';
            if (darkModeBtn) darkModeBtn.innerHTML = '<span id="darkModeIcon">🌙</span><span>Mode Gelap</span>';
            localStorage.setItem('darkMode', 'disabled');
            showNotification('Mode terang diaktifkan!');
        }
    } catch (error) {
        console.error('Error toggling dark mode:', error);
    }
}

function loadDarkModePreference() {
    try {
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            document.body.classList.add('dark-mode');
            document.documentElement.classList.add('dark-mode');
            
            // Update button setelah DOM ready
            setTimeout(() => {
                const darkModeIcon = document.getElementById('darkModeIcon');
                const darkModeBtn = document.getElementById('darkModeBtn');
                if (darkModeIcon && darkModeBtn) {
                    darkModeIcon.textContent = '☀️';
                    darkModeBtn.innerHTML = '<span id="darkModeIcon">☀️</span><span>Mode Terang</span>';
                }
            }, 100);
        }
    } catch (error) {
        console.error('Error loading dark mode preference:', error);
    }
}

// =============================
// PRODUCT INTERACTIONS
// =============================

function initializeProductInteractions() {
    try {
        const products = document.querySelectorAll('.product');
        
        products.forEach(product => {
            const buyBtn = product.querySelector('.btn:not(.btn--ghost)');
            const detailBtn = product.querySelector('.btn--ghost');
            const productName = product.querySelector('h3')?.textContent || 'Produk';
            const productPrice = product.querySelector('.price')?.textContent || 'Harga tidak tersedia';
            
            if (buyBtn) {
                buyBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    addToCart(productName, productPrice);
                    animateButton(this);
                });
            }
            
            if (detailBtn) {
                detailBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showProductDetail(productName, productPrice, product);
                    animateButton(this);
                });
            }
        });
    } catch (error) {
        console.error('Error initializing product interactions:', error);
    }
}

function addToCart(name, price) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
            showNotification(`${name} ditambahkan lagi ke keranjang! (${existingItem.quantity}x)`);
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
            showNotification(`${name} ditambahkan ke keranjang!`);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Error menambahkan ke keranjang', 'error');
    }
}

function showProductDetail(name, price, productElement) {
    try {
        const modal = createModal();
        const img = productElement.querySelector('.product-img');
        
        // Deskripsi produk berdasarkan nama
        const descriptions = {
            'Apel Hijau': 'Apel hijau segar dengan rasa manis dan sedikit asam. Kaya vitamin C dan serat yang baik untuk pencernaan.',
            'Apel Merah': 'Apel merah manis dengan tekstur renyah. Mengandung antioksidan tinggi dan baik untuk kesehatan jantung.',
            'Jeruk': 'Jeruk segar kaya vitamin C, membantu meningkatkan daya tahan tubuh dan menjaga kesehatan kulit.',
            'Nanas': 'Nanas matang dengan rasa manis dan segar. Mengandung enzim bromelain yang baik untuk pencernaan.',
            'Pepaya': 'Pepaya matang dengan daging buah lembut dan manis. Kaya vitamin A dan enzim papain.',
            'Pisang': 'Pisang matang dengan kandungan kalium tinggi, baik untuk kesehatan otot dan jantung.',
            'Rambutan': 'Rambutan segar dengan daging buah putih dan manis. Kaya vitamin C dan antioksidan.',
            'Salak': 'Salak segar dengan rasa manis dan tekstur renyah. Mengandung serat dan mineral penting.',
            'Semangka': 'Semangka segar dengan kadar air tinggi, cocok untuk hidrasi dan kaya likopen.',
            'Stroberi': 'Stroberi segar dengan rasa manis asam. Kaya vitamin C dan antioksidan untuk kesehatan kulit.'
        };
        
        const description = descriptions[name] || `Buah ${name.toLowerCase()} segar berkualitas tinggi, dipetik langsung dari kebun pilihan.`;
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${name}</h3>
                    <button class="modal-close" aria-label="Tutup">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="${img?.src || ''}" alt="${name}" style="width: 100%; max-width: 300px; border-radius: 10px; margin-bottom: 15px;">
                    <p><strong>Harga:</strong> ${price}</p>
                    <p><strong>Deskripsi:</strong> ${description}</p>
                    <p><strong>Kualitas:</strong> Premium - langsung dari petani terpercaya</p>
                    <p><strong>Pengiriman:</strong> Same day delivery area Samarinda</p>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-add-cart" data-name="${escapeHtml(name)}" data-price="${escapeHtml(price)}">
                        Tambah ke Keranjang
                    </button>
                    <button class="btn btn--ghost modal-close-btn">
                        Tutup
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const closeBtnFooter = modal.querySelector('.modal-close-btn');
        const addCartBtn = modal.querySelector('.modal-add-cart');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => modal.remove());
        }
        
        if (closeBtnFooter) {
            closeBtnFooter.addEventListener('click', () => modal.remove());
        }
        
        if (addCartBtn) {
            addCartBtn.addEventListener('click', function() {
                const productName = this.getAttribute('data-name');
                const productPrice = this.getAttribute('data-price');
                addToCart(productName, productPrice);
                modal.remove();
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.remove();
        });
        
        // ESC key to close modal
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
    } catch (error) {
        console.error('Error showing product detail:', error);
        showNotification('Error menampilkan detail produk', 'error');
    }
}

function animateButton(button) {
    try {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    } catch (error) {
        console.error('Error animating button:', error);
    }
}

// =============================
// CART SYSTEM
// =============================

function initializeCartSystem() {
    try {
        createCartDisplay();
        updateCartDisplay();
    } catch (error) {
        console.error('Error initializing cart system:', error);
    }
}

function createCartDisplay() {
    try {
        const header = document.querySelector('.header-inner');
        if (!header) {
            console.warn('Header not found for cart display');
            return;
        }
        
        // Cek apakah header controls sudah ada
        let headerControls = header.querySelector('.header-controls');
        if (!headerControls) {
            headerControls = document.createElement('div');
            headerControls.className = 'header-controls';
            header.appendChild(headerControls);
        }
        
        const cartContainer = document.createElement('div');
        cartContainer.className = 'cart-display';
        cartContainer.innerHTML = `
            <button id="cartBtn" class="btn btn--ghost" aria-label="Lihat Keranjang">
                <span>🛒 Keranjang (<span id="cartCount">0</span>)</span>
            </button>
        `;
        
        // Insert cart sebelum dark mode toggle (jadi cart di kiri, darkmode di kanan)
        headerControls.insertBefore(cartContainer, headerControls.firstChild);
        
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', showCart);
        }
    } catch (error) {
        console.error('Error creating cart display:', error);
    }
}

function updateCartDisplay() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    } catch (error) {
        console.error('Error updating cart display:', error);
    }
}

function showCart() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const modal = createModal();
        
        let cartHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Keranjang Belanja</h3>
                    <button class="modal-close" aria-label="Tutup">&times;</button>
                </div>
                <div class="modal-body">
        `;
        
        if (cart.length === 0) {
            cartHTML += '<p style="text-align: center; color: #999; padding: 20px;">Keranjang masih kosong<br>Yuk belanja buah segar!</p>';
        } else {
            cartHTML += '<div class="cart-items">';
            cart.forEach((item, index) => {
                cartHTML += `
                    <div class="cart-item">
                        <div>
                            <strong>${escapeHtml(item.name)}</strong><br>
                            <small>${escapeHtml(item.price)} x ${item.quantity}</small>
                        </div>
                        <button class="btn btn--ghost cart-remove-btn" data-index="${index}" title="Hapus dari keranjang">
                            Hapus
                        </button>
                    </div>
                `;
            });
            cartHTML += '</div>';
            
            // Total items
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartHTML += `<div style="text-align: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                <strong>Total: ${totalItems} item${totalItems > 1 ? 's' : ''}</strong>
            </div>`;
        }
        
        cartHTML += `
                </div>
                <div class="modal-footer">
                    <button class="btn btn--ghost cart-clear-btn">
                        Kosongkan
                    </button>
                    <button class="btn cart-checkout-btn">
                        Checkout
                    </button>
                </div>
            </div>
        `;
        
        modal.innerHTML = cartHTML;
        document.body.appendChild(modal);
        
        // Event listeners
        const closeBtn = modal.querySelector('.modal-close');
        const clearBtn = modal.querySelector('.cart-clear-btn');
        const checkoutBtn = modal.querySelector('.cart-checkout-btn');
        const removeButtons = modal.querySelectorAll('.cart-remove-btn');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => modal.remove());
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                clearCart();
                modal.remove();
            });
        }
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', checkout);
        }
        
        removeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.remove();
        });
        
    } catch (error) {
        console.error('Error showing cart:', error);
        showNotification('Error menampilkan keranjang', 'error');
    }
}

function removeFromCart(index) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const removedItem = cart[index];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        
        if (removedItem) {
            showNotification(`${removedItem.name} dihapus dari keranjang`);
        }
        
        // Refresh cart modal
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
            showCart();
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        showNotification('Error menghapus dari keranjang', 'error');
    }
}

function clearCart() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            showNotification('Keranjang sudah kosong!');
            return;
        }
        
        localStorage.removeItem('cart');
        updateCartDisplay();
        showNotification('Keranjang dikosongkan!');
    } catch (error) {
        console.error('Error clearing cart:', error);
        showNotification('Error mengosongkan keranjang', 'error');
    }
}

function checkout() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            showNotification('Keranjang kosong! Tambahkan produk terlebih dahulu.', 'error');
            return;
        }
        
        // Simulasi checkout
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const modal = document.querySelector('.modal');
        if (modal) modal.remove();
        
        showNotification(`Checkout ${totalItems} item berhasil! Terima kasih telah berbelanja.`);
        
        // WhatsApp integration - redirect to WhatsApp with order details
        let message = 'Halo! Saya ingin memesan:\n\n';
        cart.forEach(item => {
            message += `• ${item.name} - ${item.price} x ${item.quantity}\n`;
        });
        message += '\nMohon konfirmasi ketersediaan dan total harga. Terima kasih!';
        
        const whatsappUrl = `https://wa.me/6282215854701?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Clear cart after checkout
        setTimeout(() => {
            localStorage.removeItem('cart');
            updateCartDisplay();
        }, 1000);
        
    } catch (error) {
        console.error('Error during checkout:', error);
        showNotification('Error saat checkout', 'error');
    }
}

// =============================
// SMOOTH SCROLLING
// =============================

function initializeSmoothScrolling() {
    try {
        const navLinks = document.querySelectorAll('.nav-list a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle internal links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Add highlight effect
                        targetElement.style.background = 'rgba(47,133,90,0.05)';
                        setTimeout(() => {
                            targetElement.style.background = '';
                        }, 2000);
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
}

// =============================
// CONTACT FORM
// =============================

function initializeContactForm() {
    try {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) {
            console.warn('Contact form not found');
            return;
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const message = formData.get('message')?.trim();
            
            // Validasi
            if (!name || !email) {
                showNotification('Nama dan email harus diisi!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Format email tidak valid!', 'error');
                return;
            }
            
            // Simulasi pengiriman
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification(`Terima kasih ${name}! Pesan Anda telah dikirim. Kami akan segera merespon.`);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // WhatsApp integration untuk contact form
                const whatsappMessage = `Halo! Pesan dari website:\n\nNama: ${name}\nEmail: ${email}\nPesan: ${message || 'Tidak ada pesan tambahan'}`;
                const whatsappUrl = `https://wa.me/6282215854701?text=${encodeURIComponent(whatsappMessage)}`;
                
                setTimeout(() => {
                    if (confirm('Ingin mengirim pesan via WhatsApp juga?')) {
                        window.open(whatsappUrl, '_blank');
                    }
                }, 1000);
                
            }, 1500);
        });
        
        // Reset button
        const resetBtn = contactForm.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                setTimeout(() => {
                    showNotification('Form direset');
                }, 100);
            });
        }
    } catch (error) {
        console.error('Error initializing contact form:', error);
    }
}

function isValidEmail(email) {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    } catch (error) {
        console.error('Error validating email:', error);
        return false;
    }
}

// =============================
// SEARCH FUNCTIONALITY
// =============================

function initializeSearchFeature() {
    try {
        const productsSection = document.getElementById('produk');
        if (!productsSection) {
            console.warn('Products section not found');
            return;
        }
        
        const sectionHead = productsSection.querySelector('.section-head');
        if (!sectionHead) {
            console.warn('Section head not found');
            return;
        }
        
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="searchInput" placeholder="Cari buah favorit Anda..." class="search-input">
            <button id="searchBtn" class="btn">Cari</button>
        `;
        
        sectionHead.appendChild(searchContainer);
        
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput && searchBtn) {
            // Real-time search saat mengetik
            searchInput.addEventListener('input', performSearch);
            
            // Search saat klik tombol
            searchBtn.addEventListener('click', performSearch);
            
            // Search saat tekan Enter
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    } catch (error) {
        console.error('Error initializing search feature:', error);
    }
}

function performSearch() {
    try {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.toLowerCase().trim();
        const products = document.querySelectorAll('.product');
        let visibleCount = 0;
        
        products.forEach(product => {
            const productName = product.querySelector('h3')?.textContent.toLowerCase() || '';
            
            if (productName.includes(searchTerm) || searchTerm === '') {
                product.style.display = 'flex';
                visibleCount++;
                
                // Highlight matching text
                if (searchTerm !== '') {
                    product.style.background = 'rgba(47,133,90,0.05)';
                    setTimeout(() => {
                        product.style.background = '';
                    }, 2000);
                }
            } else {
                product.style.display = 'none';
            }
        });
        
        // Show search result notification
        if (searchTerm !== '') {
            if (visibleCount === 0) {
                showNotification(`Tidak ada buah yang ditemukan untuk "${searchTerm}"`, 'error');
            } else {
                showNotification(`Ditemukan ${visibleCount} buah untuk "${searchTerm}"`);
            }
        }
    } catch (error) {
        console.error('Error performing search:', error);
    }
}

// =============================
// WEATHER API (Optional)
// =============================

function initializeWeatherDisplay() {
    try {
        const header = document.querySelector('.header-inner');
        if (!header) {
            console.warn('Header not found for weather display');
            return;
        }
        
        const weatherContainer = document.createElement('div');
        weatherContainer.className = 'weather-display';
        weatherContainer.innerHTML = '<div id="weatherInfo">Samarinda</div>';
        
        header.appendChild(weatherContainer);
        
        // Try to fetch weather (akan fallback jika API tidak tersedia)
        fetchWeather();
    } catch (error) {
        console.error('Error initializing weather display:', error);
    }
}

async function fetchWeather() {
    try {
        // Menggunakan wttr.in API yang gratis dan tidak perlu API key
        const response = await fetch('https://wttr.in/Samarinda?format=%C+%t', {
            method: 'GET',
            headers: {
                'User-Agent': 'curl/7.0'
            }
        });
        
        if (response.ok) {
            const weatherData = await response.text();
            displayWeather(weatherData);
        } else {
            throw new Error('Weather API not available');
        }
    } catch (error) {
        console.log('Weather API not available, using fallback');
        // Fallback display
        const weatherInfo = document.getElementById('weatherInfo');
        if (weatherInfo) {
            weatherInfo.innerHTML = 'Samarinda - Cuaca Cerah';
        }
    }
}

function displayWeather(weatherData) {
    try {
        const weatherInfo = document.getElementById('weatherInfo');
        if (weatherInfo && weatherData) {
            weatherInfo.innerHTML = `Samarinda - ${weatherData.trim()}`;
        }
    } catch (error) {
        console.error('Error displaying weather:', error);
    }
}

// =============================
// UTILITY FUNCTIONS
// =============================

function createModal() {
    try {
        const modal = document.createElement('div');
        modal.className = 'modal';
        return modal;
    } catch (error) {
        console.error('Error creating modal:', error);
        return null;
    }
}

function showNotification(message, type = 'success') {
    try {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.animation = 'slideIn 0.3s ease';
        
        document.body.appendChild(notification);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        });
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// =============================
// ADDITIONAL FEATURES
// =============================

// Auto-save cart on page unload
window.addEventListener('beforeunload', function() {
    try {
        console.log('Saving cart data...');
    } catch (error) {
        console.error('Error saving cart data:', error);
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    try {
        showNotification('Koneksi internet tersambung!');
    } catch (error) {
        console.error('Error handling online status:', error);
    }
});

window.addEventListener('offline', function() {
    try {
        showNotification('Koneksi internet terputus!', 'error');
    } catch (error) {
        console.error('Error handling offline status:', error);
    }
});

// Product image error handling
document.addEventListener('error', function(e) {
    try {
        if (e.target.tagName === 'IMG' && e.target.classList.contains('product-img')) {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE4MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik05MCA4MEM5Ny43MzIgODAgMTA0IDczLjczMiAxMDQgNjZDMTA0IDU4LjI2OCA5Ny43MzIgNTIgOTAgNTJDODIuMjY4IDUyIDc2IDU4LjI2OCA3NiA2NkM3NiA3My43MzIgODIuMjY4IDgwIDkwIDgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTIwIDEwOEg2MEw3NS42IDg2LjRMOTAgOTZMMTA0LjQgODAuNEwxMjAgMTA4WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
            e.target.alt = 'Gambar tidak dapat dimuat';
        }
    } catch (error) {
        console.error('Error handling image error:', error);
    }
}, true);

// Initialize smooth animations for better UX
function initializeAnimations() {
    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
}

// Initialize animations when DOM is ready
setTimeout(() => {
    try {
        initializeAnimations();
    } catch (error) {
        console.error('Error in delayed animation initialization:', error);
    }
}, 500);

