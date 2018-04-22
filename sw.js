var CACHE_VERSION = 'restaurant-static-v1';
const map_api= "https://maps.googleapis.com/maps/api/js?";
var map_key = 'key=AIzaSyDPhBhJsIqInLRWlHuiZMaALays85wvahY&libraries=places&callback=initMap'
var map_link = map_api + search_map;
var key_restaurant = "key=AIzaSyDPhBhJsIqInLRWlHuiZMaALays85wvahY&libraries=places&callback=initMap";
var map_restaurant = map_api + key_restaurant;

var CACHE_FILES = [
          '/',
          '/index.html',
          '/restaurant.html',
          '/js/main/app.js',
          '/data/restaurants.json',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/css/styles.css',
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


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(res){
            if(res){
                return res;
            }
            requestBackend(event);
        })
    )
});

function requestBackend(event){
    var url = event.request.clone();
    return fetch(url).then(function(res){
        //if not a valid response send the error
        if(!res || res.status !== 200 || res.type !== 'basic'){
            return res;
        }

        var response = res.clone();

        caches.open(CACHE_VERSION).then(function(cache){
            cache.put(event.request, response);
        });

        return res;
    })
}