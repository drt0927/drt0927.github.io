// ============================================
// INTERACTIVE CARD GLOW EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const glow = card.querySelector('.card-glow');
        
        // Mouse move effect for card glow
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(102, 126, 234, 0.2) 0%, transparent 50%)`;
        });
        
        // Reset glow on mouse leave
        card.addEventListener('mouseleave', () => {
            glow.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)';
        });
    });
});

// ============================================
// SMOOTH SCROLL FOR BETTER UX
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ============================================
// CARD TILT EFFECT (3D)
// ============================================
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// LAZY LOADING OBSERVER (FOR FUTURE IMAGES)
// ============================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for scroll animations
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// ============================================
// CONSOLE MESSAGE (EASTER EGG)
// ============================================
console.log('%c🚀 Welcome to DRT0927\'s Portfolio! ', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub! 🎯', 'color: #a5b4fc; font-size: 14px;');
