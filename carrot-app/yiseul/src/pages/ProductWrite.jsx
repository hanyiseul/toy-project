import React, { useState } from 'react'
import Input from '../components/Input'

export default function ProductWrite() {
  const [uploadImgUrl, setUploadImgUrl] = useState([]);

  const onchangeImageUpload = (e)=> {
    const imageList = e.target.files;
    let imgUrlList = [...uploadImgUrl];
    for (let i = 0; i < imageList.length; i++) {
      const imgUrl = URL.createObjectURL(imageList[i]);
      imgUrlList.push(imgUrl);
    }
    setUploadImgUrl(imgUrlList);
  }
  return (
    <form className="form">
      <Input type="file" accept="image/*" multiple={true} onChange={onchangeImageUpload} uploadImgUrl={uploadImgUrl} />
      <Input label="제목" placeholder="글제목"/>
      <Input label="가격" type="number" />
      
    </form>
  )
}
