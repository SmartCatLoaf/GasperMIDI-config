const CACHE_NAME = "gaspermidi-cache-v1";
const urlsToCache = [
  "/GasperMIDI-config/index.html",
  "/GasperMIDI-config/style.css",
  "/GasperMIDI-config/script.js",
  "/GasperMIDI-config/manifest.json",
  "/GasperMIDI-config/icon-192x192.png",
  "/GasperMIDI-config/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
