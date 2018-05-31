//import idb from 'idb'; 
//const idb = require('idb');
let restaurantsJSON,
 request,
 db,
 objectStore,
 tx;

const dbName = "dbRestaurant-static";
const URL = `http://localhost:1337/restaurants`;
const opt = {credentials: 'include'};


/*
const dbPromise = idb.open('restaurants', 1, upgradeDB => {
    upgradeDB.createObjectStore('keyval');
  });


*/
fetch(URL,opt)
.then(response => response.json())
.then(json => {
  restaurantsJSON = json;
  console.log('Sw JSON response',restaurantsJSON);
  
})
.catch((error) => {
  console.log('There has been a problem with your fetch operation: ', error.message);
  
});

  
 request = indexedDB.open(dbName, 1);

    
  request.onupgradeneeded = function(e) { 
    // Save the IDBDatabase interface 
    db = e.target.result;
  
    // Create an objectStore for this database
    objectStore = db.createObjectStore("restaurants", { keyPath: "id" });
   // var objectStore = db.createObjectStore("restaurants");
  
    // Each restaurant has unique id.
    objectStore.createIndex("id", "id", { unique: true });
  
    objectStore.transaction.oncomplete = (event)=>{
      // Store values in the newly created objectStore.
      // tx 'transaction'
      tx = db.transaction("restaurants", "readwrite");
      let restaurantObjectStore = tx.objectStore("restaurants");
      restaurantsJSON.forEach((restaurant) => {
        restaurantObjectStore.add(restaurant);
      });
    };
  };
  
  request.onerror = (e) => {
    // Handle errors.
  };

  request.onsuccess = (event) => {
    // DoSomething
  };