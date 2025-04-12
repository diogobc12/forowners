import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styles.css'
import { LanguageProvider } from './contexts/LanguageContext'

// Use lazy loading for the main App component
const App = lazy(() => import('./App.tsx'))

// Simple loading component
const Loading = () => <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </LanguageProvider>
  </React.StrictMode>,
)
