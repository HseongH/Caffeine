// LIBRARY
import React from 'react';

const Input = (props) => {
  const { placeholder, type, status, value, changeEvent, keyPressEvent } = props;

  return (
    <div className="input-box">
      <input
        className="input--text"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={changeEvent}
        onKeyPress={keyPressEvent}
      />

      <p className="status-display">{status}</p>
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
  placeholder: '텍스트를 작성해주세요.',
  status: '필수 입력 사항입니다.',
  value: '',
  changeEvent: () => {},
};

export default Input;
