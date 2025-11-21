const book = document.getElementById('book');
const body = document.body;
const starsContainer = document.getElementById('stars-container');
let isOpen = false;
let particleInterval;
let magicTimeout;

// --- 1. GÉNÉRATION DES ÉTOILES ALÉATOIRES ---
// On crée 150 étoiles placées n'importe où
function generateStars() {
    for(let i=0; i<150; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Position aléatoire %
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Taille aléatoire
        const size = Math.random() * 2 + 1;
        
        // Vitesse scintillement aléatoire
        const duration = Math.random() * 3 + 1;

        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = duration + 's';

        starsContainer.appendChild(star);
    }
}
// On lance la génération au chargement
generateStars();


// --- 2. OUVERTURE / FERMETURE ---
function toggleBook() {
    isOpen = !isOpen;
    
    if (isOpen) {
        book.classList.add('open');
        // On lance la magie après 1.2 secondes (le temps que les pages tournent)
        magicTimeout = setTimeout(startMagic, 1200);
    } else {
        book.classList.remove('open');
        clearTimeout(magicTimeout);
        stopMagic();
    }
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
}

// --- 3. SYSTÈME DE PARTICULES EXPLOSIVES ---
function createParticle() {
    if (!isOpen) return;

    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // --- POSITION DE DÉPART ---
    // Pour que ça marche peu importe la taille de l'écran, on calcule la position du livre
    // getBoundingClientRect nous donne la position exacte du livre en pixels
    const rect = book.getBoundingClientRect();
    
    // Le point de sortie est au milieu du livre (la pliure)
    // rect.left est le bord gauche du livre fermé. 
    // Quand le livre est ouvert (open), il est décalé de 150px par le CSS.
    // Le centre visuel de la pliure est donc : rect.left + (moitié largeur)
    
    /* ASTUCE : Comme le livre bouge, on va viser le centre exact de l'écran 
       car le livre se centre avec flexbox + translate */
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;

    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';

    // --- DIRECTION ---
    const angle = Math.random() * Math.PI * 2; // 360 degrés
    const velocity = 150 + Math.random() * 250; // Distance

    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.setProperty('--x', `${tx}px`);
    particle.style.setProperty('--y', `${ty}px`);

    // IMPORTANT : On attache au BODY, pas au livre, pour éviter les bugs de superposition
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1500);
}

function startMagic() {
    // Boum initiale
    for(let i=0; i<30; i++) setTimeout(createParticle, i * 10);
    // Continue
    particleInterval = setInterval(createParticle, 50);
}

function stopMagic() {
    clearInterval(particleInterval);
}
