//import idb from 'idb'; 
//const idb = require('idb');
let restaurantsJSON,
 request,
 objectStore,
 tx;

const dbName = "dbRestaurant-static";
const URL = `http://localhost:1337/restaurants`;
const opt = {credentials: 'include'};
var db;


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

 request.onerror = (event) => {
  // Handle errors.
};


 request.onsuccess = (event) => {
  // DoSomething
  db = request.result;
  console.log('Print open db', db);
};

    
  request.onupgradeneeded = function(event) { 
    // Save the IDBDatabase interface 
    var db = event.target.result;
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
  
  

  let dataStore= [];
  /*
  let  objectStore = db.transaction("restaurants").objectStore("restaurants");
  var tx = db.transaction('restaurants');
  var peopleStore = tx.objectStore('restaurants');
  var idIndex = peopleStore.index('id');


  console.log('Retrieved from IndexDb', idIndex.getAll());

  restaurants = restaurants.push(idIndex.getAll())

  */
 // objectStore = db.transaction("restaurants").objectStore("restaurants");
 function retrieveAll(){
  var objectStore = db.transaction("restaurants").objectStore("restaurants");
  objectStore.openCursor().onsuccess = (event) =>{
    let cursor = event.target.result;
    if (cursor) {
      dataStore.push(cursor.value);
      cursor.continue();
    }
    else {
     console.log ('All restaurants ', restaurants);
    }
  };

 }
 /* 
let  index = objectStore.index("id");
index.openKeyCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key is a name, like "Bill", and cursor.value is the SSN.
    // No way to directly get the rest of the stored object
    cursor.continue();
  }
};
*/