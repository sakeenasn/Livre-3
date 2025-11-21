const bookContainer = document.getElementById('bookContainer');
const body = document.body;
let isOpen = false;
let particleInterval;
let magicTimeout;

// Fonction pour ouvrir/fermer le livre
function toggleBook() {
    isOpen = !isOpen;
    
    if (isOpen) {
        bookContainer.classList.add('open');
        // IMPORTANT : On attend que les pages aient fini de tourner.
        // La transition CSS la plus longue est de 1.8s + 0.7s de délai = 2.5s.
        // On lance la magie juste après.
        magicTimeout = setTimeout(startMagic, 2600); 
    } else {
        bookContainer.classList.remove('open');
        // Si on ferme, on arrête tout de suite la magie
        clearTimeout(magicTimeout);
        stopMagic();
    }
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
}

// --- NOUVEAU SYSTÈME DE PARTICULES ---
function createParticle() {
    if (!isOpen) return;

    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Taille aléatoire pour plus de réalisme
    const size = Math.random() * 8 + 4; // entre 4px et 12px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Position de départ : au milieu du livre ouvert (la pliure)
    const rect = bookContainer.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2 + (Math.random() * 100 - 50); // Un peu de variation verticale
    
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;

    // Dérive horizontale aléatoire (Drift)
    // La particule va aller un peu à gauche ou à droite en montant
    const drift = (Math.random() - 0.5) * 300; // Entre -150px et +150px
    particle.style.setProperty('--drift', `${drift}px`);

    // Vitesse d'animation aléatoire
    const duration = Math.random() * 2 + 2.5; // entre 2.5s et 4.5s
    particle.style.animation = `magicalFloat ${duration}s ease-out forwards`;

    document.body.appendChild(particle);

    // Nettoyage
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

function startMagic() {
    stopMagic(); // Sécurité
    
    // Grosse explosion initiale rapide
    for(let i=0; i<30; i++) {
        setTimeout(createParticle, i * 30);
    }
    
    // Flux continu très dense (toutes les 40ms)
    particleInterval = setInterval(createParticle, 40);
}

function stopMagic() {
    if (particleInterval) clearInterval(particleInterval);
}
