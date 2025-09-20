import { Outlet } from 'react-router';
import ErrorBoundary from './components/layouts/ErrorBoundary';
import RootLayout from './components/layouts/RootLayout/RootLayout.jsx';
import { StoreProvider } from './components/providers/StoreProvider.jsx';
import StyleProvider from './components/providers/StyleProvider.jsx';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const App = () => {
  return (
    <StoreProvider>
      <StyleProvider>
        <ErrorBoundary>
          <RootLayout>
            <Outlet />
          </RootLayout>
        </ErrorBoundary>
      </StyleProvider>
    </StoreProvider>
  );
};

export default App;
