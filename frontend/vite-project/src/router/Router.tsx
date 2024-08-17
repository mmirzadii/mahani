import { createBrowserRouter, Outlet } from 'react-router-dom';
import AppBar from '../FixedOptions/AppBar.tsx';
import HomePage from '../pages/Home/Index.tsx';
import Footer from '../constant/Footer.tsx';
import Index from '../pages/Login/Index.tsx';
import SignupPage from '../pages/Signup/Index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AppBar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login/',
        element: <Index />,
      },
      {
        path: 'signup/',
        element: <SignupPage />,
      },
    ],
  },
]);

export default router;
