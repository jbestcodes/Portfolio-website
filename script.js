// ========== WAIT FOR DOM TO LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded!'); // Debug line
    
    // ========== MOBILE MENU TOGGLE ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // ========== TYPING ANIMATION ==========
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const originalText = 'Full Stack Developer';
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                typingText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Add blinking cursor effect
                setInterval(() => {
                    typingText.style.borderRight = 
                        typingText.style.borderRight === '3px solid #ff6b6b' 
                        ? '3px solid transparent' 
                        : '3px solid #ff6b6b';
                }, 500);
            }
        }
        
        // Start typing after 1 second
        setTimeout(typeWriter, 1000);
    }

    // ========== ANIMATED ELEMENTS ON SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                console.log('Element animated:', entry.target.className); // Debug line
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ========== SKILL BADGES HOVER EFFECTS ==========
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateY(-15px) rotateY(10deg) scale(1.05)';
            badge.style.boxShadow = '0 25px 50px rgba(255, 107, 107, 0.3)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'translateY(0) rotateY(0) scale(1)';
            badge.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // ========== FLOATING PARTICLES ==========
    createFloatingParticles();

    // ========== BUTTON HOVER EFFECTS ==========
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========== PROFILE PICTURE ANIMATION ==========
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        profilePic.addEventListener('mouseenter', () => {
            profilePic.style.transform = 'scale(1.1) rotate(5deg)';
            profilePic.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        profilePic.addEventListener('mouseleave', () => {
            profilePic.style.transform = 'scale(1) rotate(0deg)';
            profilePic.style.filter = 'brightness(1) contrast(1)';
        });
    }

    // ========== AUTO-ANIMATE ELEMENTS ON PAGE LOAD ==========
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.slide-left, .slide-right');
        heroElements.forEach(el => {
            el.classList.add('animate-in');
        });
    }, 500);
});

// ========== FLOATING PARTICLES FUNCTION ==========
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);

    // Create 30 particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and timing
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random colors
        const colors = ['rgba(255, 107, 107, 0.8)', 'rgba(78, 205, 196, 0.8)', 'rgba(69, 183, 209, 0.8)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random sizes
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particleContainer.appendChild(particle);
    }
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== WINDOW SCROLL EFFECTS ==========
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
    
    // Add blur effect to navbar when scrolling
    if (scrollTop > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// ========== MOBILE-SPECIFIC ENHANCEMENTS ==========

// Detect mobile device
const isMobile = window.innerWidth <= 768;

// Enhanced mobile animations
if (isMobile) {
    // Faster animation timings for mobile
    document.documentElement.style.setProperty('--animation-speed', '0.3s');
    
    // Touch-friendly interactions
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Mobile-specific particle count (fewer for performance)
    function createMobileParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 15; i++) { // Fewer particles on mobile
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's'; // Faster
            
            const colors = ['rgba(255, 107, 107, 0.6)', 'rgba(78, 205, 196, 0.6)', 'rgba(69, 183, 209, 0.6)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            particleContainer.appendChild(particle);
        }
    }
    
    // Replace desktop particles with mobile-optimized ones
    createMobileParticles();
}

// Mobile scroll performance
let ticking = false;
function updateOnScroll() {
    // Your scroll animations here
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}, {passive: true});

// ========== ENHANCED FORMSPREE FORM HANDLING ==========
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form-element');
    const submitButton = document.getElementById('submit-button');
    const formStatus = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Show loading state
            const originalButtonContent = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Show status message
            formStatus.style.display = 'block';
            formStatus.style.background = 'linear-gradient(45deg, #4ecdc4, #45b7d1)';
            formStatus.style.color = 'white';
            formStatus.innerHTML = '<i class="fas fa-paper-plane"></i> Sending your message...';
            
            // Prepare form data
            const formData = new FormData(form);
            
            // Submit to Formspree
            fetch('https://formspree.io/f/myzdwzgz', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                console.log('Formspree response status:', response.status);
                if (response.ok) {
                    // Success
                    formStatus.style.background = 'linear-gradient(45deg, #2ed573, #7bed9f)';
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> ✅ Message sent successfully! I\'ll get back to you within 24 hours.';
                    form.reset();
                    
                    // Auto-hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Form submission failed');
                    });
                }
            })
            .catch(error => {
                console.error('Formspree error:', error);
                // Error
                formStatus.style.background = 'linear-gradient(45deg, #ff4757, #ff6b6b)';
                formStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ❌ Error: ' + error.message + '. Please try again or contact me directly.';
            })
            .finally(() => {
                // Reset button
                submitButton.innerHTML = originalButtonContent;
                submitButton.disabled = false;
            });
        });
    }
});

// Paystack Payment Integration
function initializePayment(amount, email, service) {
    let handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY, // From config.js
        email: email,
        amount: amount * 100, // Convert to kobo
        currency: 'KES',
        ref: 'JA_'+Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            service_name: service,
        },
        callback: function(response) {
            // Payment successful
            window.location.href = `thankyou.html?reference=${response.reference}`;
        },
        onClose: function() {
            // User closed payment modal
            alert('Transaction cancelled');
        }
    });
    handler.openIframe();
}

// Handle service booking
function bookService(service, amount) {
    const email = document.getElementById('email').value || prompt("Please enter your email to continue:");
    if (email) {
        initializePayment(amount, email, service);
    }
}