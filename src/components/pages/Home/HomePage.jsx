import Counter from '../../commons/Counter/Counter.jsx';
import PageWrapper from '../../layouts/PageWrapper/PageWrapper.jsx';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <PageWrapper className={styles.root}>
      <Counter />
    </PageWrapper>
  );
};

export default HomePage;
