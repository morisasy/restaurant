//import idb from 'idb';
//const idb = require('idb');
var restaurantsJSON;

const dbName = "dbRestaurant-static";
const URL = `http://localhost:1337/restaurants`;

   const opt = {credentials: 'include'
   };


/*
const dbPromise = idb.open('restaurants', 1, upgradeDB => {
    upgradeDB.createObjectStore('keyval');
  });


*/
fetch(URL,opt)
.then(response => response.json())
.then(json => {
  restaurantsJSON = json;
  console.log('Sw JSON response', json);
  
})
.catch((error) => {
  console.log('There has been a problem with your fetch operation: ', error.message);
  
});

// This is what our customer data looks like.
const restaurantData = [
    { id: 1, name: "Bill", age: 35, email: "bill@company.com" },
    { id: 2, name: "Donna", age: 32, email: "donna@home.org" }
  ];
   
  
  var request = indexedDB.open(dbName, 1);
   
    
  request.onupgradeneeded = function(event) { 
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
      restaurantsJSON.forEach(function(restaurant) {
        restaurantObjectStore.add(restaurant);
      });
    };
  };
