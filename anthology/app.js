// Class 1: Token Management and Spotify Authentication
class SpotifyAuth {
    constructor() {
        this.clientId = 'bf92c1bb9b604b4c9d11e7008b5345a9';
        this.clientSecret = '4cc45d1fc19b454d883ce10ddd257211';
        this.token = null;
    }

    loadToken(callback) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                let data = JSON.parse(xhttp.responseText);
                this.token = data.access_token;
                callback(this.token);
            }
        };

        xhttp.open('POST', 'https://accounts.spotify.com/api/token', true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.setRequestHeader(
            'Authorization',
            'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
        );
        xhttp.send('grant_type=client_credentials');
    }
}

// Class 2: Create Nav Bar and placeholder searchQuery
class SpotifyApp {
    constructor() {
        this.auth = new SpotifyAuth();
        this.token = null;
        this.albumManager = null;
        this.trackManager = null;
        this.searchManager = null;
    }

    init() {
        this.auth.loadToken((token) => {
            this.token = token;
            this.albumManager = new AlbumManager(this.token);
            this.trackManager = new TrackManager(this.token);
            this.searchManager = new SearchManager(this.token);

            this.searchArtist('Taylor Swift', (artistId) => {
                if (artistId) {
                    this.albumManager.getAlbums(artistId, (albums) => {
                        this.albumManager.displayAlbums(albums);
                    });
                }
            });

            this.setupNavigation();
            this.handleIOSKeyboardIssues();
        });
    }

    setupNavigation() {
        const trackCard = document.getElementById('track-card');
        const albumContainer = document.getElementById('album-container');
        const lyricCard = document.getElementById('lyric-card');
        const meetContainer = document.getElementById('meet-container');
        const profileContainer = document.getElementById('profile-container');
        const navbar = document.querySelector('.navbar');
        const searchBar = document.querySelector('.search-bar-container');

        const hideAllSections = () => {
            trackCard.style.display = 'none';
            albumContainer.style.display = 'none';
            lyricCard.style.display = 'none';
            meetContainer.style.display = 'none';
            profileContainer.style.display = 'none';
        };

        navbar.style.display = 'flex';
        searchBar.style.display = 'flex';

        let clearActiveClass = () => {
            const buttons = navbar.querySelectorAll('button');
            buttons.forEach((button) => {
                button.classList.remove('active');
                button.style.color = '#5C4A1D';
            });
        };

        let setActiveButton = (button) => {
            clearActiveClass();
            button.classList.add('active');
            button.style.color = 'white';
        };

        document.getElementById('main-home').addEventListener('click', () => {
            hideAllSections();
            albumContainer.style.display = 'flex';
            setActiveButton(document.getElementById('main-home'));
        });

        document.getElementById('song').addEventListener('click', () => {
            hideAllSections();
            this.actionSongButtonClick();
            trackCard.style.display = 'block';
            setActiveButton(document.getElementById('song'));
        });

        document.getElementById('meet').addEventListener('click', () => {
            hideAllSections();
            meetContainer.style.display = 'block';
            setActiveButton(document.getElementById('meet'));
        });

        document.getElementById('profile').addEventListener('click', () => {
            hideAllSections();
            profileContainer.style.display = 'block';
            setActiveButton(document.getElementById('profile'));
        });

        document.getElementById('lyric-home').addEventListener('click', () => {
            hideAllSections();
            trackCard.style.display = 'block';
            setActiveButton(document.getElementById('lyric-home'));
        });

        document.getElementById('lyric-song').addEventListener('click', () => {
            hideAllSections();
            lyricCard.style.display = 'none';
            trackCard.style.display = 'block';
            setActiveButton(document.getElementById('lyric-song'));
        });

        document.getElementById('track-home').addEventListener('click', () => {
            hideAllSections();
            albumContainer.style.display = 'flex';
            setActiveButton(document.getElementById('track-home'));
        });

        document.getElementById('search-icon').addEventListener('click', () => {
            app.searchManager.handleSearch();
        });
    }

  

    searchArtist(artistName, callback) {
        fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
            headers: { Authorization: `Bearer ${this.token}` },
        })
            .then((response) => response.json())
            .then((data) => callback(data.artists.items[0]?.id || null))
            .catch((err) => console.error('Error searching artist:', err));
    }

    actionSongButtonClick() {
        this.searchArtist('Taylor Swift', (artistId) => {
            if (artistId) {
                this.albumManager.getAlbums(artistId, (albums) => {
                    let allTracks = [];
                    let pending = albums.length;

                    albums.forEach((album) => {
                        this.trackManager.getTracks(album.id, (tracks) => {
                            tracks.forEach((track) => {
                                track.albumName = album.name;
                            });

                            allTracks.push(...tracks);
                            pending--;

                            if (pending === 0) {
                                allTracks.sort((a, b) => a.name.localeCompare(b.name));
                                this.trackManager.displayTracks(allTracks);
                            }
                        });
                    });
                });
            }
        });
    }
}


