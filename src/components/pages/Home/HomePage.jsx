import PageWrapper from '../../layouts/PageWrapper/PageWrapper.jsx';
import NewsDrawer from '@/components/commons/NewsDrawer/index.js';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <PageWrapper className={styles.root}>
      <NewsDrawer />
    </PageWrapper>
  );
};

export default HomePage;
