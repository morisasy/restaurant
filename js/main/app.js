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

