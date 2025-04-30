import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Menu, { loader as menuLoader } from './pages/Menu';
import Order from './pages/Order';
import Cart from './pages/Cart';
import AppLayout from './components/layouts/AppLayout';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu />, loader: menuLoader },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      { path: '/order/:orderId', element: <Order /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
