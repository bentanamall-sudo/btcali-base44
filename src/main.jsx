import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { prewarm } from '@/lib/thumbCache'
import { RESULTS_VIDEOS } from '@/pages/ProvenResults'

// Start capturing thumbnails for ALL result videos immediately on app boot.
// By the time the user navigates to /results or sees the homepage carousel,
// most thumbnails will already be cached in memory.
prewarm(RESULTS_VIDEOS.map(v => v.src))

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)