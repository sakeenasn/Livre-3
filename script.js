const bookContainer = document.getElementById('bookContainer');
const body = document.body;
let isOpen = false;
let particleInterval;
let magicTimeout;

function toggleBook() {
    isOpen = !isOpen;
    
    if (isOpen) {
        bookContainer.classList.add('open');
        // On attend l'ouverture des pages (2.6 secondes)
        magicTimeout = setTimeout(startMagic, 2600); 
    } else {
        bookContainer.classList.remove('open');
        clearTimeout(magicTimeout);
        stopMagic();
    }
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
}

// --- SYSTÈME D'EXPLOSION MULTIDIRECTIONNELLE ---
function createParticle() {
    if (!isOpen) return;

    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Taille aléatoire
    const size = Math.random() * 10 + 5; 
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Départ : Centre du livre
    const rect = bookContainer.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;

    // --- LE SECRET DE LA DIRECTION ---
    // On choisit un angle au hasard entre 0 et 360 degrés (en radians)
    const angle = Math.random() * Math.PI * 2;
    
    // On choisit une distance (vitesse) aléatoire vers laquelle la particule va voler
    const velocity = 200 + Math.random() * 300; // volera entre 200px et 500px loin

    // Calcul de la destination X et Y (Trigonométrie simple)
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    // On envoie ces valeurs au CSS
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(particle);

    // Nettoyage
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

function startMagic() {
    stopMagic();
    
    // Grosse explosion au début
    for(let i=0; i<50; i++) {
        setTimeout(createParticle, i * 10);
    }
    
    // Flux continu dense
    particleInterval = setInterval(createParticle, 50);
}

function stopMagic() {
    if (particleInterval) clearInterval(particleInterval);
}
