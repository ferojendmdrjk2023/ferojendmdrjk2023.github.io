class GeoManager {
    constructor() {
        this.backendUrl = 'http://localhost:3000'; // Backend URL
        this.initEventListeners(); // Initialize event listeners
    }

    // Initialize event listeners
    initEventListeners() {
        // Listen for the profile form submission
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (event) => this.handleProfileFormSubmit(event));
        }
    }

    // Show Meet Page
    showMeetPage() {
        const meetContainer = document.getElementById('meet-container');
        const profileContainer = document.getElementById('profile-container');

        // Hide the profile container
        profileContainer.style.display = 'none';

        // Show the meet container
        meetContainer.style.display = 'block';
        meetContainer.innerHTML = '<p>Fetching location and nearby fans...</p>';

        // Fetch location and nearby fans
        this.getUserLocation(({ latitude, longitude }) => {
            this.sendLocation('testuser', latitude, longitude).then(() => {
                this.fetchNearbyUsers(latitude, longitude, 5, (users) => {
                    meetContainer.innerHTML = ''; // Clear loading message

                    if (users.length === 0) {
                        meetContainer.innerHTML = '<p>No nearby fans found.</p>';
                    } else {
                        const title = document.createElement('h3');
                        title.textContent = 'Nearby Fans';
                        meetContainer.appendChild(title);

                        users.forEach((user) => {
                            const userElement = document.createElement('p');
                            userElement.textContent = `${user.username} is ${user.distance.toFixed(
                                2
                            )} km away.`;
                            meetContainer.appendChild(userElement);
                        });
                    }
                });
            });
        });
    }

    // Show Profile Page
    showProfilePage() {
        const profileContainer = document.getElementById('profile-container');
        const meetContainer = document.getElementById('meet-container');

        // Hide the meet container
        meetContainer.style.display = 'none';

        // Show the profile container
        profileContainer.style.display = 'block';

        console.log('Profile container displayed'); // Debugging log

        // Fetch and populate profile data
        fetch(`${this.backendUrl}/profile?username=testuser`) // Replace 'testuser' with actual username
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                return response.json();
            })
            .then((profile) => {
                document.getElementById('id').value = profile.id;
                document.getElementById('username').value = profile.username;
                document.getElementById('latitude').value = profile.latitude;
                document.getElementById('longitude').value = profile.longitude;
                document.getElementById('is_online').value = profile.is_online ? '1' : '0';
                document.getElementById('socket_id').value = profile.socket_id;

                console.log('Profile form populated:', profile); // Debugging log
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
                alert('Unable to load profile. Please try again later.');
            });
    }

    // Handle Profile Form Submission
    handleProfileFormSubmit(event) {
        event.preventDefault();

        const formData = {
            id: document.getElementById('id').value,
            username: document.getElementById('username').value,
            latitude: parseFloat(document.getElementById('latitude').value),
            longitude: parseFloat(document.getElementById('longitude').value),
            is_online: parseInt(document.getElementById('is_online').value),
            socket_id: document.getElementById('socket_id').value,
        };

        fetch(`${this.backendUrl}/update-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update profile');
                }
                return response.text();
            })
            .then((message) => {
                alert('Profile updated successfully: ' + message);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
                alert('Error updating profile. Please try again.');
            });
    }

    // Get user's location using Geolocation API
    getUserLocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    callback({ latitude, longitude });
                },
                (error) => {
                    alert('Error fetching location: ' + error.message);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    // Send user's location to the backend
    sendLocation(username, latitude, longitude) {
        return fetch(`${this.backendUrl}/update-location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                latitude,
                longitude,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update location');
                }
                return response.text();
            })
            .then((data) => {
                console.log('Location updated:', data);
            })
            .catch((error) => {
                console.error('Error updating location:', error);
            });
    }

    // Fetch nearby users from the backend
    fetchNearbyUsers(latitude, longitude, radius = 5, callback) {
        fetch(
            `${this.backendUrl}/nearby-users?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch nearby users');
                }
                return response.json();
            })
            .then((users) => {
                callback(users);
            })
            .catch((error) => {
                console.error('Error fetching nearby users:', error);
                callback([]);
            });
    }
}

// Instantiate and initialize the GeoManager
const geoManager = new GeoManager();
window.geoManager = geoManager; // Make it globally accessible
