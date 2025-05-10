// CommCart Main JavaScript File

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }
    
    // Close navbar when clicking outside
    document.addEventListener('click', function(e) {
        if (navbar && navbar.classList.contains('active') && 
            !navbar.contains(e.target) && 
            e.target !== mobileToggle && 
            !mobileToggle.contains(e.target)) {
            navbar.classList.remove('active');
        }
    });
    
    // Video thumbnails play effect
    const videoItems = document.querySelectorAll('.video-container');
    if (videoItems.length > 0) {
        videoItems.forEach(item => {
            item.addEventListener('click', function() {
                // In a real implementation, this would play the video
                // For now, we'll just add a visual effect
                const overlay = this.querySelector('.video-overlay');
                if (overlay) {
                    overlay.innerHTML = '<div class="loader"></div>';
                    
                    // Simulate video loading
                    setTimeout(() => {
                        // In a real implementation, we would embed and play the video here
                        alert('Video player would open here. This is a placeholder for the functionality.');
                        overlay.innerHTML = '<i class="fas fa-play-circle"></i>';
                    }, 1000);
                }
            });
        });
    }
    
    // Search functionality
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            
            if (query) {
                // In a real implementation, this would perform a search
                // For now, just show an alert
                alert(`Searching for: ${query}`);
                
                // This would redirect to search results page
                // window.location.href = `shop.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Group countdown timer
    updateGroupTimers();
    // Update timers every minute
    setInterval(updateGroupTimers, 60000);
    
    // Initialize dynamic group discount calculation
    setupGroupDiscounts();
    
    // Product image zoom on hover effect
    setupImageZoom();
    
    // Newsletter subscription validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput) {
                const email = emailInput.value.trim();
                
                if (validateEmail(email)) {
                    // Success - would send to server in real implementation
                    alert('Thank you for subscribing!');
                    emailInput.value = '';
                } else {
                    // Error
                    alert('Please enter a valid email address');
                    emailInput.focus();
                }
            }
        });
    }
    
    // Follow brand buttons
    const followButtons = document.querySelectorAll('.brand-card .btn-outline');
    if (followButtons.length > 0) {
        followButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.textContent === 'Follow') {
                    this.textContent = 'Following';
                    this.classList.add('following');
                } else {
                    this.textContent = 'Follow';
                    this.classList.remove('following');
                }
            });
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initialize sliders if they exist
    initializeSliders();
    
    // Add to cart functionality
    setupAddToCartButtons();
});

// Update countdown timers for group buys
function updateGroupTimers() {
    const expiryElements = document.querySelectorAll('.expiry');
    
    expiryElements.forEach(element => {
        // In a real app, this would calculate from actual expiry timestamps
        // For demo, we'll just randomly reduce the time
        const currentText = element.textContent;
        
        if (currentText.includes('Expires in:')) {
            const parts = currentText.split(':')[1].trim().split(' ');
            let days = parseInt(parts[0]);
            let hours = parseInt(parts[2]);
            
            // Randomly decrease time (for demo purposes)
            if (Math.random() > 0.5 && hours > 0) {
                hours--;
            } else if (days > 0 && hours === 0) {
                days--;
                hours = 23;
            }
            
            // Update the display
            if (days === 0 && hours === 0) {
                element.textContent = 'Expired';
                element.classList.add('expired');
            } else {
                element.textContent = `Expires in: ${days} days ${hours} hours`;
            }
        }
    });
}

// Setup dynamic group discounts
function setupGroupDiscounts() {
    const groupCards = document.querySelectorAll('.group-card');
    
    groupCards.forEach(card => {
        const progressElement = card.querySelector('.progress');
        const progressTextElement = card.querySelector('.progress-text');
        const discountTagElement = card.querySelector('.discount-tag');
        
        if (progressElement && progressTextElement && discountTagElement) {
            // In a real app, this would be dynamic based on actual group progress
            // For demo, we'll just update on page load
            const currentText = progressTextElement.textContent;
            const parts = currentText.split('/');
            
            if (parts.length === 2) {
                const current = parseInt(parts[0]);
                const target = parseInt(parts[1]);
                const percentage = (current / target) * 100;
                
                // Update progress bar
                progressElement.style.width = `${percentage}%`;
                
                // Update discount display color based on progress
                if (percentage >= 75) {
                    discountTagElement.classList.add('almost-complete');
                }
            }
        }
    });
}

// Product image zoom effect on hover
function setupImageZoom() {
    const productImages = document.querySelectorAll('.group-image img, .product-image img');
    
    productImages.forEach(img => {
        img.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            // Apply subtle zoom effect
            this.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            this.style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Initialize image sliders
function initializeSliders() {
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const dots = slider.querySelectorAll('.dot');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        
        // Show first slide
        showSlide(currentSlide);
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }
        
        // Dot navigation
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    showSlide(currentSlide);
                });
            });
        }
        
        // Auto advance slides
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
        }
    });
}

// Join group functionality
function joinGroup(groupId) {
    // In a real app, this would make an API call to join the group
    alert(`Joined group ${groupId}! This is a placeholder for the actual functionality.`);
    
    // Update UI to show the user has joined
    const joinButton = document.querySelector(`[data-group-id="${groupId}"] .btn-primary`);
    if (joinButton) {
        joinButton.textContent = 'Joined';
        joinButton.disabled = true;
    }
}

// Setup add to cart buttons
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const productId = this.getAttribute('data-product-id');
                const productName = this.getAttribute('data-product-name');
                
                // Simple cart functionality
                addToCart(productId, productName);
                
                // Update cart counter
                updateCartCounter();
                
                // Visual feedback
                showAddedToCartFeedback(this);
            });
        });
    }
}

// Add to cart function
function addToCart(productId, productName) {
    // Get existing cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('commCartItems')) || [];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Add new item
        cart.push({
            id: productId,
            name: productName,
            quantity: 1
        });
    }
    
    // Save cart back to localStorage
    localStorage.setItem('commCartItems', JSON.stringify(cart));
    
    // Alert for demo purposes
    alert(`Added ${productName} to cart!`);
}

// Update cart counter
function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-count');
    if (cartCounter) {
        const cart = JSON.parse(localStorage.getItem('commCartItems')) || [];
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCounter.textContent = itemCount;
    }
}

// Show added to cart feedback
function showAddedToCartFeedback(button) {
    // Save original text
    const originalText = button.textContent;
    
    // Change button text
    button.textContent = 'Added! ✓';
    button.classList.add('added');
    
    // Restore original text after delay
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('added');
    }, 2000);
}

// Initialize cart counter on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
});