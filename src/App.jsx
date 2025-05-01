import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { loader as menuLoader } from './pages/Menu';
import { loader as orderLoader } from './pages/Order';
import { action as createOrderAction } from './features/order/CreateOrder';
import Loader from './components/ui/Loader';

const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const Error = lazy(() => import('./pages/Error'));
const Menu = lazy(() => import('./pages/Menu'));
const Order = lazy(() => import('./pages/Order'));
const CreateOrder = lazy(() => import('./features/order/CreateOrder'));
const AppLayout = lazy(() => import('./components/layouts/AppLayout'));
const ProtectedRoute = lazy(() => import('./pages/ProtectedRoute'));

const suspense = (children) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: suspense(<Error />),
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: (
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        ),
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: '/order/new',
        element: (
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        ),
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
