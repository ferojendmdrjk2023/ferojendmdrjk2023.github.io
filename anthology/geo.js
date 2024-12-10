class GeoManager {
    constructor() {
        this.map = null;
        this.selectedUser = null;
        this.dummyUsers = [
            { username: "user1 entrance", latitude: -6.18933, longitude: 106.823, is_online: 1 },
            { username: "user2 mac lab", latitude: -6.18952, longitude: 106.823, is_online: 1 },
            { username: "user3 pc lab", latitude: -6.18647, longitude: 106.827, is_online: 1 },
            { username: "user4 centralcommand", latitude: -6.18951, longitude: 106.823, is_online: 0 },
            { username: "user5 fashionlab", latitude: -6.18949, longitude: 106.823, is_online: 0 },
            { username: "user6 toilet lat", latitude: -6.1895, longitude: 106.823, is_online: 0 },
            { username: "user10 theresiachurch", latitude: -6.18864, longitude: 106.825, is_online: 1 },
        ];
        this.friendLocationAvailable = false; // Tracks if a friend's location is fetched
        this.initMap();
        this.initEventListeners();
    }

    initMap() {
        const mapContainer = document.getElementById("map");
    
        // Check if the map container is rendered properly
        if (!mapContainer || mapContainer.offsetWidth === 0 || mapContainer.offsetHeight === 0) {
            console.warn("Map container is not visible or has zero dimensions. Delaying initialization.");
            setTimeout(() => this.initMap(), 300); // Retry initialization after a delay
            return;
        }
    
        // Initialize the map only if it has not been initialized yet
        if (!this.map) {
            this.map = L.map("map").setView([-6.18933, 106.823], 15);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(this.map);
        } else {
            this.map.invalidateSize(); // Ensure the map resizes correctly
        }
    
        // Add markers for dummy users
        this.dummyUsers.forEach((user) => {
            const markerColor = user.is_online ? "red" : "grey";
            const marker = L.circleMarker([user.latitude, user.longitude], {
                color: markerColor,
                radius: 10,
            }).addTo(this.map);
    
            if (user.is_online) {
                marker.bindPopup(`${user.username} is online.`);
                marker.on("click", () => {
                    this.selectedUser = user.username;
                    alert(`Selected user: ${user.username}`);
                });
            } else {
                marker.bindPopup(`${user.username} is offline.`);
            }
        });
    
    }
    

    // Initialize button functionality
    initEventListeners() {
        document.getElementById("get-location-btn").addEventListener("click", () => this.getUserLocation());
        document.getElementById("get-friend-location-btn").addEventListener("click", () => this.getFriendLocation());
        document.getElementById("send-bracelet-btn").addEventListener("click", () => this.handleBraceletClick());
        this.initModalEventListeners();
    }

    // Get the user's current location and display it on the map
    getUserLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                L.marker([latitude, longitude])
                    .addTo(this.map)
                    .bindPopup("This is your location!")
                    .openPopup();

                this.map.setView([latitude, longitude], 15);
                document.getElementById("my-coordinates").textContent = `LAT: ${latitude.toFixed(
                    5
                )}, LNG: ${longitude.toFixed(5)}`;
            },
            (error) => {
                const errorMessages = {
                    1: "Permission denied. Please allow location access.",
                    2: "Position unavailable. Check your network or GPS settings.",
                    3: "Request timed out. Try again.",
                };
                alert(`Error fetching location: ${errorMessages[error.code] || "Unknown error."}`);
            }
        );
    }

    // Get a friend's location
    getFriendLocation() {
        const activeFriends = this.dummyUsers.filter((user) => user.is_online && user.username !== "user1 entrance");
        if (activeFriends.length > 0) {
            const randomFriend = activeFriends[Math.floor(Math.random() * activeFriends.length)];
            this.map.setView([randomFriend.latitude, randomFriend.longitude], 15);
            document.getElementById("friend-coordinates").textContent = `${randomFriend.username}, LAT: ${randomFriend.latitude.toFixed(
                5
            )}, LNG: ${randomFriend.longitude.toFixed(5)}`;
            this.friendLocationAvailable = true; // Set the flag to true when a friend's location is fetched
        } else {
            alert("No active friends found.");
            this.friendLocationAvailable = false;
        }
    }

    // Handle "Send Bracelet" button click
    handleBraceletClick() {
        if (this.friendLocationAvailable) {
            this.showBraceletModal();
        } else {
            this.showWarningModal("Please acquire a friend's location first before sending a bracelet.");
        }
    }

    // Show the bracelet modal
    showBraceletModal() {
        const modal = document.getElementById("bracelet-modal");
        const imageElement = document.getElementById("bracelet-image");
        imageElement.src = "media/bracellet.jpg"; // Set the correct image path
        modal.style.display = "flex";
    }

    // Show the warning modal
    showWarningModal(message) {
        const warningModal = document.getElementById("warning-modal");
        const warningMessage = document.getElementById("warning-message");
        warningMessage.innerText = message;
        warningModal.style.display = "flex";

        // Add an event listener to close the modal
        document.getElementById("warning-close-btn").addEventListener("click", () => {
            warningModal.style.display = "none";
        });
    }

    // Initialize modal event listeners
    initModalEventListeners() {
        const modal = document.getElementById("bracelet-modal");
        const confirmBtn = document.getElementById("confirm-send-btn");
        const cancelBtn = document.getElementById("cancel-send-btn");
        const responseModal = document.getElementById("response-modal");
        const responseMessage = document.getElementById("response-message");
        const closeResponseBtn = document.getElementById("close-response-btn");

        confirmBtn.addEventListener("click", () => {
            modal.style.display = "none";
            const videoPath = "media/friendshipbracelet.mp4";
            const videoPopup = window.open(videoPath, "_blank", "width=400,height=300");
            responseMessage.innerText = videoPopup ? "Bracelet sent successfully!" : "Failed to send bracelet.";
            responseModal.style.display = "flex";
        });

        cancelBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        closeResponseBtn.addEventListener("click", () => {
            responseModal.style.display = "none";
        });
    }

    // Show the Meet Page
    showMeetPage() {
        const meetContainer = document.getElementById("meet-container");
        meetContainer.style.display = "block";

        // Ensure the map resizes properly
        setTimeout(() => {
            if (this.map) {
                this.map.invalidateSize();
            }
        }, 300); // Delay to allow DOM to render the visible container
    }
}

// Instantiate the GeoManager
const geoManager = new GeoManager();
window.geoManager = geoManager; // Make globally accessible
