const bookContainer = document.getElementById('bookContainer');
const body = document.body;
let isOpen = false;
let particleInterval;
let magicTimeout;

// Couleurs magiques (Or, Violet, Bleu, Blanc)
const colors = ['#ffd700', '#ff9a9e', '#a18cd1', '#ffffff', '#84fab0'];

function toggleTheme() {
    body.classList.toggle('dark-mode');
}

function toggleBook() {
    isOpen = !isOpen;
    
    if (isOpen) {
        bookContainer.classList.add('open');
        // On attend la fin de l'animation du vent (env. 2.5s)
        magicTimeout = setTimeout(startMagic, 2200); 
    } else {
        bookContainer.classList.remove('open');
        clearTimeout(magicTimeout);
        stopMagic();
    }
}

// Créer une particule
function createParticle() {
    // Sécurité : Si le livre n'est plus ouvert, on arrête
    if (!isOpen) return;

    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Taille aléatoire (petite et grande)
    const size = Math.random() * 8 + 3; 
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Couleur aléatoire + Glow
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

    // POSITIONNEMENT CRITIQUE
    // On récupère la position actuelle du livre (qui a bougé à cause du transform)
    const rect = bookContainer.getBoundingClientRect();
    
    // Le point de départ est la "pliure" centrale.
    // Comme le livre est translate de 160px, le centre visuel change.
    // On vise le centre gauche du conteneur (là où se trouve la tranche une fois ouvert)
    const startX = rect.left; 
    const startY = rect.top + rect.height / 2 + (Math.random() * 150 - 75); // Un peu de variation en hauteur
    
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;

    // Définition des trajectoires (Variables CSS pour l'animation)
    const tx = (Math.random() - 0.5) * 50; // Léger mouvement initial latéral
    const txEnd = (Math.random() - 0.5) * 400; // Grande dispersion vers le haut
    
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--tx-end', `${txEnd}px`);

    // Vitesse
    const duration = Math.random() * 2 + 2; // 2s à 4s
    particle.style.animation = `floatUp ${duration}s ease-out forwards`;

    document.body.appendChild(particle);

    // Nettoyage du DOM
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

function startMagic() {
    stopMagic();
    // Explosion initiale
    for(let i=0; i<20; i++) setTimeout(createParticle, i * 50);
    // Flux continu
    particleInterval = setInterval(createParticle, 50);
}

function stopMagic() {
    if (particleInterval) clearInterval(particleInterval);
}
