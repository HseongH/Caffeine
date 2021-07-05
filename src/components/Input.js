// LIBRARY
import React from 'react';

const Input = (props) => {
  const { placeholder, type, status } = props;

  return (
    <div className="input-box">
      <input className="input--text" type={type} placeholder={placeholder} />

      <p className="status-display">{status}</p>
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
  placeholder: '텍스트를 작성해주세요.',
  status: '필수 입력 사항입니다.',
};

export default Input;
