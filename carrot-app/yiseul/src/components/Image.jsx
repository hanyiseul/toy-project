import PropTypes from 'prop-types'; // PropTypes 불러오기

export default function Image({
  id, 
  img,
  alt
}) {
  return (
  <div className="img" key={id}>
    <img src={img} alt={alt} />
  </div>
  )
}

// PropTypes 추가
Image.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
};