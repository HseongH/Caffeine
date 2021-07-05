// LIBRARY
import React from 'react';

const Button = (props) => {
  const { children, clickEvent } = props;

  return (
    <button className="btn" onClick={clickEvent}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  clickEvent: () => {},
};

export default Button;
