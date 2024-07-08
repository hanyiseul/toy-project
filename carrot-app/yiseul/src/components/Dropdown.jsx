import { useState } from 'react';
import PropTypes from 'prop-types'; // PropTypes 불러오기

export default function Dropdown({
  className='',
  id,
  disabled = false,
  parentClass,
}) {
  const options = ["원서동", "괴안동"];
  const [defaultOption, setDefaultOption] = useState(options[0]);
  const [show, setShow] = useState(false);

  function handleOption(option) {
    setDefaultOption(option);
    setShow(false)
  }

  function handleDropdown() {
    console.log('hoi')
    setShow(!show)
    console.log(show)
  }

  return (
    <div className={`dropdown ${parentClass}`}>
      <button
        className={`select ${className}`}
        id={id}
        disabled={disabled}
        onClick={handleDropdown}
      >
        {defaultOption}
      </button>
      {show && (
        <div className="option">
          {options.map((option, index) => (
            <button key={index} value={option} onClick={() => handleOption(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
      
    </div>
  );
}

// PropTypes 추가
Dropdown.propTypes = {
  id: PropTypes.string,
  parentClass: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
