const P = "https://api.allorigins.win/raw?url=";
const I = "https://inv.vern.cc/api/v1/search?q=";

document.getElementById('searchBtn').onclick = () => {
    let q = document.getElementById('query').value;
    let c = document.getElementById('video-container');
    c.innerHTML = "Caricamento...";
    
    fetch(P + encodeURIComponent(I + q))
        .then(res => res.json())
        .then(data => {
            c.innerHTML = "";
            data.forEach(v => {
                if(v.type === "video") {
                    let d = document.createElement('div');
                    d.className = 'video-card';
                    d.innerHTML = `<img src="${v.videoThumbnails[0].url}"><p>${v.title}</p>`;
                    d.onclick = () => {
                        document.getElementById('player-modal').classList.remove('hidden');
                        document.getElementById('player').innerHTML = `<iframe width="100%" src="https://www.youtube.com/embed/${v.videoId}?vq=tiny" frameborder="0"></iframe>`;
                    };
                    c.appendChild(d);
                }
            });
        })
        .catch(() => c.innerHTML = "Errore! Riprova.");
};

document.getElementById('closeBtn').onclick = () => {
    document.getElementById('player-modal').classList.add('hidden');
    document.getElementById('player').innerHTML = "";
};

