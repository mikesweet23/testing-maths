// Caches the app so it works offline on site.
// TO RELEASE AN UPDATE: change VERSION here AND APP_VERSION in index.html to the same new value.
// Phones that have the app open will then show a "New version ready" banner.
const VERSION = "1.1.0";
const CACHE = "testing-maths-" + VERSION;
const FILES = ["./", "./index.html", "./questions.js", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // cache:"reload" skips the browser's HTTP cache so we always store the fresh files
    await c.addAll(FILES.map(f => new Request(f, {cache: "reload"})));
    // Versions before 1.1.0 had no update banner, so take over straight away from those
    const keys = await caches.keys();
    if (keys.some(k => /^testing-maths-v\d+$/.test(k))) self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith("testing-maths") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("message", e => {
  if (!e.data) return;
  if (e.data.type === "skipWaiting") self.skipWaiting();
  if (e.data.type === "version" && e.ports[0]) e.ports[0].postMessage(VERSION);
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.open(CACHE).then(c => c.match(e.request, {ignoreSearch: true}).then(hit => hit || fetch(e.request).then(res => {
    // Keep a copy of fonts and anything else fetched later, for offline use
    if (res && (res.ok || res.type === "opaque")) c.put(e.request, res.clone()).catch(() => {});
    return res;
  }).catch(() => e.request.mode === "navigate" ? c.match("./index.html") : Response.error()))));
});
