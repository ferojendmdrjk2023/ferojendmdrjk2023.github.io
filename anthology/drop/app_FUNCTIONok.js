function init() {
    loadToken(function (token) {
        searchArtist(token, 'Taylor Swift', function (artistId) {
            if (artistId) {
                getAlbums(token, artistId, function (albums) {
                    displayAlbums(albums, token);
                });
            }
        });
    });

    setupNavigation();
}


function loadToken(callback) {
    let clientId = 'f3907983afa34754a63b4a556626b6a1';
    let clientSecret = '06029c14fa444bac982fa48a020c5c01';

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText);
            callback(data.access_token);
        }
    };

    xhttp.open('POST', 'https://accounts.spotify.com/api/token', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader(
        'Authorization',
        'Basic ' + btoa(clientId + ':' + clientSecret)
    );
    xhttp.send('grant_type=client_credentials');
}

function searchArtist(token, artistName, callback) {
    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => callback(data.artists.items[0]?.id || null))
        .catch(err => console.error('Error searching artist:', err));
}

function getAlbums(token, artistId, callback) {
    fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=50`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => callback(data.items))
        .catch(err => console.error('Error fetching albums:', err));
}

function getAlbumTracks(token, albumId, callback) {
    fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => callback(data.items))
        .catch(err => console.error('Error fetching tracks:', err));
}


function setupNavigation() {
    let trackCard = document.getElementById('track-card');
    let albumContainer = document.getElementById('album-container');
    let lyricCard = document.getElementById('lyric-card');

    document.getElementById('main-home').onclick = function () {
        lyricCard.style.display = 'none';
        trackCard.style.display = 'none';
        albumContainer.style.display = 'flex';
    };

    document.getElementById('lyric-home').onclick = function () {
        lyricCard.style.display = 'none';
        trackCard.style.display = 'block';
    };

    document.getElementById('lyric-song').onclick = function () {
        lyricCard.style.display = 'none';
        trackCard.style.display = 'block';
    };

    document.getElementById('track-home').onclick = function () {
        trackCard.style.display = 'none';
        albumContainer.style.display = 'flex';
    };

    document.getElementById('song').addEventListener('click', function () {
        lyricCard.style.display = 'none';
        albumContainer.style.display = 'none';
        trackCard.style.display = 'block';

        // Trigger data loading
        loadTrackData();
    });
}




document.getElementById('song').onclick = function () {
    loadToken(function (token) {
        searchArtist(token, 'Taylor Swift', function (artistId) {
            if (artistId) {
                getAlbums(token, artistId, function (albums) {
                    let allTracks = [];
                    let pending = albums.length;

                    // Fetch tracks for each album
                    albums.forEach(album => {
                        getAlbumTracks(token, album.id, function (tracks) {
                            // Add album name to each track
                            tracks.forEach(track => {
                                track.albumName = album.name;
                            });

                            allTracks.push(...tracks);
                            pending--;

                            // Once all tracks are fetched, display them alphabetically
                            if (pending === 0) {
                                let sortedTracks = allTracks.sort((a, b) =>
                                    a.name.localeCompare(b.name)
                                );
                                displayTracks(sortedTracks); // Display all tracks alphabetically
                            }
                        });
                    });
                });
            }
        });
    });
};



function displayAlbums(albums, token) {
    let albumContainer = document.getElementById('album-container');
    albumContainer.innerHTML = '';

    let filteredAlbums = albums.filter(album => {
        let name = album.name.toLowerCase();
        return !(
            name.includes('live') ||
            name.includes('remix') ||
            name.includes('acoustic')
        );
    });

    filteredAlbums.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    filteredAlbums.forEach(album => {
        let card = document.createElement('div');
        card.classList.add('card');

        let albumImage = document.createElement('div');
        albumImage.classList.add('albumcard');
        albumImage.style.backgroundImage = `url(${album.images[0]?.url || ''})`;

        let albumName = document.createElement('h4');
        albumName.textContent = album.name;

        card.appendChild(albumImage);
        card.appendChild(albumName);

        card.onclick = function () {
            getAlbumTracks(token, album.id, function (tracks) {
                tracks.forEach(track => {
                    track.albumName = album.name;
                });
                displayTracks(tracks);
            });
        };

        albumContainer.appendChild(card);
    });
}


function displayTracks(tracks) {
    let trackContainer = document.getElementById('track-card');
    trackContainer.innerHTML = '';
    trackContainer.style.display = 'block';
    document.getElementById('album-container').style.display = 'none';

    tracks.forEach(track => {
        let trackItem = document.createElement('div');
        trackItem.classList.add('track-item');

        // Track Title
        let trackTitle = document.createElement('div');
        trackTitle.textContent = track.name;

        // Album Name
        let albumInfo = document.createElement('div');
        albumInfo.classList.add('album-name');
        albumInfo.textContent = `Album: ${track.albumName || 'Unknown'}`;

        // Play Button
        let playButton = document.createElement('button');
        playButton.id = 'btn';
        playButton.textContent = 'Play Song';
        playButton.onclick = function () {
            playAudioTrack(track.id); // Call function to play audio
        };

        // Stop Button
        let stopButton = document.createElement('button');
        stopButton.id = 'btn';
        stopButton.textContent = 'Stop Song';
        stopButton.onclick = function () {
            stopAudio(); // Call function to stop the currently playing audio
        };

        // Lyric Button
        let lyricButton = document.createElement('button');
        lyricButton.id = 'btn';
        lyricButton.textContent = 'Show Lyric';
        lyricButton.onclick = function () {
            stopAudio(); // Stop audio before showing lyrics
            fetchAndDisplayLyrics(track.id); // Pass track ID to fetch lyrics
        };

        // Append elements to track item
        trackItem.appendChild(trackTitle);
        trackItem.appendChild(albumInfo);
        trackItem.appendChild(playButton);
        trackItem.appendChild(stopButton); // Add Stop Button
        trackItem.appendChild(lyricButton);

        trackContainer.appendChild(trackItem);
    });
}



    
function fetchAndDisplayLyrics(trackId) {
    fetch('songs.xml')
        .then(response => response.text())
        .then(str => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(str, 'application/xml');
            let track = Array.from(xml.getElementsByTagName('track')).find(t =>
                t.getElementsByTagName('track_id')[0].textContent === trackId
            );
            let imageUrl = track?.getElementsByTagName('lyric_content')[0]?.textContent;

            // Pass trackId to displayLyrics so it knows which song to play on click
            displayLyrics(imageUrl, trackId);
        })
        .catch(err => console.error('Error fetching lyrics:', err));
}


function displayLyrics(imageUrl, trackId) {
    let lyricContainer = document.getElementById('lyric-card');
    lyricContainer.innerHTML = imageUrl
        ? `<img src="${imageUrl}" style="width: 100%">`
        : '<p>Lyric and Chord are in progress.</p>';
    lyricContainer.style.display = 'block';
    document.getElementById('track-card').style.display = 'none';

    let controls = document.createElement('div');
    controls.classList.add('lyric-controls');

    // Play Button
    let playButton = document.createElement('button');
    playButton.id = 'btn';
    playButton.textContent = 'Play Song';
    playButton.onclick = function () {
        playAudioTrack(trackId, 'lyric-card'); // Specify the container for error messages
    };

    // Stop Button
    let stopButton = document.createElement('button');
    stopButton.id = 'btn';
    stopButton.textContent = 'Stop Song';
    stopButton.onclick = function () {
        stopAudio(); // Call function to stop the currently playing audio
    };

    controls.appendChild(playButton);
    controls.appendChild(stopButton);

    lyricContainer.appendChild(controls);
}



let currentAudio = null; // To track the currently playing audio
function playAudioTrack(trackId, errorContainerId = 'track-card') {  
    fetch('songs.xml') // Fetch and parse the XML file
        .then(response => response.text())
        .then(xmlString => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlString, 'application/xml');
            let trackElements = xmlDoc.getElementsByTagName('track'); // Find the <track> with the corresponding track_id
            for (let track of trackElements) {
                let trackIdElement = track.getElementsByTagName('track_id')[0];
                if (trackIdElement && trackIdElement.textContent === trackId) {
                    let audioPath = track.getElementsByTagName('audiotrack')[0]?.textContent;
                    if (audioPath) {
                        playAudio(audioPath); // Play the audio if audiotrack exists
                    } else {
                        displayErrorMessage("Audiotrack is currently unavailable for this song.", errorContainerId);
                    }
                    return;
                }
            }
            displayErrorMessage("Track not found.", errorContainerId); // TrackID does not exist in the XML file
        });
}


function playAudio(audioPath) {
    // Stop the currently playing audio if any
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Create a new audio instance and play the track
    currentAudio = new Audio(audioPath);
    currentAudio.play();

    // Listen for the audio ending to clear the reference
    currentAudio.onended = () => {
        currentAudio = null;
    };
}

function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null; // Clear the reference
    }
}

function displayErrorMessage(message, containerId = 'track-card') {
    let container = document.getElementById(containerId); // Use the specified container
    if (!container) return;

    let errorContainer = document.createElement('div'); // Create the error message element
    errorContainer.classList.add('error-popup');
    errorContainer.textContent = message;

    container.appendChild(errorContainer); // Append the error message to the container
    setTimeout(() => {
        errorContainer.remove();
    }, 1000);
}



document.addEventListener('DOMContentLoaded', () => {
    let homeButton = document.getElementById('main-home'); 
    let songButton = document.getElementById('song'); 
    let meetButton = document.getElementById('meet'); 
    let profileButton = document.getElementById('profile'); 

    if (homeButton) {
        homeButton.addEventListener('click', () => {
            stopAudio(); // Stop audio when "HOME" button is clicked
        });
    }

    if (songButton) {
        songButton.addEventListener('click', () => {
            stopAudio(); // Stop audio when "SONG" button is clicked
        });
    }

    if (meetButton) {
        meetButton.addEventListener('click', () => {
            stopAudio(); // Stop audio when "PROFILE" button is clicked
        });
    }

    if (profileButton) {
        profileButton.addEventListener('click', () => {
            stopAudio(); // Stop audio when "PROFILE" button is clicked
        });
    }
});


document.getElementById('search-icon').onclick = function () {
    let searchBox = document.getElementById('search-input'); // Get the search input field
    let searchedTrack = searchBox.value.trim().toLowerCase(); // Get the user's input and normalize it
    let trackCard = document.getElementById('track-card'); // Track card container
    let albumContainer = document.getElementById('album-container'); // Album container

    if (searchedTrack) {
        loadToken(function (token) {
            searchArtist(token, 'Taylor Swift', function (artistId) {
                if (artistId) {
                    getAlbums(token, artistId, function (albums) {
                        let allTracks = []; // To store all tracks
                        let pending = albums.length; // Track the number of albums to process

                        albums.forEach(function (album) {
                            getAlbumTracks(token, album.id, function (tracks) {
                                tracks.forEach(function (track) {
                                    track.albumName = album.name; // Add album name to track metadata
                                    allTracks.push(track); // Collect all tracks
                                });

                                pending--; // Decrement the pending counter
                                if (pending === 0) {
                                    // All album tracks fetched
                                    let matchingTracks = allTracks.filter(function (track) {
                                        return track.name.toLowerCase().includes(searchedTrack);
                                    });

                                    if (matchingTracks.length > 0) {
                                        displayTracks(matchingTracks); // Display matching tracks
                                        trackCard.style.display = 'block'; // Show the track card
                                        albumContainer.style.display = 'none'; // Hide the album container
                                    } else {
                                        alert('No matching tracks found.'); // Show alert if no match found
                                    }
                                    searchBox.value = ''; // Clear the search bar after displaying results
                                }
                            });
                        });
                    });
                }
            });
        });
    } else {
        alert('Please enter a track title to search.'); // Alert if input is empty
    }
};



window.onload = init;
