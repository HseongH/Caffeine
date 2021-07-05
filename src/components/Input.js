// LIBRARY
import React from 'react';

const Input = (props) => {
  const { placeholder, type } = props;

  return <input className="input--text" type={type} placeholder={placeholder} />;
};

Input.defaultProps = {
  type: 'text',
  placeholder: '텍스트를 작성해주세요.',
};

export default Input;
