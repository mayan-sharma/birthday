// Elegant Birthday Website JavaScript
let musicClipPlaying = false;
const musicClip = document.getElementById('musicClip');
const musicClipBtn = document.getElementById('musicClipBtn');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    setupMusicClip();
    setupPhotoGallery();
    setupScrollAnimations();
    
    // Start elegant animations
    setTimeout(() => {
        startElegantEffects();
    }, 500);
});

// Setup music clip
function setupMusicClip() {
    if (musicClip) {
        musicClip.volume = 0.7;
        musicClip.addEventListener('ended', onMusicClipEnded);
    }
}

function playMusicClip() {
    if (!musicClipPlaying) {
        musicClip.play().catch(e => {
            console.log('Audio play requires user interaction:', e);
            showMusicPrompt();
        });
        
        // Update button appearance
        const btnText = musicClipBtn.querySelector('.btn-text');
        const btnPlaying = musicClipBtn.querySelector('.btn-playing');
        
        btnText.classList.add('hidden');
        btnPlaying.classList.remove('hidden');
        
        musicClipBtn.style.background = 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)';
        musicClipBtn.style.transform = 'scale(0.95)';
        
        musicClipPlaying = true;
    }
}

function onMusicClipEnded() {
    // Reset button appearance
    const btnText = musicClipBtn.querySelector('.btn-text');
    const btnPlaying = musicClipBtn.querySelector('.btn-playing');
    
    btnText.classList.remove('hidden');
    btnPlaying.classList.add('hidden');
    
    musicClipBtn.style.background = 'linear-gradient(135deg, var(--accent) 0%, var(--gold) 100%)';
    musicClipBtn.style.transform = 'scale(1)';
    
    musicClipPlaying = false;
}

function showMusicPrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'fixed top-8 left-1/2 transform -translate-x-1/2 glass rounded-2xl px-6 py-4 z-50 text-center';
    prompt.innerHTML = `
        <div class="text-elegant font-medium mb-2">🎵 Music Ready</div>
        <div class="text-sm text-elegant opacity-75">Click the song button to play</div>
    `;
    document.body.appendChild(prompt);
    
    setTimeout(() => {
        prompt.style.opacity = '0';
        setTimeout(() => {
            prompt.remove();
        }, 300);
    }, 3000);
}

// Setup photo gallery
function setupPhotoGallery() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach(card => {
        card.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        card.innerHTML = `
                            <img src="${e.target.result}" 
                                 alt="Memory" 
                                 class="w-full h-full object-cover rounded-xl">
                        `;
                        // Add elegant hover effect to uploaded image
                        card.classList.add('overflow-hidden');
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    });
}

// Setup scroll animations with Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Start elegant background effects
function startElegantEffects() {
    createSubtleParticles();
    setupParallaxEffect();
}

