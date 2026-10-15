import {StrictMode, lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { findLandingPage } from './data/landingPages';

const LandingPage = lazy(() => import('./landing/LandingPage'));
const App = lazy(() => import('./App'));
const landingPage = findLandingPage(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div role="status" className="min-h-screen grid place-items-center bg-[#08090d] text-white">Loading PureTech…</div>}>
      {landingPage ? <LandingPage page={landingPage} /> : <App />}
    </Suspense>
  </StrictMode>,
);
