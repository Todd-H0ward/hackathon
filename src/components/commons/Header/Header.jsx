import { AppShell, Button, Group } from '@mantine/core';
import { Radiation, Search } from 'lucide-react';
import AccountDropdown from './AccountDropdown/index.js';
import { STATIC_LINKS } from '@/constants/staticLinks.js';
import { Link, useLocation } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';

import styles from './Header.module.scss';

const Header = observer(() => {
  const { isAuth, account, logout } = useStore().auth;
  const { pathname } = useLocation();

  if (pathname === STATIC_LINKS.LOGIN || pathname === STATIC_LINKS.REGISTER) {
    return null;
  }

  return (
    <AppShell.Header className={styles.root} h={60} align="center">
      <Group justify="space-between" align="center" px="md">
        <Link className={styles.link} to={STATIC_LINKS.HOME}>
          <Radiation size={25} />
        </Link>

        {isAuth ? (
          <AccountDropdown account={account} onLogout={logout} />
        ) : (
          <Link to={STATIC_LINKS.LOGIN}>
            <Button>Войти</Button>
          </Link>
        )}
      </Group>
    </AppShell.Header>
  );
});

export default Header;