// Create subtle floating particles
function createSubtleParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'fixed inset-0 pointer-events-none z-0';
    particlesContainer.style.opacity = '0.3';
    document.body.appendChild(particlesContainer);
    
    // Create fewer, more elegant particles
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createParticle(particlesContainer);
        }, i * 2000);
    }
    
    // Continue creating particles at intervals
    setInterval(() => {
        createParticle(particlesContainer);
    }, 8000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'absolute rounded-full';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'linear-gradient(45deg, rgba(184, 134, 11, 0.3), rgba(218, 165, 32, 0.3))';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    container.appendChild(particle);
    
    // Animate particle floating up
    const animation = particle.animate([
        { 
            transform: 'translateY(0px) scale(0)',
            opacity: 0
        },
        { 
            transform: 'translateY(-100px) scale(1)',
            opacity: 0.6
        },
        { 
            transform: `translateY(-${window.innerHeight + 100}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: 15000 + Math.random() * 10000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Setup subtle parallax effect
function setupParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.elegant-bg');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Smooth scroll to next section
function scrollToNext() {
    const sections = document.querySelectorAll('section');
    const currentSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= -100 && rect.top < window.innerHeight / 2;
    });
    
    if (currentSection) {
        const nextSection = currentSection.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Elegant celebration effect
function createCelebration() {
    // Prevent multiple celebrations at once
    if (document.querySelector('.celebration-container')) {
        return;
    }
    
    const celebrationContainer = document.createElement('div');
    celebrationContainer.className = 'celebration-container fixed inset-0 pointer-events-none z-50';
    document.body.appendChild(celebrationContainer);
    
    // Create elegant golden sparkles
    const colors = [
        '#daa520',
        '#b8860b', 
        '#ffd700',
        '#f4e4bc'
    ];
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create multiple waves of sparkles
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    createSparkle(celebrationContainer, centerX, centerY, colors);
                }, i * 50);
            }
        }, wave * 800);
    }
    
    // Clean up container
    setTimeout(() => {
        if (celebrationContainer.parentNode) {
            celebrationContainer.remove();
        }
    }, 4000);
    
    // Show celebration message
    showCelebrationMessage();
}

function createSparkle(container, centerX, centerY, colors) {
    const sparkle = document.createElement('div');
    sparkle.className = 'absolute';
    
    const size = Math.random() * 8 + 4;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.borderRadius = '50%';
    sparkle.style.left = centerX + 'px';
    sparkle.style.top = centerY + 'px';
    sparkle.style.transform = 'translate(-50%, -50%)';
    sparkle.style.boxShadow = '0 0 10px rgba(218, 165, 32, 0.6)';
    
    container.appendChild(sparkle);
    
    // Random explosion direction
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 300 + 150;
    const endX = centerX + Math.cos(angle) * distance;
    const endY = centerY + Math.sin(angle) * distance;
    
    // Animate sparkle
    const keyframes = [
        { 
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: 1
        },
        { 
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1,
            offset: 0.2
        },
        { 
            transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
            opacity: 0
        }
    ];
    
    sparkle.animate(keyframes, {
        duration: 2000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
    }).onfinish = () => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    };
}

function showCelebrationMessage() {
    if (document.querySelector('.celebration-modal')) return;
    
    const modal = document.createElement('div');
    modal.className = 'celebration-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    modal.innerHTML = `
        <div class="glass rounded-3xl p-8 max-w-md mx-auto text-center transform scale-0" style="animation: popIn 0.5s ease forwards;">
            <div class="text-6xl mb-4">✨</div>
            <h3 class="serif-elegant text-2xl text-elegant font-semibold mb-6">Celebration!</h3>
            <p class="text-lg text-elegant leading-relaxed mb-6">
                May this day be filled with joy, laughter, and all your favorite things!
            </p>
            <button onclick="this.closest('.celebration-modal').remove()" class="elegant-btn">
                Thank you ♥
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Remove on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
        }
    }, 6000);
}

// Add subtle interaction effects
document.addEventListener('click', function(e) {
    // Only create effect for non-interactive elements
    if (e.target && e.target.closest && 
        !e.target.closest('button') && 
        !e.target.closest('.photo-card') && 
        !e.target.closest('a')) {
        
        createClickRipple(e.clientX, e.clientY);
    }
});

function createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'fixed pointer-events-none z-30';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(184, 134, 11, 0.3) 0%, transparent 70%)';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(ripple);
    
    const animation = ripple.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(3)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => {
        ripple.remove();
    };
}

// Responsive handling
function handleResize() {
    // Recalculate positions for mobile
    if (window.innerWidth < 768) {
        // Mobile adjustments
        const musicControl = document.querySelector('.music-control');
        if (musicControl) {
            musicControl.style.bottom = '20px';
            musicControl.style.right = '20px';
        }
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call once on load

// Interactive card effects
function pulseCard(card) {
    const hiddenMessage = card.querySelector('.hidden-message');
    
    // Pulse animation
    card.style.transform = 'scale(1.02)';
    card.style.boxShadow = '0 25px 50px rgba(184, 134, 11, 0.3)';
    
    // Show hidden message
    if (hiddenMessage) {
        hiddenMessage.style.opacity = '1';
    }
    
    // Create small sparkles around the card
    createCardSparkles(card);
    
    setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
        if (hiddenMessage) {
            setTimeout(() => {
                hiddenMessage.style.opacity = '0';
            }, 2000);
        }
    }, 300);
}

function createCardSparkles(card) {
    const rect = card.getBoundingClientRect();
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'fixed inset-0 pointer-events-none z-30';
    document.body.appendChild(sparkleContainer);
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'absolute rounded-full';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.backgroundColor = '#daa520';
            sparkle.style.boxShadow = '0 0 6px #daa520';
            
            const startX = rect.left + Math.random() * rect.width;
            const startY = rect.top + Math.random() * rect.height;
            sparkle.style.left = startX + 'px';
            sparkle.style.top = startY + 'px';
            
            sparkleContainer.appendChild(sparkle);
            
            sparkle.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(1)', opacity: 1, offset: 0.2 },
                { transform: 'scale(0)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => sparkle.remove();
        }, i * 100);
    }
    
    setTimeout(() => sparkleContainer.remove(), 2000);
}

