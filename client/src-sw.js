const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// Cache CSS, JavaScript, and images with a CacheFirst strategy
registerRoute(
  // filter requests we want to cache (styles, scripts, and images)
  ({ request }) => request.destination == 'style' ||
                   request.destination == 'script' ||
                   request. destination == 'image',
  // Use CacheFirst strategy for these requests
  new CacheFirst({
    statuses: [0, 200],
  }),
  new ExpirationPlugin({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        // keep assets for 30 days
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // limit the number of entries in the cahce
        maxEntries: 60,
      }),
    ],
    }),
);
