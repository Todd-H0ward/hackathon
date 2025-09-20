import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore.js';
import { Navigate, Outlet } from 'react-router';
import { STATIC_LINKS } from '../constants/staticLinks.js';
import { Loader, Stack } from '@mantine/core';

const PublicRoute = observer(() => {
  const { isAuth, isLoading } = useStore().auth;

  if (isLoading) {
    return (
      <Stack align="center" justify="center" h="100vh">
        <Loader size="lg" />
      </Stack>
    );
  }

  return !isAuth ? <Outlet /> : <Navigate to={STATIC_LINKS.HOME} />;
});

export default PublicRoute;
