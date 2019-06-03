var CACHE_NAME = "v1";
var urlsToCache = [
  "/",
  "index.html",
  "favicon.ico",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.css",
  "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.1.0/leaflet.css",
  "https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.css",
  "https://fonts.googleapis.com/css?family=Roboto:100,300,400,400i,500,500i,700,900"
];

self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        // At this point everything has been cached
        return self.skipWaiting();
      })
  );
});

// self.addEventListener("activate", function(event) {
//   // Calling claim() to force a "controllerchange" event on navigator.serviceWorker
//   event.waitUntil(self.clients.claim());
// });

// self.addEventListener("activate", function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames
//           .filter(function(cacheName) {
//             // Return true if you want to remove this cache,
//             // but remember that caches are shared across
//             // the whole origin
//             console.log("cacheName", cacheName);
//           })
//           .map(function(cacheName) {
//             return caches.delete(cacheName);
//           })
//       );
//     })
//   );
// });

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          console.log("activate key", key);
          if (CACHE_NAME != key) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("message", function(event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
  setTimeout(function() {
    location.reload();
  }, 1000);
});

self.addEventListener("fetch", function(event) {
  if (event.request.url.indexOf("/api/") > -1) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
