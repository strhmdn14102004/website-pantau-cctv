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
                    : 'https://objects.githubusercontent.com/github-production-release-asset-2e65be/999925718/2869fc05-1724-4504-a4cb-8397b647794f?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20250626%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250626T084528Z&X-Amz-Expires=1800&X-Amz-Signature=1c1bf02a02980b0cc149c59450ab1c86a66e8bb08dbd42827e487d2eea6a48a5&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3DPantau.cctv.apk&response-content-type=application%2Fvnd.android.package-archive';
            }, 500);
        });
    });
}