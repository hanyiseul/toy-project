import PropTypes from 'prop-types'; // PropTypes 불러오기
import Products from '../components/Products'
import { useEffect, useState } from 'react';

export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null); // 에러 초기화

    const fetchData = async () => {
      try {
        const response = await fetch(`/data/product.json`);
        if (!response.ok) {
          throw new Error('데이터를 불러오는 데 문제가 발생했습니다.');
        }
        const data = await response.json();
        setProducts(data);
        console.log('fetch 성공');
      } catch (error) {
        setError('에러');
        console.error('fetch error:', error);
      }
    };

    fetchData();

    return () => {
      console.log('return');
    };
  }, []); // 빈 배열을 두 번째 인자로 전달하여, 컴포넌트가 마운트될 때 한 번만 실행되도록 설정


  return (
    <>
      <section>
        {error ? (
          <div>{error}</div>
        ) : (
          <Products products={products} />
        )}
      
      </section>
    </>
  )
}

// PropTypes 추가
Products.propTypes = {
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