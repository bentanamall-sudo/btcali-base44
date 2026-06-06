import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Unregister any stale service workers that could serve cached stale JS
// (causes "Cannot read properties of null (reading 'useState')" in dev)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(r => r.unregister());
  });
}

// DO NOT prewarm all videos at boot — that floods network with 14 concurrent
// video streams and causes severe lag. Thumbnails are extracted on-demand,
// staggered via the queue in thumbCache.js.

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)