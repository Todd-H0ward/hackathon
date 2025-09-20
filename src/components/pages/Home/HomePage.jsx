import PageWrapper from '../../layouts/PageWrapper/PageWrapper.jsx';
import NewsDrawer from '@/components/pages/Home/NewsDrawer/index.js';
import NewsMap from '@/components/pages/Home/NewsMap/NewsMap.jsx';
import Statistics from '@/components/pages/Home/Statistics';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <PageWrapper className={styles.root}>
      <NewsMap />
      <NewsDrawer />
      <Statistics />
    </PageWrapper>
  );
};

export default HomePage;
