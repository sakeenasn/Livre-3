document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');
    const container = document.querySelector('.magic-particles');

    // ajouter 25 particules
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = "particle";

        // Position horizontale aléatoire
        p.style.left = (20 + Math.random() * 60) + "%";

        // Taille visible
        const s = 10 + Math.random() * 12;
        p.style.width = s + "px";
        p.style.height = s + "px";

        // Animation random
        p.style.animationDelay = (Math.random() * 2) + "s";
        p.style.animationDuration = (2.5 + Math.random() * 2) + "s";

        container.appendChild(p);
    }

    // ouvrir / fermer
    book.addEventListener('click', () => {
        book.classList.toggle('open');
    });
});
