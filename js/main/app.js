
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./sw.js')
           .then(function(registration) {
              console.log('Service Worker Registered', registration); 
          }).catch(function(error){
            console.log("registration failed", error);
          });
}
