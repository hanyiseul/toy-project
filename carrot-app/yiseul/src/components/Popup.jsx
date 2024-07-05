import PropTypes from 'prop-types'; // PropTypes 불러오기
import Button from './Button';
import { useState } from 'react';

export default function Popup({id, className, buttonText, buttonId, buttonClass}) {
  const [show, setShow] = useState(false)
  function handlePopup() {
    setShow(!show)
  }
  return (
    <>
      <Button text={buttonText} id={buttonId} class={buttonClass} onClick={handlePopup}/>
      {show && (
        <div id={id} className={`popup ${className}`}>
          popup
        </div>
      )}
    </>
  )
}

// PropTypes 추가
Popup.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  buttonId: PropTypes.string,
  buttonClass: PropTypes.string,
};