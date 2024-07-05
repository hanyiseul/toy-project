import PropTypes from 'prop-types'; // PropTypes 불러오기
import { useState } from 'react';
import Image from './Image';

export default function Input({
  label, 
  value, 
  placeholder, 
  readOnly, 
  disabled, 
  accept, 
  onChange, 
  multiple, 
  type='text'}) {
  const [uploadImgUrl, setUploadImgUrl] = useState([]);

  const onchangeImageUpload = (e) => {
    const imageList = e.target.files; // 업로드된 파일 리스트를 가져옴
    let imgUrlList = [...uploadImgUrl]; // 기존의 이미지 URL 리스트를 복사
    for (let i = 0; i < imageList.length; i++) { // 파일 리스트를 순회하며
      const imgUrl = URL.createObjectURL(imageList[i]); // 각 파일의 URL을 생성
      imgUrlList.push(imgUrl); // 생성된 URL을 리스트에 추가

    }
    setUploadImgUrl(imgUrlList); // 업데이트된 URL 리스트를 상태로 설정
  }

  return (
    <div className="input__wrap">
      {label && (
        <span className="label"> {label} </span>
      )}
      {uploadImgUrl && uploadImgUrl.map((img, id) => (
        <Image id={id} img={img} key={id}/>
      ))}
      <input className={`input`}type={type} value={value} accept={accept} placeholder={placeholder} readOnly={readOnly} disabled={disabled} onChange={multiple ? onchangeImageUpload : onChange} multiple={multiple}/>
    </div>
  )
}

// PropTypes 추가
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