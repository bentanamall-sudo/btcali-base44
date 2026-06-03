import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// DO NOT prewarm all videos at boot — that floods network with 14 concurrent
// video streams and causes severe lag. Thumbnails are extracted on-demand,
// staggered via the queue in thumbCache.js.

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)