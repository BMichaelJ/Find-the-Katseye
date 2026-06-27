const CACHE_NAME = "find-the-katseye-v1";
const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.webmanifest",
  "./assets/app-icon.svg",
  "./assets/katseye-members.jpg",
  "./assets/sophia.jpg",
  "./assets/megan.jpg",
  "./assets/manon.jpg",
  "./assets/daniela.jpg",
  "./assets/lara.jpg",
  "./assets/yoonchae.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
