const CACHE_NAME = "gaspermidi-cache-v1";
const urlsToCache = [
  "/GasperMIDI-config//index.html",
  "/GasperMIDI-config//style.css",
  "/GasperMIDI-config//script.js",
  "/GasperMIDI-config//manifest.json",
  "/GasperMIDI-config//icon-192x192.png",
  "/GasperMIDI-config//icon-512x512.png",
];

// install event
self.addEventListener("install", (evt) => {
  console.log("service worker installed");
});

// activate event
self.addEventListener("activate", (evt) => {
  console.log("service worker activated");
});

// fetch event
self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt);
});