// Love Note function
function showLoveNote() {
    if (document.querySelector('.love-note-modal')) return;
    
    const modal = document.createElement('div');
    modal.className = 'love-note-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    const noteMessages = [
        "You make every day feel like a celebration 🎉",
        "Your smile is my favorite sight in the world 😊",
        "Thank you for being the most amazing person I know 💕",
        "Every moment with you is a treasure 💎",
        "You are my sunshine on cloudy days ☀️",
        "Your laugh is the most beautiful sound 🎵"
    ];
    
    const randomMessage = noteMessages[Math.floor(Math.random() * noteMessages.length)];
    
    modal.innerHTML = `
        <div class="glass rounded-3xl p-8 max-w-md mx-auto text-center transform scale-0" style="animation: popIn 0.5s ease forwards;">
            <div class="text-6xl mb-4">💌</div>
            <h3 class="serif-elegant text-2xl text-elegant font-semibold mb-6">A Little Note</h3>
            <p class="text-lg text-elegant leading-relaxed mb-6">${randomMessage}</p>
            <button onclick="this.closest('.love-note-modal').remove()" class="elegant-btn">
                Close 💕
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Remove on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Heart Rain function
function createHeartRain() {
    if (document.querySelector('.heart-rain-container')) return;
    
    const rainContainer = document.createElement('div');
    rainContainer.className = 'heart-rain-container fixed inset-0 pointer-events-none z-40';
    document.body.appendChild(rainContainer);
    
    const hearts = ['💕', '💖', '💝', '💗', '💞', '💓'];
    
    // Create multiple waves of hearts
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    createFallingHeart(rainContainer, hearts);
                }, i * 200);
            }
        }, wave * 1000);
    }
    
    setTimeout(() => {
        if (rainContainer.parentNode) {
            rainContainer.remove();
        }
    }, 5000);
}

function createFallingHeart(container, hearts) {
    const heart = document.createElement('div');
    heart.className = 'absolute text-2xl pointer-events-none';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = '-50px';
    heart.style.opacity = '0.8';
    
    container.appendChild(heart);
    
    const fallDistance = window.innerHeight + 100;
    const duration = 3000 + Math.random() * 2000;
    
    heart.animate([
        { 
            transform: 'translateY(0) rotate(0deg)',
            opacity: 0.8
        },
        { 
            transform: `translateY(${fallDistance}px) rotate(360deg)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => {
        if (heart.parentNode) {
            heart.remove();
        }
    };
}

