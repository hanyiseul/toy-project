import PropTypes from 'prop-types'; // PropTypes 불러오기
import Button from './Button';

export default function Products({ id='', className='', 
products=[] }) {
  return (
    <ul className={`product__ist ${className}`} id={id}>
      {products.map((product, index) => (
        <li key={index}>
          <img src={`../src/assets/images/svg/product${product.id}.svg`} alt={`${product.title} 이미지`} />
          <div className="product__info">
            <p>{product.title}</p>
            <p>
              <span>{product.location}</span>
              <span>{product.date}</span>
            </p>
            <p>{product.price}</p>
          </div>
          <Button text="삭제" />
        </li>
      ))}
    </ul>
  )
}

// PropTypes 추가
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