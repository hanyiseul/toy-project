import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import NotFoundPage from '../NotFoundPage';
import ProductList from '../pages/ProductList';

// import SubTypography from '../views/components/SubTypography';

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
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />,
  },
]);

export default routes;
