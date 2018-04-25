if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(function() {
    // registration worked
    console.log('Registration succeeded.');
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

/**
 
if (!('serviceWorker' in navigator)) {
  console.log('Service worker not supported');
  return;
}
navigator.serviceWorker.register('service-worker.js')
      .then(function() {
        console.log('Registered');
      })
      .catch(function(error) {
        console.log('Registration failed:', error);
      });

 */

