import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PageRouter from './app/PageRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageRouter />
  </StrictMode>,
)
