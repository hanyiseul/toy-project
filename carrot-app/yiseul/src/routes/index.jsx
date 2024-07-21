import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import NotFoundPage from '../NotFoundPage';
import ProductList from '../pages/ProductList';
import ProductWrite from '../pages/ProductWrite';
import ProductDetail from '../pages/ProductDetail';
import Login from '../pages/Login';
import Setting from '../pages/Setting';
import Search from '../pages/Search';

const routes = createBrowserRouter([
  {
    path: '/',
    // 참고: https://stackabuse.com/redirects-in-react-router/
    // 참고: https://devalice.tistory.com/112
    element: <Navigate to="/pages/productList" />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/pages',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <Navigate to="productList" />,
      },
      {
        path: 'productList',
        element: <ProductList />,
      },
      {
        path: 'productWrite',
        element: <ProductWrite />,
      },
      {
        path: 'productDetail/:productId',
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/pages/login',
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/pages/setting',
    element: <Setting />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/pages/search',
    element: <Search />,
    errorElement: <NotFoundPage />,
  },
]);

export default routes;
