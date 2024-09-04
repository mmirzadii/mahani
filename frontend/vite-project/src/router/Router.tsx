import { createBrowserRouter, Outlet } from 'react-router-dom';
import AppBar from '../FixedOptions/AppBar.tsx';
import HomePage from '../pages/Home/Index.tsx';
import Footer from '../FixedOptions/Footer.tsx';
import Index from '../pages/Login/Index.tsx';
import SignupPage from '../pages/Signup/Index.tsx';
import Home from '../pages/dashboard/Home/Home.tsx';
import DashboardProvider from '../pages/dashboard/DashboardProvider.tsx';
import ProfilePage from '../pages/dashboard/Profile/Index.tsx';
import Sidebar from '../pages/dashboard/Sidebar.tsx';
import EventPage from '../pages/dashboard/Event/Mainpage/Index.tsx';
import ManageEventPage from '../pages/dashboard/ManageEvent/Index.tsx';
import EventProvider from '../pages/dashboard/Event/EventProvider.tsx';

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
    element: (
      <>
        <Sidebar />
        <DashboardProvider>
          <Outlet />
        </DashboardProvider>
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'profile/',
        element: <ProfilePage />,
      },
      {
        path: 'event/',
        element: (
          <EventProvider>
            <Outlet />
          </EventProvider>
        ),
        children: [
          {
            index: true,
            element: <EventPage />,
          },
          {
            path: 'manage/',
            element: <ManageEventPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
