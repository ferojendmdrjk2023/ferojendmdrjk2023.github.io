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
        this.friendLocationAvailable = false;
        this.initMap();
        this.initEventListeners();
    }

    initMap() {
        let mapContainer = document.getElementById("map");

        if (!mapContainer || mapContainer.offsetWidth === 0 || mapContainer.offsetHeight === 0) {
            setTimeout(() => this.initMap(), 300);
            return;
        }

        if (!this.map) {
            this.map = L.map("map").setView([-6.18933, 106.823], 15);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(this.map);
        } else {
            this.map.invalidateSize(); 
        }

        this.dummyUsers.forEach((user) => {
            let markerColor = user.is_online ? "red" : "grey";
            let marker = L.circleMarker([user.latitude, user.longitude], {
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

    initEventListeners() {
        document.getElementById("get-location-btn").addEventListener("click", () => this.getUserLocation());
        document.getElementById("get-friend-location-btn").addEventListener("click", () => this.getFriendLocation());
        document.getElementById("send-bracelet-btn").addEventListener("click", () => this.handleBraceletClick());
        this.initModalEventListeners();
    }

    getUserLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let { latitude, longitude } = position.coords;
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
                let errorMessages = {
                    1: "Permission denied. Please allow location access.",
                    2: "Position unavailable. Check your network or GPS settings.",
                    3: "Request timed out. Try again.",
                };
                alert(`Error fetching location: ${errorMessages[error.code] || "Unknown error."}`);
            }
        );
    }

    getFriendLocation() {
        let activeFriends = this.dummyUsers.filter((user) => user.is_online && user.username !== "user1 entrance");
        if (activeFriends.length > 0) {
            let randomFriend = activeFriends[Math.floor(Math.random() * activeFriends.length)];
            this.map.setView([randomFriend.latitude, randomFriend.longitude], 15);
            document.getElementById("friend-coordinates").textContent = `${randomFriend.username}, LAT: ${randomFriend.latitude.toFixed(
                5
            )}, LNG: ${randomFriend.longitude.toFixed(5)}`;
            this.friendLocationAvailable = true;
        } else {
            alert("No active friends found.");
            this.friendLocationAvailable = false;
        }
    }

    handleBraceletClick() {
        if (this.friendLocationAvailable) {
            this.showBraceletModal();
        } else {
            this.showWarningModal("Please acquire a friend's location first before sending a bracelet.");
        }
    }

    showBraceletModal() {
        let modal = document.getElementById("bracelet-modal");
        let imageElement = document.getElementById("bracelet-image");
        imageElement.src = "media/bracellet.jpg";
        modal.style.display = "flex";
    }

    showWarningModal(message) {
        let warningModal = document.getElementById("warning-modal");
        let warningMessage = document.getElementById("warning-message");
        warningMessage.innerText = message;
        warningModal.style.display = "flex";

        let closeBtn = document.getElementById("warning-close-btn");
        closeBtn.addEventListener("click", () => {
            warningModal.style.display = "none";
        });
    }

    initModalEventListeners() {
        let modal = document.getElementById("bracelet-modal");
        let confirmBtn = document.getElementById("confirm-send-btn");
        let cancelBtn = document.getElementById("cancel-send-btn");
        let responseModal = document.getElementById("response-modal");
        let responseMessage = document.getElementById("response-message");
        let closeResponseBtn = document.getElementById("close-response-btn");

        confirmBtn.addEventListener("click", () => {
            modal.style.display = "none";

            let braceletSent = true;

            if (braceletSent) {
                responseMessage.innerText = "Bracelet sent successfully!";
                responseModal.style.display = "flex";
            } else {
                responseMessage.innerText = "Failed to send bracelet.";
                responseModal.style.display = "flex";
            }
        });

        cancelBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        closeResponseBtn.addEventListener("click", () => {
            responseModal.style.display = "none";
        });
    }

    showMeetPage() {
        let meetContainer = document.getElementById("meet-container");
        meetContainer.style.display = "block";

        setTimeout(() => {
            if (this.map) {
                this.map.invalidateSize();
            }
        }, 300);
    }
}

let geoManager = new GeoManager();
window.geoManager = geoManager;
