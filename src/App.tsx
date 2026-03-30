import * as React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useServiceWorker } from './hooks/useServiceWorker';
import { useFullscreen } from './hooks/useFullscreen';

/**
 * Root application component.
 * Registers service worker for PWA offline support,
 * requests fullscreen on mobile, and renders the router.
 */
export default function App() {
  // PWA service worker registration
  useServiceWorker();

  // Fullscreen on first user interaction
  useFullscreen();

  return <RouterProvider router={router} />;
}
