// Motore di ricerca video ultra-semplice
const searchBtn = document.getElementById('searchBtn');
const container = document.getElementById('video-container');

searchBtn.onclick = function() {
    const query = document.getElementById('query').value;
    if (!query) return;

    container.innerHTML = "Cerco i video...";

    // Usiamo un proxy diverso per vedere se si sblocca
    const url = "https://inv.tux.pizza/api/v1/search?q=" + encodeURIComponent(query);
    const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

    fetch(proxyUrl)
        .then(res => res.json())
        .then(data => {
            container.innerHTML = ""; // Pulisce la scritta "Cerco..."
            data.forEach(v => {
                if (v.type === "video") {
                    const card = document.createElement('div');
                    card.className = 'video-card';
                    card.innerHTML = `
                        <img src="${v.videoThumbnails[0].url}" style="width:100%">
                        <p>${v.title}</p>
                    `;
                    // Quando clicchi la foto, apre il video
                    card.onclick = () => {
                        window.open("https://www.youtube.com/embed/" + v.videoId + "?vq=tiny", "_blank");
                    };
                    container.appendChild(card);
                }
            });
        })
        .catch(err => {
            container.innerHTML = "Errore di connessione. Riprova tra un secondo!";
        });
};
