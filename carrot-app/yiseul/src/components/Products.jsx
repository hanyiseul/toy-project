import PropTypes from 'prop-types';
import Popup from './Popup';
import { Link } from 'react-router-dom';

export default function Products({ id, className, products }) {
  return (
    <ul className={`product__list ${className}`} id={id}>
      {products.map((product, index) => (
        <li key={index}>
          <Link to={{ pathname: `/pages/productDetail/${product.id}`, state: { products } }}>
            <img src={`../src/assets/images/svg/product${product.id}.svg`} alt={`${product.title} 이미지`} />
            <div className="product__info">
              <p>{product.title}</p>
              <p>
                <span>{product.location}</span>
                <span>{product.date}</span>
              </p>
              <p>{product.price}</p>
            </div>
          </Link>
          <Popup buttonText='팝업' />
        </li>
      ))}
    </ul>
  );
}

Products.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ),
};
