// Fonction pour récupérer le nom depuis l'URL (paramètre Facebook ou query string)
function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Récupérer le nom depuis l'URL
// Facebook peut passer le nom via différents paramètres
let userName = getParameterByName('name') || 
               getParameterByName('fb_name') || 
               getParameterByName('user') ||
               getParameterByName('nom') ||
               'Cher(e) ami(e)';

// Si aucun nom n'est trouvé, essayer de récupérer depuis le hash
if (userName === 'Cher(e) ami(e)') {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const hashParams = new URLSearchParams(hash);
        userName = hashParams.get('name') || hashParams.get('fb_name') || userName;
    }
}

// Afficher le nom personnalisé
const nameDisplay = document.getElementById('name-display');
if (userName && userName !== 'Cher(e) ami(e)') {
    nameDisplay.textContent = `Cher(e) ${userName} !`;
} else {
    nameDisplay.textContent = 'Cher(e) ami(e) !';
}

// Animation des cartes de vœux
const wishCards = document.querySelectorAll('.wish-card');
wishCards.forEach((card, index) => {
    setTimeout(() => {
        card.classList.add('visible');
    }, 500 + (index * 200));
});

// Animation du titre (plus nécessaire car géré par CSS)
// Les animations sont maintenant gérées directement dans le CSS avec fadeInUp

// Système de confettis
function createConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 200;
    const colors = ['#FFD700', '#FFA500', '#FF6B6B', '#FF1493', '#00CED1', '#32CD32', '#FF69B4', '#FFFFFF', '#FF4500', '#1E90FF', '#FFD700', '#FF6347'];
    
    // Créer les confettis
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 8 + 5, // Taille légèrement plus grande
            d: Math.random() * confettiCount,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncrement: Math.random() * 0.1 + 0.05,
            tiltAngle: Math.random() * Math.PI * 2 // Angle initial aléatoire
        });
    }
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((c, i) => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.tiltAngle);
            
            // Dessiner des confettis rectangulaires colorés
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.r/2, -c.r/2, c.r, c.r * 1.5);
            
            // Ajouter un petit reflet pour plus de réalisme
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(-c.r/2 + 1, -c.r/2 + 1, c.r/3, c.r/3);
            
            ctx.restore();
            
            c.tiltAngle += c.tiltAngleIncrement;
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;
            
            if (c.y > canvas.height) {
                c.x = Math.random() * canvas.width;
                c.y = -20;
                c.tilt = Math.floor(Math.random() * 10) - 20;
            }
        });
        
        requestAnimationFrame(drawConfetti);
    }
    
    drawConfetti();
}

// Créer des étoiles en arrière-plan
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 80;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        // Varier la taille des étoiles
        const size = Math.random() * 3 + 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        starsContainer.appendChild(star);
    }
}

// Animation du nombre 2026
const yearNumber = document.getElementById('year-2026');
setTimeout(() => {
    yearNumber.style.animation = 'yearRotate 3s ease-in-out infinite, yearPulse 2s ease-in-out infinite, yearGradient 4s ease infinite';
}, 300);

// Effet de particules supplémentaires au clic
document.addEventListener('click', (e) => {
    createClickParticles(e.clientX, e.clientY);
});

function createClickParticles(x, y) {
    const particleCount = 10;
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#f9ca24'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 3 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let px = x;
        let py = y;
        let opacity = 1;
        
        function animate() {
            px += vx;
            py += vy;
            opacity -= 0.02;
            
            particle.style.left = px + 'px';
            particle.style.top = py + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

// Redimensionnement du canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialisation
window.addEventListener('load', () => {
    createConfetti();
    createStars();
    
    // Animation d'entrée
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Effet de parallaxe sur les cartes de vœux
document.addEventListener('mousemove', (e) => {
    const wishCards = document.querySelectorAll('.wish-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    wishCards.forEach((card, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

