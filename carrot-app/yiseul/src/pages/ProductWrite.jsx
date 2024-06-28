import React, { useEffect, useState } from 'react'
import Input from '../components/Input'

export default function ProductWrite() {

  
  return (
    <form className="form">
      <Input type="file" accept="image/*" multiple={true} />
      <Input label="제목" placeholder="글제목"/>
      <Input label="가격" type="number" />
      <Map />
    </form>
  )
}
