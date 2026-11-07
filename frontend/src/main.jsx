import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider} from "@clerk/react"

createRoot(document.getElementById('root')).render(
  <StrictMode> {/* helps find potential bugs and problems in their application during development */}

    <ClerkProvider>
      <App />
    </ClerkProvider>
    
  </StrictMode>,
)
