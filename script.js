const soundcloudUrls = [
    'https://soundcloud.com/forss/flickermood',
    'https://soundcloud.com/odesza/loyal',
    'https://soundcloud.com/kygo/stole-the-show',
    'https://soundcloud.com/zedsdead/eyes-on-fire-zeds-dead-remix',
    'https://soundcloud.com/madeon/madeon-icarus'
];

let currentIndex = 0;

function loadPlayer(url) {
    const playerDiv = document.getElementById('player');
    playerDiv.innerHTML = '';  // Clear any previous embed

    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=true`;
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '166';
    iframe.scrolling = 'no';
    iframe.frameBorder = 'no';
    iframe.allow = 'autoplay';
    iframe.src = embedUrl;
    playerDiv.appendChild(iframe);

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

// Load the first track on page load
window.onload = function () {
    loadPlayer(soundcloudUrls[currentIndex]);
};

