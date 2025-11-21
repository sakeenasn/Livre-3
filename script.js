const bookContainer = document.getElementById('bookContainer');
const body = document.body;
let isOpen = false;
let particleInterval;
let magicTimeout;

function toggleBook() {
    isOpen = !isOpen;
    
    if (isOpen) {
        bookContainer.classList.add('open');
        // On attend que le livre soit bien ouvert (1.5s) pour lancer la magie
        magicTimeout = setTimeout(startMagic, 1500); 
    } else {
        bookContainer.classList.remove('open');
        clearTimeout(magicTimeout);
        stopMagic();
    }
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
}

// --- MOTEUR DE PARTICULES ---
function createParticle() {
    if (!isOpen) return;

    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // 1. Taille aléatoire
    const size = Math.random() * 8 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // 2. POSITION DE DÉPART : AU CENTRE DE LA PLIURE
    // Le livre fait 300px de large. Ouvert, la pliure est à gauche (0).
    // Mais comme on a décalé le conteneur avec translateX(150px), le 0 est le centre visuel.
    // On les fait partir de (0, Hauteur/2) relative au livre.
    
    // On récupère la position précise
    const startX = 0; // Pliure du livre (le côté gauche de la page droite)
    const startY = 210; // Milieu vertical (420px / 2)

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;

    // 3. DIRECTION (EXPLOSION 360°)
    // Angle aléatoire entre 0 et 2*PI (cercle complet)
    const angle = Math.random() * Math.PI * 2;
    
    // Distance de vol (Vitesse)
    const distance = 200 + Math.random() * 300; // Vole entre 200px et 500px

    // Calcul trigonométrique (Maths) pour trouver le point d'arrivée X et Y
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    // On envoie ces valeurs au CSS
    particle.style.setProperty('--x', `${destX}px`);
    particle.style.setProperty('--y', `${destY}px`);

    // On attache la particule à la page de droite pour qu'elle bouge avec le livre
    document.querySelector('.right-page').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1500);
}

function startMagic() {
    // Explosion initiale
    for(let i=0; i<40; i++) {
        setTimeout(createParticle, i * 20);
    }
    // Flux continu
    particleInterval = setInterval(createParticle, 50);
}

function stopMagic() {
    clearInterval(particleInterval);
}
