import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Navbar from './components/layout/Navbar.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Navbar/>
    <App />
    </BrowserRouter>
  
)
