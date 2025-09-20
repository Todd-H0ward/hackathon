import { AppShell } from '@mantine/core';
import { clsx } from 'clsx';
import styles from './PageWrapper.module.scss';

const PageWrapper = ({ className, children }) => {
  return (
    <AppShell.Main className={clsx(styles.root, className)}>
      {children}
    </AppShell.Main>
  );
};

export default PageWrapper;
