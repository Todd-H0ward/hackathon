import PageWrapper from '../../layouts/PageWrapper/PageWrapper.jsx';
import NewsDrawer from '@/components/commons/NewsDrawer/index.js';

import styles from './HomePage.module.scss';
import NewsMap from '@/components/pages/Home/NewsMap/NewsMap.jsx';
import AddNewsModal from '@/components/pages/Home/AddNewsModal/AddNewsModal.jsx';
import Statistics from '@/components/pages/Home/Statistics';

const HomePage = () => {
  return (
    <PageWrapper className={styles.root}>
      <NewsMap />
      <NewsDrawer />
      <AddNewsModal className={styles.btn} />
      <Statistics />
    </PageWrapper>
  );
};

export default HomePage;
