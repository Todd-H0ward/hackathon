import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore.js';
import { Navigate, Outlet } from 'react-router';
import { STATIC_LINKS } from '../constants/staticLinks.js';

const PrivateRoute = observer(() => {
  const { isAuth } = useStore().auth;

  return isAuth ? <Outlet /> : <Navigate to={<STATIC_LINKS className="HOME"></STATIC_LINKS>} />;
});

export default PrivateRoute;
