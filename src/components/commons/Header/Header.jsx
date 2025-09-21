import { AppShell, Group, Text } from '@mantine/core';
import { ShieldCheck } from 'lucide-react';
import { STATIC_LINKS } from '@/constants/staticLinks.js';
import { Link, useLocation } from 'react-router';
import { observer } from 'mobx-react-lite';

import styles from './Header.module.scss';

const Header = observer(() => {
  const { pathname } = useLocation();

  if (pathname === STATIC_LINKS.LOGIN || pathname === STATIC_LINKS.REGISTER) {
    return null;
  }

  return (
    <AppShell.Header className={styles.root} h={60} align="center">
      <Group justify="space-between" align="center" px="md">
        <Link className={styles.link} to={STATIC_LINKS.HOME}>
          <Group gap="xs" align="center">
            <ShieldCheck size={34} />
            <Text fw={600} size="lg">
              Идентификатор происшествий
            </Text>
          </Group>
        </Link>
      </Group>
    </AppShell.Header>
  );
});

export default Header;
