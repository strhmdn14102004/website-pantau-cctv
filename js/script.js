document.addEventListener('DOMContentLoaded', function() {
    // Initialize Intersection Observer for scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize video play/pause on visibility
    initVideoObserver();
    
    // Initialize mobile menu toggle (if needed)
    initMobileMenu();
    
    // Create floating bubbles
    createBubbles();
    
    // Track download button clicks
    trackDownloadButtonClicks();
});

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animations
    const animatedElements = document.querySelectorAll(
        '.section-header, .feature-card, .city-card, .demo-header, ' +
        '.demo-video-container, .demo-stat, .cta-title, ' +
        '.cta-subtitle, .cta-buttons'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

function initVideoObserver() {
    const demoVideo = document.querySelector('.demo-video');
    if (demoVideo) {
        const videoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    demoVideo.play().catch(e => console.log('Autoplay prevented:', e));
                } else {
                    demoVideo.pause();
                }
            });
        }, {threshold: 0.5});
        
        videoObserver.observe(demoVideo);
    }
}

function initMobileMenu() {
    // This can be expanded for mobile menu functionality
    console.log('Mobile menu initialization would go here');
}

function createBubbles() {
    const bubblesContainer = document.getElementById('bubbles-container');
    if (!bubblesContainer) return;
    
    const bubbleCount = 15;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random size between 10px and 50px
        const size = Math.random() * 40 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random position
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.bottom = `-${size}px`;
        
        // Random animation duration between 10s and 20s
        const duration = Math.random() * 10 + 10;
        bubble.style.animationDuration = `${duration}s`;
        
        // Random delay
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        bubblesContainer.appendChild(bubble);
    }
}

function trackDownloadButtonClicks() {
    const downloadButtons = document.querySelectorAll('.hero-button-primary, .hero-button-secondary');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('hero-button-primary') ? 'ios' : 'android';
            
            // In a real app, you would track this event
            console.log(`Download initiated for ${platform}`);
            
            // Simulate redirect to app store
            setTimeout(() => {
                window.location.href = platform === 'ios' 
                    ? 'https://apps.apple.com/' 
                    : 'https://play.google.com/store/apps/';
            }, 500);
        });
    });
}