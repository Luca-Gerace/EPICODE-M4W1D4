// Puntatori
const searchResults = document.getElementById('searchResults');
const eminem = document.getElementById('eminem');
const eminemSection = document.getElementById('eminemSection');
const metallica = document.getElementById('metallica');
const metallicaSection = document.getElementById('metallicaSection');
const queen = document.getElementById('queen');
const queenSection = document.getElementById('queenSection');
const found = document.getElementById('found');
const searchSection = document.getElementById('searchSection');

// fetch API
function fetchAPI(query) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // ciclo su ogni elemento dell'array data.data
            data.data.forEach(element => {
                // creo la card
                let card = document.createElement('div');
                // aggiungo classi bootstrap
                card.classList.add('col', 'p-0');
                // nella card creo l'html con i contenuti
                card.innerHTML = `
                    <a onclick="playAudio(${element.id})" class="p-2 d-flex flex-column">
                        <img src="${element.album.cover_medium}" class="img-fluid" alt="${element.title}">
                        <p>${element.title}</p>
                    </a>
                    <audio id="${element.id}">
                        <source src="${element.preview}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                `
                // inserisco la card nella sezione
                switch (query) {
                    case 'eminem':
                        eminem.classList.remove('d-none');
                        eminemSection.appendChild(card);
                        break;
                    case 'metallica':
                        metallica.classList.remove('d-none');
                        metallicaSection.appendChild(card);
                        break;
                    case 'queen':
                        queen.classList.remove('d-none');
                        queenSection.appendChild(card);
                        break;
                }
            });
        })
        .catch(error => {
            console.log(error);
        })
}

function playAudio(id) {
    // Seleziona l'elemento audio con l'id del brano
    let audio = document.getElementById(id);

    // Al click controlla se l'audio è in pausa, se si, riproduce audio altrimenti mette in pausa
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

fetchAPI('eminem');
fetchAPI('metallica');
fetchAPI('queen');