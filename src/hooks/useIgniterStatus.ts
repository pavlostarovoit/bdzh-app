import { useState, useEffect, useRef } from 'react';
import { APP_CONFIG } from '../config/app-config';

/**
 * Custom hook to monitor igniter status during state 0
 * - Polls /igniterStatus every 1 second when active
 * - If 200 response: igniter is ON, returns seconds remaining
 * - If 503 response: igniter is OFF, switches to 5 second polling
 */
export function useIgniterStatus(state: string) {
  const [igniterStatus, setIgniterStatus] = useState<'ON' | 'OFF'>('ON');
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [pollingInterval, setPollingInterval] = useState(1000); // Start with 1 second
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Only monitor during state 0
    if (state !== '0') {
      // Reset to defaults when not in state 0
      setIgniterStatus('ON');
      setSecondsRemaining(null);
      setPollingInterval(1000);
      
      // Clear any existing interval
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Function to check igniter status
    const checkIgniterStatus = async () => {
      try {
        const baseUrl = APP_CONFIG.server.url.replace('/mesData', '');
        const response = await fetch(`${baseUrl}/igniterStatus`, {
          method: 'GET',
          signal: AbortSignal.timeout(APP_CONFIG.server.timeout),
        });

        if (response.status === 200) {
          setIgniterStatus('ON');
          // Keep polling at 1 second if we're currently at 1 second
          // or switch back to 1 second if we were at 5 seconds
          if (pollingInterval !== 1000) {
            setPollingInterval(1000);
          }
          // Parse the response body to get seconds remaining (sent as plain text number)
          const textData = await response.text();
          const seconds = parseInt(textData.trim(), 10);
          if (!isNaN(seconds)) {
            setSecondsRemaining(seconds);
          }
        } else if (response.status === 503) {
          setIgniterStatus('OFF');
          setSecondsRemaining(null);
          // Switch to 5 second polling
          if (pollingInterval !== 5000) {
            setPollingInterval(5000);
          }
        }
      } catch (error) {
        // Silently handle errors - expected when server is unavailable or not in state 0
        // Status will remain at last known value
      }
    };

    // Initial check
    checkIgniterStatus();

    // Set up polling interval
    intervalRef.current = window.setInterval(checkIgniterStatus, pollingInterval);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state, pollingInterval]);

  return { igniterStatus, secondsRemaining };
}