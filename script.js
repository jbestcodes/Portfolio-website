// ========== SUPER SIMPLE SCRIPT WITH SCROLL ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');
    
    // ========== SCROLL-TRIGGERED ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // If it's a skills section
                if (element.classList.contains('skills-preview')) {
                    console.log('Skills section visible!');
                    
                    // Trigger heading animation
                    const heading = element.querySelector('h2');
                    if (heading) {
                        heading.style.animation = 'slideInDown 0.8s ease 0.2s forwards';
                    }
                    
                    // Trigger skill badges animation
                    const skillBadges = element.querySelectorAll('.skill-badge');
                    skillBadges.forEach((badge, index) => {
                        const delay = 0.3 + (index * 0.1);
                        badge.style.animation = `skillSlideUp 0.8s ease ${delay}s forwards`;
                    });
                    
                    // Trigger AI skills animation
                    const aiSkills = element.querySelectorAll('.ai-skill-item');
                    aiSkills.forEach((item, index) => {
                        const delay = 0.2 + (index * 0.2);
                        item.style.animation = `slideInLeft 0.8s ease ${delay}s forwards`;
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all skills sections
    const skillsSections = document.querySelectorAll('.skills-preview');
    skillsSections.forEach(section => {
        skillsObserver.observe(section);
    });

    // ========== TYPING ANIMATION ==========
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const originalText = 'Full Stack Developer & Creative Problem Solver';
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                typingText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 1000);
    }

    // ========== ENHANCED HOVER EFFECTS ==========
    setTimeout(() => {
        const skillBadges = document.querySelectorAll('.skill-badge');
        skillBadges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'translateY(-15px) scale(1.08) rotate(2deg)';
                badge.style.boxShadow = '0 25px 50px rgba(255, 107, 107, 0.4)';
            });
            
            badge.addEventListener('mouseleave', () => {
                badge.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                badge.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            });
        });
    }, 2000); // Wait for animations to complete

    // ========== FLOATING PARTICLES ==========
    createFloatingParticles();

    // ========== ACTIVE NAVIGATION HIGHLIGHTING ==========
    // Get current page name
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Add active class to current page link
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Handle index.html and root path
    if (currentPage === '' || currentPage === 'index.html') {
        const homeLink = document.querySelector('a[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});

// ========== FLOATING PARTICLES FUNCTION ==========
function createFloatingParticles() {
    const existingParticles = document.querySelector('.particles');
    if (existingParticles) {
        existingParticles.remove();
    }

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);

    const particleCount = window.innerWidth <= 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        const colors = ['rgba(255, 107, 107, 0.8)', 'rgba(78, 205, 196, 0.8)', 'rgba(69, 183, 209, 0.8)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particleContainer.appendChild(particle);
    }
}

// ========== DARK MODE TOGGLE ========== //

(function() {
    // Set theme immediately to prevent flash
    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.body.setAttribute('data-theme', savedTheme);

    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        updateToggleIcon(savedTheme);

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcon(newTheme);
        });

        function updateToggleIcon(theme) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            }
        }
    });
})();

// ========== BACK TO HOME FUNCTION ========== //
function goBackHome() {
    // Track back to home click
    if (typeof gtag !== 'undefined') {
        gtag('event', 'back_to_home', {
            'event_category': 'Navigation',
            'event_label': 'Back to Home Button'
        });
    }
    
    // Navigate to home page
    window.location.href = '/';
}

// ========== EXTERNAL LINK TRACKING ========== //
document.addEventListener('DOMContentLoaded', function() {
    // Mark session when user visits from external projects
    const externalButtons = document.querySelectorAll('a[href*="Jaza Nyumba"], a[href*="topjobkenya"], a[href*="jbestpay"], a[href*="bukachihopegivers"]');
    
    externalButtons.forEach(button => {
        button.addEventListener('click', function() {
            sessionStorage.setItem('showBackHome', 'true');
        });
    });
});

// ========== READ MORE/LESS TOGGLE ========== //
function toggleReadMore(button) {
    const projectContent = button.closest('.project').querySelector('.project-content');
    const details = projectContent.querySelector('.project-details');
    const icon = button.querySelector('i');
    const text = button.childNodes[button.childNodes.length - 1];
    
    if (!details.classList.contains('show')) {
        details.style.display = 'block';
        details.classList.add('show');
        button.classList.add('expanded');
        text.textContent = ' Read Less';
    } else {
        details.classList.remove('show');
        button.classList.remove('expanded');
        text.textContent = ' Read More';
        setTimeout(() => {
            if (!details.classList.contains('show')) {
                details.style.display = 'none';
            }
        }, 400);
    }
}

// ========== PORTFOLIO NAVIGATION TRACKING ========== //
document.addEventListener('DOMContentLoaded', function() {
    // Track external project clicks
    const externalLinks = document.querySelectorAll('a[href*="chama-vault"], a[href*="topjobkenya"], a[href*="jbestpay"], a[href*="bukachihopegivers"], a[href*="hea.co.ke"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Set flag for potential return
            sessionStorage.setItem('fromPortfolio', 'true');
        });
    });
});

// ========== CARD SLIDE ANIMATIONS ========== //

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Intersection Observer for slide animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.card-slide, .slide-left, .slide-right, .slide-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    function initializeAnimations() {
        // Add animation classes to projects
        const projects = document.querySelectorAll('.project');
        projects.forEach((project, index) => {
            project.classList.add('card-slide', `stagger-${(index % 3) + 1}`);
        });
        
        // Add animation classes to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.classList.add('slide-up', `stagger-${(index % 2) + 1}`);
        });
        
        // Add animation classes to domain cards
        const domainCards = document.querySelectorAll('.domain-card');
        domainCards.forEach((card, index) => {
            card.classList.add('slide-left', `stagger-${(index % 3) + 1}`);
        });
        
        // Add animation classes to experience items
        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach((item, index) => {
            item.classList.add('slide-right', `stagger-${(index % 2) + 1}`);
        });
        
        // Add animation classes to skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            category.classList.add('card-slide', `stagger-${(index % 4) + 1}`);
        });
        
        // Add animation to hero elements
        const heroText = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image, .profile-pic');
        
        if (heroText) heroText.classList.add('slide-left');
        if (heroImage) heroImage.classList.add('slide-right');
        
        // Trigger hero animations immediately
        setTimeout(() => {
            if (heroText) heroText.classList.add('visible');
            if (heroImage) heroImage.classList.add('visible');
        }, 300);
    }
});

// ========== ENHANCED TYPING ANIMATION ========== //
function startTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 1000);
    });
}

// Start typing animation after page load
window.addEventListener('load', startTypingAnimation);

// ========== FIXED DARK MODE TOGGLE ========== //

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
    }

    function updateToggleIcon(theme) {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    // Initialize icon
    updateToggleIcon(root.getAttribute('data-theme'));

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});

// ========== FORCE CSS UPDATES ========== //

// Add this function to force CSS recomputation
function forceStyleUpdate() {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        el.style.display = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.display = '';
    });
}