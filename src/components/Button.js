// LIBRARY
import React from 'react';

const Button = (props) => {
  const { children, clickEvent, type, disabled } = props;

  return (
    <button className="btn" type={type} onClick={clickEvent} disabled={disabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  clickEvent: () => {},
  disabled: false,
};

export default Button;
