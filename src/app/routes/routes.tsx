import { ROUTE_URL } from "../core/constants/coreUrl";
import PrivateRoute from "./PrivateRoutes";
import { ScrollRestoration } from "react-router-dom";

import Login from "../../pages/Login/Login";
import Dashboard from "../../pages/Dashboard/Dashboard";
import ProfilePage from "../../pages/Profile/Profile";
import { ProductDetails } from "../../pages/ProductDetails/ProductDetails";
import { ProductView } from "../../pages/ProductDetails/shared/ProductView";
import { AddLeads } from "../../pages/ProductDetails/shared/AddLeads";

// import Login from '@/pages/Login/Login';
// import Dashboard from '@/pages/Dashboard/Dashboard';

// import Society from '@/pages/Society/Society';
// import LiveEvent from '@/pages/LiveEvent/LiveEvent';
// import Tasks from '@/pages/Tasks/Tasks';

export const authProtectedRoutes = [
  {
    element: (
      <>
        {/* <Layout> */}
        <ScrollRestoration />
        <PrivateRoute />
        {/* </Layout> */}
      </>
    ),
    children: [
      {
        path: ROUTE_URL.dashboard,
        element: (
          <>
            <Dashboard />
          </>
        ),
      },
      {
        path: ROUTE_URL.profile,
        element: (
          <>
            <ProfilePage />
          </>
        ),
      },
      {
        path: ROUTE_URL.product_details,
        element: (
          <>
            <ProductDetails />
          </>
        ),
      },
      {
        path: ROUTE_URL.productView,
        element: (
          <>
            <ProductView />
          </>
        ),
      },
      {
        path: ROUTE_URL.addlead,
        element: (
          <>
            <AddLeads />
          </>
        ),
      },

      // {
      //   path: ROUTE_URL.society,
      //   element: (
      //     <>
      //       <Society />
      //     </>
      //   ),
      // },
      // {
      //   path: ROUTE_URL.liveEvent,
      //   element: (
      //     <>
      //       <LiveEvent />
      //     </>
      //   ),
      // },
      // {
      //   path: ROUTE_URL.task,
      //   element: <Tasks />,
      // },
    ],
  },
  {
    path: ROUTE_URL.login,
    element: <Login />,
  },
];

export const authRoutes = [];
