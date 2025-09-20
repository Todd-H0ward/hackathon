import { AppShell } from '@mantine/core';
import clsx from 'clsx';

import { observer } from 'mobx-react-lite';
import styles from './RootLayout.module.scss';

const RootLayout = observer(({ className, children }) => {
  return (
    <AppShell
      className={clsx(styles.root, className)}
      padding="md"
    >
      <div>{children}</div>
    </AppShell>
  );
});

export default RootLayout;
