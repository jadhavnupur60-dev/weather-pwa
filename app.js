// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker Registered!', reg))
      .catch(err => console.error('Service Worker Registration Failed:', err));
  });
}

// Weather Fetching Logic
document.getElementById('get-weather-btn').addEventListener('click', getWeather);

async function getWeather() {
  const tempEl = document.getElementById('temp');
  const condEl = document.getElementById('condition');
  
  // Example API call (using Open-Meteo public API)
  const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true';

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    tempEl.textContent = `Temperature: ${data.current_weather.temperature}°C`;
    condEl.textContent = `Windspeed: ${data.current_weather.windspeed} km/h`;
  } catch (error) {
    tempEl.textContent = "Offline Mode - Unable to fetch fresh data.";
    condEl.textContent = "Check cached response if available.";
  }
}

// Handle Custom Install Prompt
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
    installBtn.style.display = 'none';
  }
});