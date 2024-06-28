import React from 'react'

export default function Image({id, img}) {
  return (
  <div className="img" key={id}>
    <img src={img} alt="" />
  </div>
  )
}
