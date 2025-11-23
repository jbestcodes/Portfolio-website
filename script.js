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