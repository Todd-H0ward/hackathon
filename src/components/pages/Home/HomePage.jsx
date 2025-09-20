import PageWrapper from '../../layouts/PageWrapper/PageWrapper.jsx';
import NewsDrawer from '@/components/commons/NewsDrawer/index.js';

import styles from './HomePage.module.scss';
import NewsMap from '@/components/pages/Home/NewsMap/NewsMap.jsx';
import AddNewsModal from '@/components/pages/Home/AddNewsModal/AddNewsModal.jsx';

const HomePage = () => {
  return (
    <PageWrapper className={styles.root}>
      <NewsMap />
      <NewsDrawer />
      <AddNewsModal className={styles.btn} />
    </PageWrapper>
  );
};

export default HomePage;
