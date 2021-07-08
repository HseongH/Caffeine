// LIBRARY
import React from 'react';

const Input = (props) => {
  const { placeholder, type, status, value, changeEvent, keyPressEvent, blurEvent, isVali } = props;

  return (
    <div className={isVali ? 'input-box' : 'input-box danger'}>
      <input
        className="input--text"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={changeEvent}
        onBlur={blurEvent}
        onKeyPress={keyPressEvent}
      />

      <p className={isVali ? 'status-display hide' : 'status-display'}>{status}</p>
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
  placeholder: '텍스트를 작성해주세요.',
  status: '필수 입력 사항입니다.',
  value: '',
  changeEvent: () => {},
  blurEvent: () => {},
};

export default Input;