// Class 3: Query Function
class SearchManager {
    constructor(token) {
        this.token = token;
    }

    handleSearch() {
        let searchBox = document.getElementById('search-input'); // Get the search input field
        let searchedTrack = searchBox.value.trim().toLowerCase(); // Get the user's input and normalize it
        let trackCard = document.getElementById('track-card'); // Track card container
        let albumContainer = document.getElementById('album-container'); // Album container

        if (searchedTrack) {
            app.searchArtist('Taylor Swift', (artistId) => {
                if (artistId) {
                    app.albumManager.getAlbums(artistId, (albums) => {
                        let allTracks = [];
                        let pending = albums.length;

                        albums.forEach((album) => {
                            app.trackManager.getTracks(album.id, (tracks) => {
                                tracks.forEach((track) => {
                                    track.albumName = album.name;
                                    allTracks.push(track);
                                });

                                pending--;

                                if (pending === 0) {
                                    let matchingTracks = allTracks.filter((track) =>
                                        track.name.toLowerCase().includes(searchedTrack)
                                    );

                                    if (matchingTracks.length > 0) {
                                        app.trackManager.displayTracks(matchingTracks);
                                        trackCard.style.display = 'block';
                                        albumContainer.style.display = 'none';
                                    } else {
                                        alert('No matching tracks found.');
                                    }

                                    searchBox.value = ''; // Clear the search bar
                                }
                            });
                        });
                    });
                }
            });
        } else {
            alert('Please enter a track title to search.');
        }
    }
}

// Class 4: To Display  Album
class AlbumManager {
    constructor(token) {
        this.token = token;
    }
 
