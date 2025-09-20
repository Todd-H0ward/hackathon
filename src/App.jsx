import { Outlet } from 'react-router';
import ErrorBoundary from './components/layouts/ErrorBoundary';
import RootLayout from './components/layouts/RootLayout/RootLayout.jsx';
import { StoreProvider } from './components/providers/StoreProvider.jsx';
import { SocketProvider } from '@/components/providers/SocketProvider.jsx';

import StyleProvider from './components/providers/StyleProvider.jsx';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'leaflet/dist/leaflet.css';

const App = () => {
  return (
    <StoreProvider>
      <StyleProvider>
        <SocketProvider>
          <ErrorBoundary>
            <RootLayout>
              <Outlet />
            </RootLayout>
          </ErrorBoundary>
        </SocketProvider>
      </StyleProvider>
    </StoreProvider>
  );
};

export default App;
