import { createBrowserRouter, Outlet } from 'react-router-dom';
import AppBar from '../FixedOptions/AppBar.tsx';
import HomePage from '../pages/Home/Index.tsx';
import Footer from '../constant/Footer.tsx';
import Index from '../pages/Login/Index.tsx';
import SignupPage from '../pages/Signup/Index.tsx';
import Home from '../pages/dashboard/Home/Home.tsx';

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
  {
    path: 'dashboard/',
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
