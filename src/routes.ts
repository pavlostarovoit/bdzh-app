import { createBrowserRouter } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';

/**
 * Application routes using React Router Data mode.
 * Single-page app with MainLayout as the root and Dashboard as the index route.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
    ],
  },
], { basename: '/bdzh-app' });
