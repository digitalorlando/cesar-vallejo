// Exit Intent Popup
let exitPopupShown = false;

function createExitPopup() {
    const popup = document.createElement('div');
    popup.className = 'exit-popup-overlay';
    popup.innerHTML = `
        <div class="exit-popup">
            <div class="exit-popup-content">
                <h2>¿Ya te vas?</h2>
                <p class="exit-message">
                    La poesía de César Vallejo merece un momento más de tu tiempo. 
                    Sus versos contienen la esencia del sufrimiento y la esperanza humana.
                </p>
                <p class="exit-quote">
                    "Hay golpes en la vida, tan fuertes... ¡Yo no sé!"
                </p>
                <div class="exit-buttons">
                    <button class="btn-stay">Quedarme y seguir leyendo</button>
                    <button class="btn-leave">Salir de todas formas</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    // Event listeners for buttons
    const btnStay = popup.querySelector('.btn-stay');
    const btnLeave = popup.querySelector('.btn-leave');

    btnStay.addEventListener('click', () => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    });

    btnLeave.addEventListener('click', () => {
        exitPopupShown = true;
        window.location.href = 'about:blank';
    });

    // Close on overlay click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        }
    });

    // Show popup with animation
    setTimeout(() => popup.classList.add('show'), 10);
}

// Detect mouse leaving viewport (desktop)
document.addEventListener('mouseout', (e) => {
    if (!exitPopupShown && e.clientY <= 0 && e.relatedTarget == null && e.target.nodeName.toLowerCase() !== 'select') {
        exitPopupShown = true;
        createExitPopup();
    }
});

// Detect beforeunload event (closing tab/window)
window.addEventListener('beforeunload', (e) => {
    if (!exitPopupShown) {
        e.preventDefault();
        e.returnValue = '¿Seguro que quieres dejar la poesía de César Vallejo?';
        return e.returnValue;
    }
});

// Smooth scroll behavior
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe poem cards on index page
    const poemCards = document.querySelectorAll('.poem-card');
    poemCards.forEach(card => {
        observer.observe(card);
    });

    // Observe stanzas on poem pages
    const stanzas = document.querySelectorAll('.stanza');
    stanzas.forEach((stanza, index) => {
        stanza.style.opacity = '0';
        stanza.style.transform = 'translateY(20px)';
        stanza.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(stanza);
    });

    // Parallax effect on hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add reading progress indicator on poem pages
    if (document.querySelector('.poem-page')) {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(to right, #d4a574, #8b4513);
            width: 0%;
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Poem card hover effect with shadow
    const cards = document.querySelectorAll('.poem-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
        });
    });

    // Add fade-in effect to poem context section
    const contextSection = document.querySelector('.poem-context');
    if (contextSection) {
        contextSection.style.opacity = '0';
        contextSection.style.transform = 'translateY(30px)';
        contextSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const contextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        contextObserver.observe(contextSection);
    }

    // Keyboard navigation for poem pages
    if (document.querySelector('.poem-page')) {
        document.addEventListener('keydown', (e) => {
            const prevLink = document.querySelector('.nav-prev');
            const nextLink = document.querySelector('.nav-next');
            
            if (e.key === 'ArrowLeft' && prevLink) {
                window.location.href = prevLink.href;
            } else if (e.key === 'ArrowRight' && nextLink) {
                window.location.href = nextLink.href;
            }
        });
    }

    // Add subtle animation to read links
    const readLinks = document.querySelectorAll('.read-link');
    readLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.animation = 'pulse 0.5s ease';
            }
        });
    });

    // Scroll reveal for intro text
    const introText = document.querySelector('.intro-text');
    if (introText) {
        const introObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        introObserver.observe(introText);
    }
});

// Add custom cursor effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.poem-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            const xPercent = (x / rect.width - 0.5) * 10;
            const yPercent = (y / rect.height - 0.5) * 10;
            card.style.transform = `translateY(-8px) rotateX(${yPercent}deg) rotateY(${xPercent}deg)`;
        } else {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        }
    });
});

// Reset card transform when mouse leaves
document.querySelectorAll('.poem-card').forEach(card => {
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});
