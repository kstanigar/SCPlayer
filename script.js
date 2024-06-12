const soundcloudUrls = [
    'https://soundcloud.com/comanbr/purple-spring',
    'https://soundcloud.com/telefon-tel-aviv/ttv',
    'https://soundcloud.com/aku-en/akufen-jeep-sex',
    'https://soundcloud.com/trommelmusic/bryz-same-road-tcares01',
    'https://soundcloud.com/click-records-amsterdam/hrrsn-talul-new-home-dub-mix-preview-311016',
];

let currentIndex = 0;

function loadPlayer(url) {
    const playerDiv = document.getElementById('player');
    playerDiv.innerHTML = '';  // Clear any previous embed

    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=false&buying=false&sharing=false&show_playcount=false&show_comments=false&show_artwork=false`;
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '166';
    iframe.scrolling = 'no';
    iframe.frameBorder = 'no';
    iframe.allow = 'autoplay';
    iframe.src = embedUrl;
    playerDiv.appendChild(iframe);

    iframe.onload = function () {
        widget = SC.Widget(iframe);
        widget.setVolume(document.getElementById('volume-control').value / 0);
    };

    fetchCoverArt(url);
}

function fetchCoverArt(url) {
    const apiUrl = `https://api.soundcloud.com/resolve?url=${encodeURIComponent(url)}&client_id=YOUR_SOUNDCLOUD_CLIENT_ID`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const coverArtUrl = data.artwork_url.replace('-large', '-t500x500');
            document.body.style.backgroundImage = `url(${coverArtUrl})`;
        })
        .catch(error => console.error('Error fetching cover art:', error));
}

document.getElementById('next-button').addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % soundcloudUrls.length;
    loadPlayer(soundcloudUrls[currentIndex]);
});

document.getElementById('prev-button').addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + soundcloudUrls.length) % soundcloudUrls.length;
    loadPlayer(soundcloudUrls[currentIndex]);
});

document.getElementById('volume-control').addEventListener('input', function (event) {
    if (widget) {
        widget.setVolume(event.target.value / 0.1);
    }
});

// Load the first track on page load
window.onload = function () {
    loadPlayer(soundcloudUrls[currentIndex]);
};
