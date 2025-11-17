const book = document.querySelector('.book');

book.addEventListener('click', () => {
    // On ajoute une classe "active" qui va lancer l'animation CSS
    book.classList.toggle('open');
});
