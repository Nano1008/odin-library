const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBook(book);
}

// Display the book
function displayBook(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const title = document.createElement('h2');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;

    const read = document.createElement('p');
    read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

    const readButton = document.createElement('button');
    readButton.textContent = 'Read';
    readButton.addEventListener('click', () => {
        book.toggleRead();
        read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        bookCard.remove();
    });

    bookCard.append(title, author, pages, read, readButton, removeButton);
    document.querySelector('#books-container').appendChild(bookCard);
}

document.querySelector('#add-book').addEventListener('click', () => {
    document.querySelector('dialog').showModal();
});

document.querySelector('dialog form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = e.target.querySelector('#title').value;
    const author = e.target.querySelector('#author').value;
    const pages = e.target.querySelector('#pages').value;
    const read = e.target.querySelector('#read').checked;

    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);

    e.target.closest('dialog').close();
});
