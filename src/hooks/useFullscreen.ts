import { useEffect } from 'react';
import { APP_CONFIG } from '../config/app-config';

/**
 * Hook to request fullscreen mode on first user interaction.
 * Only activates when enabled in app config.
 */
export function useFullscreen() {
  useEffect(() => {
    if (!APP_CONFIG.ui.enableFullscreen) return;

    const requestFullscreen = () => {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {
          /* user gesture required or already fullscreen */
        });
      }
    };

    // Trigger on first user interaction
    document.addEventListener('click', requestFullscreen, { once: true });
    document.addEventListener('touchstart', requestFullscreen, { once: true });

    return () => {
      document.removeEventListener('click', requestFullscreen);
      document.removeEventListener('touchstart', requestFullscreen);
    };
  }, []);
}
