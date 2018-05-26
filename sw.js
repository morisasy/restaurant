var CACHE_VERSION = 'restaurant-static-v1';
const dbName = "dbRestaurant-static";

var CACHE_URLS = [
          '/',
          '/index.html',
          '/restaurant.html',
          '/js/main/app.js',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/css/styles.css',
          '/data/restaurants.json',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg'
];
///**
// This is what our customer data looks like.
const restaurantData = [
  { id: 1, name: "Bill", age: 35, email: "bill@company.com" },
  { id: 2, name: "Donna", age: 32, email: "donna@home.org" }
];
 //*/
 function  dataRestaurant (callback){
  DBHelper.fetchRestaurants((error, restaurants)=>{
    if (error) {
      throw Error(error.message);
     
    } else {
      console.log('Service Worker', restaurants);
     return restaurants; 
    }
   })

 }
  

var request = indexedDB.open(dbName, 1);
/** 
var request = indexedDB.open('dbRestaurants', 1, function(upgradeDB) {
  var keyValStore = upgradeDB.createObjectStore('restaurants',{keyPath: 'name'});
      keyValStore.put('Hello', 'World');
});
*/
request.onupgradeneeded = function(event) { 
  console.log('restaurantsData from Server', dataRestaurant);
  // Save the IDBDatabase interface 
  var db = event.target.result;

  // Create an objectStore for this database
  var objectStore = db.createObjectStore("restaurants", { keyPath: "id" });

  // Each restaurant has unique id.
  objectStore.createIndex("id", "id", { unique: true });

  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var transaction = db.transaction("restaurants", "readwrite");
    var restaurantObjectStore = transaction.objectStore("restaurants");
    restaurantData.forEach(function(restaurant) {
      restaurantObjectStore.add(restaurant);
    });
  };
};
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_URLS);
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('restaurant-') &&
                   cacheName != CACHE_VERSION;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

  self.addEventListener('fetch', function(event) {
 
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });

 