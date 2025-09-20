import PageWrapper from '../../layouts/PageWrapper/PageWrapper.jsx';

import styles from './HomePage.module.scss';
import NewsMap from '@/components/pages/Home/NewsMap/NewsMap.jsx';

const HomePage = () => {
  return (
    <PageWrapper className={styles.root}>
      <NewsMap />
    </PageWrapper>
  );
};

export default HomePage;
