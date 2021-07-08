// LIBRARY
import React from 'react';

const Button = (props) => {
  const { children, clickEvent, type, disabled, buttonClass } = props;

  return (
    <button className={buttonClass} type={type} onClick={clickEvent} disabled={disabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  clickEvent: () => {},
  disabled: false,
  buttonClass: 'btn',
};

export default Button;
