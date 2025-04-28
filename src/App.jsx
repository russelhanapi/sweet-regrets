import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Order from './pages/Order';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/menu', element: <Menu /> },
  { path: '/cart', element: <Cart /> },
  { path: '/order', element: <Order /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