// Add CSS for pop-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% { transform: scale(0) rotate(-180deg); opacity: 0; }
        50% { transform: scale(1.1) rotate(-90deg); opacity: 0.8; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    
    .interactive-card:hover .hidden-message {
        opacity: 0.7 !important;
    }
`;
document.head.appendChild(style);

// Secret message reveal
function revealSecretMessage() {
    const secretDiv = document.getElementById('secretMessage');
    if (secretDiv) {
        secretDiv.classList.remove('hidden');
        secretDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add sparkle effect
        setTimeout(() => {
            createSparklesBurst(secretDiv);
        }, 500);
    }
}

// Love Meter function
function showLoveMeter() {
    if (document.querySelector('.love-meter-modal')) return;
    
    const modal = document.createElement('div');
    modal.className = 'love-meter-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    modal.innerHTML = `
        <div class="glass rounded-3xl p-8 max-w-md mx-auto text-center transform scale-0" style="animation: popIn 0.5s ease forwards;">
            <div class="text-6xl mb-4">💖</div>
            <h3 class="serif-elegant text-2xl text-elegant font-semibold mb-6">Love Meter</h3>
            <div class="mb-6">
                <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div id="loveMeterBar" class="bg-gradient-to-r from-pink-400 to-red-500 h-4 rounded-full transition-all duration-3000" style="width: 0%"></div>
                </div>
                <p class="text-elegant">Measuring love levels...</p>
            </div>
            <div id="loveResult" class="text-lg text-elegant leading-relaxed mb-6 hidden">
                Love Level: <span class="text-gold font-bold">INFINITE! 💕</span><br>
                <span class="text-sm">Off the charts! This love is immeasurable! 🌟</span>
            </div>
            <button onclick="this.closest('.love-meter-modal').remove()" class="elegant-btn">
                Amazing! 💕
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate love meter
    setTimeout(() => {
        const bar = document.getElementById('loveMeterBar');
        const result = document.getElementById('loveResult');
        if (bar) {
            bar.style.width = '100%';
            setTimeout(() => {
                bar.style.width = '150%'; // Overflow effect
                if (result) {
                    result.classList.remove('hidden');
                }
            }, 3000);
        }
    }, 500);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Wish Tree function
function createWishTree() {
    if (document.querySelector('.wish-tree-modal')) return;
    
    const modal = document.createElement('div');
    modal.className = 'wish-tree-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    const wishes = [
        "May all your dreams come true! ⭐",
        "Wishing you endless happiness! 😊",
        "May love surround you always! 💕",
        "Here's to amazing adventures! 🌈",
        "May you always find reasons to smile! 😄",
        "Wishing you perfect health! 🌱",
        "May magic follow you everywhere! ✨",
        "Here's to making beautiful memories! 📸"
    ];
    
    modal.innerHTML = `
        <div class="glass rounded-3xl p-8 max-w-md mx-auto text-center transform scale-0" style="animation: popIn 0.5s ease forwards;">
            <div class="text-6xl mb-4">🌳</div>
            <h3 class="serif-elegant text-2xl text-elegant font-semibold mb-6">Birthday Wish Tree</h3>
            <p class="text-elegant mb-6">Click the leaves to reveal birthday wishes!</p>
            <div class="grid grid-cols-4 gap-2 mb-6">
                ${wishes.map((wish, i) => `
                    <div class="wish-leaf cursor-pointer text-2xl hover:scale-110 transition-transform" 
                         onclick="showWish('${wish}', this)" title="Click me!">🍃</div>
                `).join('')}
            </div>
            <div id="currentWish" class="text-elegant italic mb-4 h-16 flex items-center justify-center"></div>
            <button onclick="this.closest('.wish-tree-modal').remove()" class="elegant-btn">
                Thank you! 🌟
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function showWish(wish, leaf) {
    const wishDisplay = document.getElementById('currentWish');
    if (wishDisplay) {
        wishDisplay.textContent = wish;
        leaf.textContent = '🌟';
        leaf.style.transform = 'scale(1.2)';
    }
}

// Star Field function
function createStarField() {
    if (document.querySelector('.star-field-container')) return;
    
    // Find the button that triggered this
    const starButton = document.querySelector('button[onclick="createStarField()"]');
    
    // Disable button temporarily to prevent multiple clicks
    if (starButton) {
        starButton.disabled = true;
        starButton.style.opacity = '0.7';
        starButton.style.transform = 'scale(0.95)';
    }
    
    const starContainer = document.createElement('div');
    starContainer.className = 'star-field-container fixed inset-0 pointer-events-none z-40';
    document.body.appendChild(starContainer);
    
    // Create constellation pattern
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createTwinklingStar(starContainer);
        }, i * 200);
    }
    
    setTimeout(() => {
        if (starContainer.parentNode) {
            starContainer.remove();
        }
        
        // Re-enable button and reset its style
        if (starButton) {
            starButton.disabled = false;
            starButton.style.opacity = '';
            starButton.style.transform = '';
        }
    }, 8000);
}

function createTwinklingStar(container) {
    const star = document.createElement('div');
    star.className = 'absolute text-xl pointer-events-none';
    star.textContent = '⭐';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.style.opacity = '0';
    
    container.appendChild(star);
    
    // Twinkling animation
    star.animate([
        { opacity: 0, transform: 'scale(0) rotate(0deg)' },
        { opacity: 1, transform: 'scale(1) rotate(180deg)', offset: 0.3 },
        { opacity: 0.8, transform: 'scale(1.2) rotate(360deg)', offset: 0.7 },
        { opacity: 0, transform: 'scale(0) rotate(540deg)' }
    ], {
        duration: 4000 + Math.random() * 2000,
        easing: 'ease-in-out'
    }).onfinish = () => {
        if (star.parentNode) {
            star.remove();
        }
    };
}

// Sparkles burst effect
function createSparklesBurst(element) {
    const rect = element.getBoundingClientRect();
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'fixed inset-0 pointer-events-none z-30';
    document.body.appendChild(sparkleContainer);
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'absolute text-lg';
            sparkle.textContent = '✨';
            
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            sparkle.style.left = startX + 'px';
            sparkle.style.top = startY + 'px';
            sparkle.style.transform = 'translate(-50%, -50%)';
            
            sparkleContainer.appendChild(sparkle);
            
            const angle = (Math.PI * 2 * i) / 15;
            const distance = 100 + Math.random() * 50;
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;
            
            sparkle.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, offset: 0.3 },
                { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => sparkle.remove();
        }, i * 100);
    }
    
    setTimeout(() => sparkleContainer.remove(), 4000);
}

// Enhanced mobile touch handling
if ('ontouchstart' in window) {
    // Ensure smooth scrolling on mobile
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Memory Lane Scroller Functionality
function expandMemory(card, title, fullText, year) {
    if (document.querySelector('.memory-modal')) return;
    
    const modal = document.createElement('div');
    modal.className = 'memory-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    modal.innerHTML = `
        <div class="glass rounded-3xl p-8 max-w-2xl mx-auto text-center transform scale-0" style="animation: memoryExpand 0.6s ease forwards;">
            <div class="memory-year-large text-gold text-sm font-bold mb-4 px-4 py-2 rounded-full border border-gold inline-block">${year}</div>
            <h3 class="serif-display text-3xl font-bold text-elegant mb-6">${title}</h3>
            <div class="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
            <p class="text-elegant text-lg leading-relaxed mb-8">
                ${fullText}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button onclick="this.closest('.memory-modal').remove()" class="elegant-btn">
                    Beautiful Memory ✨
                </button>
                <button onclick="addToFavorites('${title}', '${year}')" class="elegant-btn" style="background: linear-gradient(145deg, rgba(255, 215, 0, 0.2) 0%, rgba(184, 134, 11, 0.15) 100%);">
                    💕 Save to Heart
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Remove on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Add sparkle effect around the card
    createMemorySparkles(card);
}

