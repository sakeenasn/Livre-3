document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');
    const container = document.querySelector('.magic-particles');

    // générer 25 particules
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = (10 + Math.random() * 80) + '%';
        p.style.bottom = (20 + Math.random() * 30) + '%';
        const size = 8 + Math.random() * 12;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.animationDelay = Math.random() + 's';
        p.style.animationDuration = (2.5 + Math.random() * 2) + 's';
        container.appendChild(p);
    }

    // ouvrir / fermer le livre
    book.addEventListener('click', () => {
        book.classList.toggle('open');
    });
});
