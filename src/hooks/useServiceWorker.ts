import { useEffect } from 'react';
import { APP_CONFIG } from '../config/app-config';

/**
 * Hook to register and manage the service worker for PWA offline support.
 * Handles registration, update detection, and cleanup.
 */
export function useServiceWorker() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !APP_CONFIG.ui.enablePWA) return;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register(import.meta.env.BASE_URL + 'service-worker.js');
        console.log('[SW] Registered:', registration.scope);

        // Check for updates periodically (every 60 seconds)
        const updateInterval = setInterval(() => {
          registration.update().catch(() => {
            /* silently ignore update check failures */
          });
        }, 60_000);

        return () => clearInterval(updateInterval);
      } catch (error) {
        console.warn('[SW] Registration failed:', error);
      }
    };

    // Register after page load to avoid competing with initial resource fetches
    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', () => register(), { once: true });
    }
  }, []);
}
