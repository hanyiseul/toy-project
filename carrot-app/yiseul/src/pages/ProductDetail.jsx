import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();
  console.log(location)

  useEffect(() => {
    setError(null);

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
        setError('데이터를 불러오는 중 에러가 발생했습니다.');
        console.error('fetch error:', error);
      }
    };

    fetchData();

    return () => {
      console.log('cleanup 함수');
    };
  }, []);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div>
        <p>해당 상품을 찾을 수 없습니다.</p>
      </div>
    );
  } else if(error) {
    return (
      <div>
        <p>에러!</p>
      </div>
    );
  }
  
  return (
    <>
      <section>
        <div className="title">{product.title}</div> 
        <p>ID: {product.id}</p>
        <p>위치: {product.location}</p>
        <p>날짜: {product.date}</p>
        <p>가격: {product.price}</p>
      </section>
    </>
  );
}
