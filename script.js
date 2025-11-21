document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');
    const particlesContainer = document.querySelector('.magic-particles');

    // Générer beaucoup plus de particules
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');

        // Position aléatoire
        p.style.left = (30 + Math.random() * 40) + "%";

        // Taille aléatoire
        const size = 7 + Math.random() * 12;
        p.style.width = size + "px";
        p.style.height = size + "px";

        // Délais aléatoires
        p.style.animationDelay = (Math.random() * 2) + "s";
        p.style.animationDuration = (2.5 + Math.random() * 2) + "s";

        particlesContainer.appendChild(p);
    }

    // Ouverture du livre
    book.addEventListener('click', () => {
        book.classList.toggle('open');
    });
});
