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
  console.log("Error: Couldn't open database ...");
};


 request.onsuccess = (event) => {
   db = request.result;
  console.log('Success: db opened');
};

    
  request.onupgradeneeded = function(event) { 
   
    var db = event.target.result;
    // Create an objectStore for this database
    if(!db.objectStoreNames.contains('restaurants')){
      objectStore = db.createObjectStore("restaurants", { keyPath: "id" });
    }
    //objectStore = db.createObjectStore("restaurants", { keyPath: "id" });
   // var objectStore = db.createObjectStore("restaurants");
  
    // Each restaurant has unique id.
    objectStore.createIndex("id", "id", { unique: true });
  
    objectStore.transaction.oncomplete = (event)=>{
     
      tx = db.transaction("restaurants", "readwrite");
      let restaurantObjectStore = tx.objectStore("restaurants");
      restaurantsJSON.forEach((restaurant) => {
        restaurantObjectStore.add(restaurant);
      });
    };
  };
  
  

  let dataStore= [];
  
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