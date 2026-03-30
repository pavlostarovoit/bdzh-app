/**
 * Service Worker for Thrust Monitor PWA
 *
 * Strategy:
 * - Pre-caches the app shell (HTML) on install
 * - Runtime-caches static assets (JS, CSS, fonts, images) with network-first fallback
 * - Never caches API requests to 192.168.4.1 (real-time data)
 * - Caches Google Fonts woff2 files for offline font rendering
 */
const CACHE_NAME = 'thrust-monitor-v3';
const BASE = '/bdzh-app/';

// App shell resources to pre-cache on install
const PRECACHE_URLS = [
  BASE,
  BASE + 'index.html',
  // Font files for offline use
  'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIFsdP3pBms.woff2',
  'https://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2',
  'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFsdP3pBms.woff2',
];

// Install: pre-cache app shell resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .catch((error) => {
        console.error('[SW] Pre-cache failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate: clean up old caches and take control of all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Helper: should this request be cached?
function isCacheableRequest(url) {
  if (url.includes('192.168.4.1')) return false;
  if (url.includes('localhost') ||
      url.includes('127.0.0.1') ||
      url.includes('@vite') ||
      url.includes('?') ||
      url.endsWith('.tsx') ||
      url.endsWith('.ts')) {
    return false;
  }
  return true;
}

// Helper: is this a static asset that should be runtime-cached?
function isStaticAsset(url) {
  return (
    url.endsWith('.js') ||
    url.endsWith('.css') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.svg') ||
    url.endsWith('.html') ||
    url.endsWith('.woff2') ||
    url.endsWith('.woff') ||
    url.includes('fonts.gstatic.com') ||
    url.includes('fonts.googleapis.com')
  );
}

// Fetch: network-first with cache fallback for static assets
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  if (!isCacheableRequest(url)) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then((cached) => cached || caches.match(BASE));
        })
    );
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});
