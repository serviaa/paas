function getSurat() {
    fetch("https://equran.id/api/surat")
    .then(response => response.json())
    .then(response => {
        let cardSurat = '';  

        response.forEach(surat => {
            cardSurat += 
            `<div class="col-lg-3 col-md-4 col-sm-12">
                <div class="card mb-3 card-surat" data-bs-toggle="modal" data-bs-target="#surahModal" data-nomorsurat="${surat.nomor}">
                    <div class="card-body">
                        <h5 class="card-title">${surat.nomor}. ${surat.nama_latin}</h5>
                        <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
                        <p class="card-text text-end">${surat.arti}</p>
                    </div>
                </div>
            </div>`;
        });

        const listSurat = document.querySelector('.card-surat-list');
        if (listSurat) {  
            listSurat.innerHTML = cardSurat;
        } else {
            console.error("Elemen .card-surat-list tidak ditemukan.");
        }

        // Add event listener to each card to fetch and display Surah details in modal
        document.querySelectorAll('.card-surat').forEach(card => {
            card.addEventListener('click', function() {
                const nomorsurat = this.getAttribute('data-nomorsurat');
                fetchSurahDetails(nomorsurat);
            });
        });

        console.log(response);  
    })
    .catch(error => {
        console.error("Terjadi kesalahan saat mengambil data surat:", error);
    });
}

getSurat();

function fetchSurahDetails(nomorsurat) {
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
    .then(response => response.json())
    .then(response => {
        const judulSurat = document.querySelector(".judul-surat");
        const cardJudulSurat = 
        `<strong>${response.nama_latin} <br>${response.nama}</strong>
            <p>Jumlah Ayat: ${response.jumlah_ayat} <br> ${response.arti}<br> ${response.deskripsi}</p>
            <button class="btn btn-success audio-button-play">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
            fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="M11.596 8.697L5.5 12V4l6.096 4.697z"/>
            </svg>
                Play
            </button>
            <button class="btn btn-danger audio-button-pause hidden-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
            <path d="M5.5 5.5h5v5h-5z"/>
            </svg>
                Stop
            </button>
            <audio id="audio-tag" src="${response.audio}"></audio>
        `;

        judulSurat.innerHTML = cardJudulSurat;

        const surat = response.ayat;
        let isiSurat = '';
        surat.forEach(s => {
            isiSurat += 
            `<div class="card mb-3">
                <div class="card-body">
                    <p>${s.nomor}.</p>
                    <h3 class="text-end">${s.ar}</h3>
                    <p><br>${s.tr}</p>
                    <p>${s.idn}</p>
                </div>
            </div>`;
        });

        const cardIsiSurat = document.querySelector('.card-isi-surat');
        cardIsiSurat.innerHTML = isiSurat;

        // Play and Pause functionality
        const buttonPlay = document.querySelector('.audio-button-play');
        const buttonPause = document.querySelector('.audio-button-pause');
        const audioSurat = document.querySelector('#audio-tag');

        // Play
        buttonPlay.addEventListener('click', function () {
            audioSurat.play();
            buttonPlay.classList.add("hidden-button");
            buttonPause.classList.remove("hidden-button");
        });

        // Pause
        buttonPause.addEventListener('click', function () {
            audioSurat.pause();
            buttonPause.classList.add("hidden-button");
            buttonPlay.classList.remove("hidden-button");
        });

    })
    .catch(error => {
        console.error("Terjadi kesalahan dalam mengambil data surat:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input");

    searchInput.addEventListener("input", function () {
        searchSurat(this.value.trim());
    });

    function searchSurat(query) {
        fetch("https://equran.id/api/surat")
            .then(response => response.json())
            .then(data => {
                let filteredSurat = data;

                if (query !== "") {
                    filteredSurat = data.filter(surat =>
                        surat.nama_latin.toLowerCase().includes(query.toLowerCase()) || 
                        surat.nama.toLowerCase().includes(query.toLowerCase())
                    );
                }

                displaySurat(filteredSurat);
            })
            .catch(error => console.error("Error fetching surah data:", error));
    }

    function displaySurat(suratList) {
        let cardSurat = '';

        suratList.forEach(surat => {
            cardSurat += `
            <div class="col-lg-3 col-md-4 col-sm-12">
                <div class="card mb-3 card-surat" data-bs-toggle="modal" data-bs-target="#surahModal" data-nomorsurat="${surat.nomor}">
                    <div class="card-body">
                        <h5 class="card-title">${surat.nomor}. ${surat.nama_latin}</h5>
                        <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
                        <p class="card-text text-end">${surat.arti}</p>
                    </div>
                </div>
            </div>`;
        });

        const listSurat = document.querySelector('.card-surat-list');
        if (listSurat) {  
            listSurat.innerHTML = cardSurat; // Update daftar surah secara langsung
        } else {
            console.error("Elemen .card-surat-list tidak ditemukan.");
        }

        // Tambahkan event listener ke setiap kartu surah untuk membuka modal
        document.querySelectorAll('.card-surat').forEach(card => {
            card.addEventListener('click', function() {
                const nomorsurat = this.getAttribute('data-nomorsurat');
                fetchSurahDetails(nomorsurat);
            });
        });
    }
});

function displaySurat(suratList) {
    let cardSurat = '';

    suratList.forEach(surat => {
        cardSurat += `
        <div class="card-surat">
            <div class="card-body">
                <h5 class="card-title">${surat.nomor}. ${surat.nama_latin}</h5>
                <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
                <p class="card-text text-end">${surat.arti}</p>
            </div>
        </div>`;
    });

    const listSurat = document.querySelector('.card-surat-list');
    if (listSurat) {  
        listSurat.innerHTML = cardSurat;
        if (suratList.length === 1) {
            listSurat.style.justifyContent = "center"; // Pastikan tetap di tengah
        }
    }
}

