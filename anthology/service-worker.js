const CACHE_NAME = 'anthology-pwa-v1';
const urlsToCache = [
    '/',
    'index.html',
    'styles.css',
    'app.js',
    'geo.js',
    'icon-192x192.png',
    'icon-512x512.png',
    'manifest.json'
];

// Install the service worker and cache essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate the service worker and remove old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch files from the cache first, then the network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return the cached file if found, otherwise fetch from the network
                return cachedResponse || fetch(event.request);
            })
    );
});
