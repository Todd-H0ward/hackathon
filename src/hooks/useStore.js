import { useContext } from 'react';
import { StoreContext } from '../components/providers/StoreProvider';

export const useStore = () => {
  const store = useContext(StoreContext);

  return store.store;
};
