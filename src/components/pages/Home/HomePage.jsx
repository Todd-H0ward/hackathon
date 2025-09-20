import PageWrapper from '../../layouts/PageWrapper/PageWrapper.jsx';
import NewsDrawer from '@/components/commons/NewsDrawer/index.js';

import styles from './HomePage.module.scss';
import NewsMap from '@/components/pages/Home/NewsMap/NewsMap.jsx';

const HomePage = () => {
  return (
    <PageWrapper className={styles.root}>
      <NewsMap />
      <NewsDrawer />
    </PageWrapper>
  );
};

export default HomePage;
