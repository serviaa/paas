let bibleData = [];

async function loadBibleData() {
    try {
        const response = await fetch('alkitab.json'); // Mengambil data dari file JSON
        bibleData = await response.json();
        displayBooks();
    } catch (error) {
        console.error('Error fetching Bible data:', error);
    }
}

function displayBooks() {
    let bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    let books = [...new Set(bibleData.map(item => item.book))];
    
    books.forEach(book => {
        let button = document.createElement("button");
        button.className = "book-btn";
        button.textContent = book;
        button.onclick = () => openChapterModal(book);
        bookList.appendChild(button);
    });
}

function openChapterModal(book) {
    document.getElementById("selected-book").textContent = book;
    let chapterList = document.getElementById("chapter-list");
    chapterList.innerHTML = "";

    let chapters = [...new Set(bibleData.filter(item => item.book === book).map(item => item.chapter))];

    chapters.forEach(chapter => {
        let btn = document.createElement("button");
        btn.className = "chapter-btn";
        btn.textContent = chapter;
        btn.onclick = () => openVerseModal(book, chapter);
        chapterList.appendChild(btn);
    });

    document.getElementById("chapter-modal").style.display = "flex";
}

function openVerseModal(book, chapter) {
    document.getElementById("selected-chapter").textContent = `${book} - Chapter ${chapter}`;
    let verseList = document.getElementById("verse-list");
    verseList.innerHTML = "";

    let verses = bibleData.filter(item => item.book === book && item.chapter === chapter);
    verses.forEach(verse => {
        let para = document.createElement("p");
        para.innerHTML = `<strong>${verse.verse}:</strong> ${verse.text}`;
        verseList.appendChild(para);
    });

    closeModal('chapter-modal');
    document.getElementById("verse-modal").style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

window.onload = loadBibleData;

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("chapter-modal"); // Sesuaikan dengan ID modal
    const body = document.body;

    function openModal() {
        modal.style.display = "block";
        body.classList.add("modal-open"); // Tambahkan class untuk mencegah scroll
    }

    function closeModal() {
        modal.style.display = "none";
        body.classList.remove("modal-open"); // Hapus class agar scroll kembali normal
    }

    // Contoh: Menjalankan modal saat diklik
    document.getElementById("open-modal-btn").addEventListener("click", openModal);
    document.getElementById("close-modal-btn").addEventListener("click", closeModal);
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input");

    searchInput.addEventListener("input", function () {
        filterBooks(searchInput.value);
    });
});

function filterBooks(searchTerm) {
    let bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; // Kosongkan daftar sebelum ditampilkan ulang
    
    let filteredBooks = [...new Set(bibleData.map(item => item.book))]
        .filter(book => book.toLowerCase().includes(searchTerm.toLowerCase())); // Filter berdasarkan input

    filteredBooks.forEach(book => {
        let button = document.createElement("button");
        button.className = "book-btn";
        button.textContent = book;
        button.onclick = () => openChapterModal(book);
        bookList.appendChild(button);
    });
}