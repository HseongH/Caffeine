// LIBRARY
import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const { width, placeholder, type } = props;
  const styles = {
    width,
  };

  return <InputStyle {...styles} type={type} placeholder={placeholder} />;
};

Input.defaultProps = {
  width: '100%',
  type: 'text',
  placeholder: '텍스트를 작성해주세요.',
};

const InputStyle = styled.input`
  --phColor: #6c757d;
  width: ${(props) => props.width};
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px 12px;

  &::placeholder {
    color: --phColor;
  }

  &::-webkit-input-placeholder {
    color: --phColor;
  }

  &:-ms-input-placeholder {
    color: --phColor;
  }
`;

export default Input;
