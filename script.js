document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');

    book.addEventListener('click', () => {
        // Ajoute ou enlève la classe 'open' au livre
        book.classList.toggle('open');
    });
});
