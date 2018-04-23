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