import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Fixed import syntax
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App /> {/* Fixed component casing */}
  </BrowserRouter>
)