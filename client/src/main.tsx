import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { BrowserRouter } from 'react-router-dom'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PrimeReactProvider>
)
