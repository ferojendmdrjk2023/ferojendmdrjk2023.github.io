// Class 1: Token Management and Spotify Authentication
class SpotifyAuth {
    constructor() {
        this.clientId = '0c2a546b20e44c768140cc04e1b78b3b';
        this.clientSecret = '693050025139429ea496f805c189b94d';
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

class SpotifyApp {
    constructor() {
        this.auth = new SpotifyAuth(); // Instance of SpotifyAuth to handle token
        this.token = null; // Token is globally stored here
        this.albumManager = null; // Placeholder for AlbumManager instance
        this.trackManager = null; // Placeholder for TrackManager instance
        this.searchManager = null; // Placeholder for SearchManager instance
    }

    init() {
        this.auth.loadToken((token) => {
            this.token = token; // Set the token globally for the app
            this.albumManager = new AlbumManager(this.token); // Pass token to AlbumManager
            this.trackManager = new TrackManager(this.token); // Pass token to TrackManager
            this.searchManager = new SearchManager(this.token); // Pass token to SearchManager

            // Initialize album display for Taylor Swift
            this.searchArtist('Taylor Swift', (artistId) => {
                if (artistId) {
                    this.albumManager.getAlbums(artistId, (albums) => {
                        this.albumManager.displayAlbums(albums);
                    });
                }
            });

            // Setup navigation buttons
            this.setupNavigation();
        });
    }

    setupNavigation() {
        let trackCard = document.getElementById('track-card');
        let albumContainer = document.getElementById('album-container');
        let lyricCard = document.getElementById('lyric-card');

        document.getElementById('main-home').onclick = () => {
            lyricCard.style.display = 'none';
            trackCard.style.display = 'none';
            albumContainer.style.display = 'flex';
        };

        document.getElementById('lyric-home').onclick = () => {
            lyricCard.style.display = 'none';
            trackCard.style.display = 'block';
        };

        document.getElementById('lyric-song').onclick = () => {
            lyricCard.style.display = 'none';
            trackCard.style.display = 'block';
        };

        document.getElementById('track-home').onclick = () => {
            trackCard.style.display = 'none';
            albumContainer.style.display = 'flex';
        };

        document.getElementById('song').addEventListener('click', () => {
            this.actionSongButtonClick();
        });

        document.getElementById('search-icon').addEventListener('click', () => {
            this.searchManager.handleSearch();
        });
    }

    searchArtist(artistName, callback) {
        fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
            headers: { Authorization: `Bearer ${this.token}` }
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

// Search Manager Class
class SearchManager {
    constructor(token) {
        this.token = token;
    }

    handleSearch() {
        const searchBox = document.getElementById('search-input'); // Get the search input field
        const searchedTrack = searchBox.value.trim().toLowerCase(); // Get the user's input and normalize it
        const trackCard = document.getElementById('track-card'); // Track card container
        const albumContainer = document.getElementById('album-container'); // Album container

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
                                    const matchingTracks = allTracks.filter((track) =>
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




// Class 2: Handle Album Display
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

        const filteredAlbums = albums.filter((album) => {
            const name = album.name.toLowerCase();
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

// Class: TrackManager and methods remain unchanged from the initial fixed version

// Instantiate and initialize the app
const app = new SpotifyApp();
app.init();
