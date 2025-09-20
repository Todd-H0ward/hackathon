import { createContext } from 'react';
import Store from '../../store/store.js';

const StoreContext = createContext({});

const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider
      value={{
        store: new Store(),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
