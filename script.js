document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');

    book.addEventListener('click', () => {
        book.classList.toggle('open');
    });
});
