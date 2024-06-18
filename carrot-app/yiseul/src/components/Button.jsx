import PropTypes from 'prop-types'; // PropTypes 불러오기

export default function Button({ type='primary', text='버튼', icon='""', disabled=false, readOnly=false, blind=false}) {
  const buttonClassName = icon ? `icon-${icon} button is-${type}` : `button is-${type}`;

  return (
    <button
      className={buttonClassName}
      disabled={disabled}
      readOnly={readOnly}
      aria-hidden={blind} // 접근성을 위한 경우 `blind` prop 사용
    >
      {!blind && text}
    </button>
  );
}

// PropTypes 추가
Button.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  buttonClassName: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  blind: PropTypes.bool,
};