function addNewMemory(card) {
    if (document.querySelector('.add-memory-modal')) return;
    
    const modal = document.createElement('div');
    modal.className = 'add-memory-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    modal.innerHTML = `
        <div class="glass rounded-3xl p-8 max-w-md mx-auto text-center transform scale-0" style="animation: memoryExpand 0.6s ease forwards;">
            <div class="text-4xl mb-4">💝</div>
            <h3 class="serif-display text-2xl font-bold text-elegant mb-6">Add Your Memory</h3>
            <div class="text-left space-y-4">
                <div>
                    <label class="block text-sm font-medium text-elegant mb-2">Memory Title</label>
                    <input type="text" id="memoryTitle" class="w-full p-3 rounded-xl border border-gold/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-gold" placeholder="Our Special Day...">
                </div>
                <div>
                    <label class="block text-sm font-medium text-elegant mb-2">Year</label>
                    <input type="number" id="memoryYear" class="w-full p-3 rounded-xl border border-gold/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-gold" placeholder="2024" min="1900" max="2030">
                </div>
                <div>
                    <label class="block text-sm font-medium text-elegant mb-2">Tell the story...</label>
                    <textarea id="memoryText" rows="4" class="w-full p-3 rounded-xl border border-gold/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-gold resize-none" placeholder="Describe this beautiful memory..."></textarea>
                </div>
            </div>
            <div class="flex gap-3 mt-6">
                <button onclick="this.closest('.add-memory-modal').remove()" class="elegant-btn">
                    Cancel
                </button>
                <button onclick="createCustomMemory()" class="elegant-btn" style="background: linear-gradient(145deg, rgba(184, 134, 11, 0.3) 0%, rgba(218, 165, 32, 0.2) 100%);">
                    ✨ Create Memory
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Focus first input
    setTimeout(() => {
        modal.querySelector('#memoryTitle').focus();
    }, 600);
}

function createCustomMemory() {
    const title = document.getElementById('memoryTitle').value.trim();
    const year = document.getElementById('memoryYear').value.trim();
    const text = document.getElementById('memoryText').value.trim();
    
    if (!title || !year || !text) {
        showNotification('Please fill in all fields to create your memory ✨');
        return;
    }
    
    // Close the modal
    document.querySelector('.add-memory-modal').remove();
    
    // Create new memory card
    const memoryTrack = document.querySelector('.memory-track');
    const addCard = document.querySelector('.memory-track .memory-card:last-child');
    
    const newCard = document.createElement('div');
    newCard.className = 'memory-card glass rounded-2xl p-6 mx-8 w-80 h-64 cursor-pointer hover-lift transition-all duration-300 shrink-0 relative';
    newCard.onclick = () => expandMemory(newCard, title, text, year);
    
    newCard.innerHTML = `
        <div class="memory-year absolute -top-3 left-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">${year}</div>
        <div class="w-12 h-12 rounded-full flex items-center justify-center mb-4" style="background: linear-gradient(135deg, #8b7cd8 0%, #ff6b9d 100%);">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        </div>
        <h3 class="serif-elegant text-xl font-semibold text-elegant mb-2">${title}</h3>
        <p class="text-elegant text-sm leading-relaxed opacity-80 line-clamp-4">
            ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}
        </p>
        <div class="memory-preview-hint absolute bottom-4 right-4 text-gold text-xs opacity-60">Click to expand</div>
    `;
    
    // Insert before the add card
    memoryTrack.insertBefore(newCard, addCard);
    
    // Animate in
    newCard.style.transform = 'scale(0)';
    newCard.style.opacity = '0';
    setTimeout(() => {
        newCard.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        newCard.style.transform = 'scale(1)';
        newCard.style.opacity = '1';
    }, 100);
    
    // Scroll to show the new card
    setTimeout(() => {
        newCard.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }, 700);
    
    // Sparkle celebration
    setTimeout(() => {
        createMemorySparkles(newCard);
    }, 800);
    
    showNotification('Your beautiful memory has been added! 💕');
}

function createMemorySparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'fixed inset-0 pointer-events-none z-40';
    document.body.appendChild(sparkleContainer);
    
    // Create sparkles around the memory card
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'absolute text-lg';
            sparkle.textContent = '✨';
            
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            sparkle.style.left = startX + 'px';
            sparkle.style.top = startY + 'px';
            sparkle.style.transform = 'translate(-50%, -50%)';
            
            sparkleContainer.appendChild(sparkle);
            
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 80 + Math.random() * 40;
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;
            
            sparkle.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, offset: 0.3 },
                { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1500 + Math.random() * 500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => sparkle.remove();
        }, i * 80);
    }
    
    setTimeout(() => sparkleContainer.remove(), 3000);
}

function addToFavorites(title, year) {
    // Simple localStorage implementation
    let favorites = JSON.parse(localStorage.getItem('memoryFavorites') || '[]');
    const favorite = { title, year, timestamp: Date.now() };
    
    if (!favorites.some(f => f.title === title && f.year === year)) {
        favorites.push(favorite);
        localStorage.setItem('memoryFavorites', JSON.stringify(favorites));
        showNotification('Added to your heart! 💕');
    } else {
        showNotification('Already in your heart! 💖');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-8 right-8 glass rounded-2xl px-6 py-4 z-50 transform translate-x-full transition-all duration-500';
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="text-lg">💫</div>
            <div class="text-elegant font-medium">${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Memory Lane Image Upload Functionality
function uploadMemoryImage(placeholder) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                placeholder.innerHTML = `
                    <img src="${e.target.result}" 
                         alt="Memory" 
                         class="w-full h-full object-cover rounded-full">
                    <div class="absolute inset-0 bg-gold/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                `;
                placeholder.classList.add('relative', 'overflow-hidden', 'group');
                
                // Add sparkle effect
                createMemorySparkles(placeholder);
                showNotification('Memory photo added! ✨');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Initialize Memory Lane functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up parallax effect for memory lane
    setTimeout(() => {
        setupMemoryLaneParallax();
    }, 1000);
    
    // Add smooth scrolling behavior to memory scroller
    const memoryScroller = document.querySelector('.memory-scroller');
    if (memoryScroller) {
        memoryScroller.style.scrollBehavior = 'smooth';
    }
    
    // Touch/swipe support for mobile
    if ('ontouchstart' in window) {
        let startX, scrollLeft;
        
        memoryScroller?.addEventListener('touchstart', e => {
            startX = e.touches[0].pageX - memoryScroller.offsetLeft;
            scrollLeft = memoryScroller.scrollLeft;
        });
        
        memoryScroller?.addEventListener('touchmove', e => {
            e.preventDefault();
            const x = e.touches[0].pageX - memoryScroller.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            memoryScroller.scrollLeft = scrollLeft - walk;
        });
    }
});

// Add CSS animation for memory expansion
const memoryStyle = document.createElement('style');
memoryStyle.textContent = `
    @keyframes memoryExpand {
        0% { 
            transform: scale(0) rotate(-10deg); 
            opacity: 0; 
        }
        60% { 
            transform: scale(1.05) rotate(2deg); 
            opacity: 0.9; 
        }
        100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 1; 
        }
    }
    
    .memory-modal, .add-memory-modal {
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .memory-card {
        position: relative;
        overflow: hidden;
    }
    
    .memory-card::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.1), transparent);
        border-radius: inherit;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .memory-card:hover::before {
        opacity: 1;
    }
`;
document.head.appendChild(memoryStyle);