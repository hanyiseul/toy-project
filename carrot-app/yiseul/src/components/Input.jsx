import PropTypes from 'prop-types'; // PropTypes 불러오기

export default function Input({label, value, placeholder, readonly, disabled, accept, onChange, multiple, uploadImgUrl, type='text'}) {
  return (
    <div className="input__wrap">
      {label && (
        <span className="label"> {label} </span>
      )}
      {uploadImgUrl && uploadImgUrl.map((img, id) => ( // 수정된 부분: 이미지를 렌더링하는 코드 추가
        <div className="img" key={id}>
          <img src={img} alt="" />
        </div>
      ))}
      <input className={`input`}type={type} value={value} accept={accept} placeholder={placeholder} readOnly={readonly} disabled={disabled} onChange={onChange} multiple={multiple}/>
    </div>
  )
}

// PropTypes 추가ㅇ
Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  src: PropTypes.string,
  accept: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  uploadImgUrl: PropTypes.array,
};