    getAlbums(artistId, callback) {
        fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=50`, {
            headers: { Authorization: `Bearer ${this.token}` }
        })
            .then((response) => response.json())
            .then((data) => callback(data.items || []))
            .catch((err) => console.error('Error fetching albums:', err));
    }

    displayAlbums(albums) {
        let albumContainer = document.getElementById('album-container');
        albumContainer.innerHTML = ''; // Clear previous content

        let filteredAlbums = albums.filter((album) => {
            let name = album.name.toLowerCase();
            return !(
                name.includes('live') ||
                name.includes('remix') ||
                name.includes('acoustic')
            );
        });

        filteredAlbums.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

        filteredAlbums.forEach((album) => {
            let card = document.createElement('div');
            card.classList.add('card');

            let albumImage = document.createElement('div');
            albumImage.classList.add('albumcard');
            albumImage.style.backgroundImage = `url(${album.images[0]?.url || ''})`;

            let albumName = document.createElement('h4');
            albumName.textContent = album.name;

            card.appendChild(albumImage);
            card.appendChild(albumName);

            card.onclick = () => {
                app.trackManager.getTracks(album.id, (tracks) => {
                    tracks.forEach((track) => {
                        track.albumName = album.name;
                    });
                    app.trackManager.displayTracks(tracks);
                });
            };

            albumContainer.appendChild(card);
        });
    }
}

//Class 5: To Display  Track & Lyric
class TrackManager {
    constructor(token) {
        this.token = token;
        this.currentAudio = null;
        this.setupNavbarListeners();
    }

    getTracks(albumId, callback) {
        fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            headers: { Authorization: `Bearer ${this.token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                // Process the tracks to get IDs and Names
                let tracksInfo = data.items.map(track => ({
                    id: track.id,
                    name: track.name
                }));
                callback(tracksInfo); // Pass the processed data to the callback
            })
            .catch((err) => {
                console.error('Failed to fetch tracks:', err);
            });
    }
    

    displayTracks(tracks) {
        let trackContainer = document.getElementById('track-card');
        trackContainer.innerHTML = '';
        trackContainer.style.display = 'block';
        document.getElementById('album-container').style.display = 'none';
    
        tracks.forEach((track) => {
            console.log(`Track ID: ${track.id}, Track Name: ${track.name}`); // Log the ID and name
    
            let trackItem = document.createElement('div');
            trackItem.classList.add('track-item');
    
            let trackTitle = document.createElement('div');
            trackTitle.textContent = track.name;
    
            let albumInfo = document.createElement('div');
            albumInfo.classList.add('album-name');
            albumInfo.textContent = `Album: ${track.albumName || 'Unknown'}`;
    
            let playButton = document.createElement('button');
            playButton.id = 'btn';
            playButton.textContent = 'Play Song';
            playButton.onclick = () => {
                this.playAudioTrack(track.id);
            };
    
            let stopButton = document.createElement('button');
            stopButton.id = 'btn';
            stopButton.textContent = 'Stop Song';
            stopButton.onclick = () => {
                this.stopAudio();
            };
    
            let lyricButton = document.createElement('button');
            lyricButton.id = 'btn';
            lyricButton.textContent = 'Show Lyric';
            lyricButton.onclick = () => {
                this.stopAudio();
                this.fetchAndDisplayLyrics(track.id);
            };
    
            trackItem.appendChild(trackTitle);
            trackItem.appendChild(albumInfo);
            trackItem.appendChild(playButton);
            trackItem.appendChild(stopButton);
            trackItem.appendChild(lyricButton);
    
            trackContainer.appendChild(trackItem);
        });
    }
    

    fetchAndDisplayLyrics(trackId) {
        fetch('songs.xml')
            .then((response) => response.text())
            .then((xmlString) => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(xmlString, 'application/xml');
                let trackElements = xmlDoc.getElementsByTagName('track');

                for (let track of trackElements) {
                    let trackIdElement = track.getElementsByTagName('track_id')[0];
                    if (trackIdElement && trackIdElement.textContent === trackId) {
                        let imageUrl = track.getElementsByTagName('lyric_content')[0]?.textContent;
                        this.displayLyrics(imageUrl, trackId);
                        return;
                    }
                }
                this.displayLyrics(null, trackId);
            })
            .catch((err) => {});
    }

    displayLyrics(imageUrl, trackId) {
        this.stopAudio();

        let lyricContainer = document.getElementById('lyric-card');
        lyricContainer.innerHTML = imageUrl
            ? `<img src="${imageUrl}" style="width: 100%">`
            : '<p>Lyric and Chord are in progress.</p>';
        lyricContainer.style.display = 'block';
        document.getElementById('track-card').style.display = 'none';

        let controls = document.createElement('div');
        controls.classList.add('lyric-controls');

        let playButton = document.createElement('button');
        playButton.id = 'btn';
        playButton.textContent = 'Play Song';
        playButton.onclick = () => {
            this.playAudioTrack(trackId, 'lyric-card');
        };

        let stopButton = document.createElement('button');
        stopButton.id = 'btn';
        stopButton.textContent = 'Stop Song';
        stopButton.onclick = () => {
            this.stopAudio();
        };

        controls.appendChild(playButton);
        controls.appendChild(stopButton);

        lyricContainer.appendChild(controls);
    }

    playAudioTrack(trackId, errorContainerId = 'track-card') {
        fetch('songs.xml')
            .then((response) => response.text())
            .then((xmlString) => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(xmlString, 'application/xml');
                let trackElements = xmlDoc.getElementsByTagName('track');

                for (let track of trackElements) {
                    let trackIdElement = track.getElementsByTagName('track_id')[0];
                    if (trackIdElement && trackIdElement.textContent === trackId) {
                        let audioPath = track.getElementsByTagName('audiotrack')[0]?.textContent;
                        if (audioPath) {
                            this.playAudio(audioPath);
                        } else {
                            this.displayErrorMessage("Audiotrack is unavailable for this song.", errorContainerId);
                        }
                        return;
                    }
                }
                this.displayErrorMessage("Track not found.", errorContainerId);
            })
            .catch((err) => {});
    }

    playAudio(audioPath) {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }

        this.currentAudio = new Audio(audioPath);
        this.currentAudio.play();

        this.currentAudio.onended = () => {
            this.currentAudio = null;
        };
    }

    stopAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
    }

    displayErrorMessage(message, containerId = 'track-card') {
        let container = document.getElementById(containerId);
        if (!container) return;

        let errorContainer = document.createElement('div');
        errorContainer.classList.add('error-popup');
        errorContainer.textContent = message;

        container.appendChild(errorContainer);

        setTimeout(() => {
            errorContainer.remove();
        }, 3000);
    }

    setupNavbarListeners() {
        let navbarButtons = document.querySelectorAll('.navbar button');
        navbarButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.stopAudio();
            });
        });
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}


// Instantiate and initialize the app
let app = new SpotifyApp();
app.init();
