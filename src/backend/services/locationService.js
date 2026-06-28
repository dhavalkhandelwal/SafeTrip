export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toISOString(),
        });
      },
      (error) => {
        // Provide a fallback location (Delhi) for demo
        console.warn('Geolocation error, using fallback:', error.message);
        resolve({
          lat: 28.6139,
          lng: 77.2090,
          accuracy: null,
          timestamp: new Date().toISOString(),
          fallback: true,
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
}
