import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Header from '../components/commons/Header/Header.jsx';
import HomePage from '../components/pages/Home';
import LoginPage from '../components/pages/Login';
import NotFoundPage from '../components/pages/NotFound';
import RegisterPage from '../components/pages/Register';
import { STATIC_LINKS } from '../constants/staticLinks.js';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import ResetPassword from '@/components/pages/ResetPassword/index.js';

export const ROUTER = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: (
          <>
            <Header />
            <PrivateRoute />
          </>
        ),
        children: [

        ],
      },
      {
        element: (
          <>
            <Header />
            <PublicRoute />
          </>
        ),
        children: [
          {
            path: STATIC_LINKS.HOME,
            element: <HomePage />,
          },
          {
            path: STATIC_LINKS.LOGIN,
            element: <LoginPage />,
          },
          {
            path: STATIC_LINKS.REGISTER,
            element: <RegisterPage />,
          },
          {
            path: STATIC_LINKS.FORGOT_PASSWORD,
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
