import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ROUTER } from './routing/router.jsx';

import './styles/index.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ROUTER} />
  </StrictMode>,
);
