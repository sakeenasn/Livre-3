const bookContainer = document.getElementById('bookContainer');
const body = document.body;
let isOpen = false;
let particleInterval;

// Fonction pour ouvrir/fermer le livre
function toggleBook() {
    isOpen = !isOpen;
    
    if (isOpen) {
        bookContainer.classList.add('open');
        startMagic(); // Lance les particules
    } else {
        bookContainer.classList.remove('open');
        stopMagic(); // Arrête les particules
    }
}

// Fonction pour changer le thème (Jour / Nuit+Étoiles)
function toggleTheme() {
    body.classList.toggle('dark-mode');
}

// --- SYSTÈME DE PARTICULES ---
function createParticle() {
    if (!isOpen) return;

    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Position aléatoire sortant du livre
    const rect = bookContainer.getBoundingClientRect();
    const startX = rect.left + rect.width / 2 + (Math.random() * 60 - 30);
    const startY = rect.top + rect.height / 2 + (Math.random() * 100 - 50);
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';

    document.body.appendChild(particle);

    // Nettoyage après l'animation
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

function startMagic() {
    if (particleInterval) clearInterval(particleInterval);
    
    // Petite explosion initiale
    for(let i=0; i<10; i++) {
        setTimeout(createParticle, i * 50);
    }
    
    // Flux continu
    particleInterval = setInterval(createParticle, 150);
}

function stopMagic() {
    clearInterval(particleInterval);
}
