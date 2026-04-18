const searchBtn = document.getElementById('searchBtn');
const queryInput = document.getElementById('query');
const container = document.getElementById('video-container');
const modal = document.getElementById('player-modal');
const closeBtn = document.getElementById('closeBtn');
const playerDiv = document.getElementById('player');

// Usiamo un'istanza pubblica di Invidious tramite un proxyconconst PROXY = "https://api.allorigins.win/raw?url=";
const INVIDIOUS = "https://invidious.projectsegfau.lt/api/v1/search?q=";

searchBtn.addEventListener('click', async () => {
    const query = queryInput.value;
    if (!query) return;

    container.innerHTML = "<p>Ricerca in corso...</p>";

    try {
        const response = await fetch(PROXY + encodeURIComponent(INVIDIOUS + query));
        const data = await response.json();

        container.innerHTML = "";
        data.forEach(video => {
            if (video.type === "video") {
                const card = document.createElement('div');
                card.className = 'video-card';
                card.innerHTML = `
                    <img src="${video.videoThumbnails[0].url}" alt="thumb">
                    <p>${video.title.substring(0, 20)}...</p>
                `;
                card.onclick = () => playVideo(video.videoId);
                container.appendChild(card);
            }
        });
    } catch (err) {
        container.innerHTML = "<p>Errore! Prova di nuovo.</p>";
        console.error(err);
    }
});

function playVideo(id) {
    modal.classList.remove('hidden');
    // Il trucco per il Lumia: usiamo l'embed ufficiale di YT che è molto compatibile
    playerDiv.innerHTML = `<iframe width="320" height="240" src="https://www.youtube.com/embed/${id}?vq=tiny" frameborder="0" allowfullscreen></iframe>`;
}

closeBtn.onclick = () => {
    modal.classList.add('hidden');
    playerDiv.innerHTML = "";
};
