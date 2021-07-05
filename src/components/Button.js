// LIBRARY
import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { width, bg, color, margin, hoverBG, children } = props;
  const styles = {
    width,
    bg,
    color,
    margin,
    hoverBG,
  };

  return <ButtonStyle {...styles}>{children}</ButtonStyle>;
};

Button.defaultProps = {
  width: 'auto',
  bg: '#ffbf69',
  color: '#fff',
  margin: '0',
};

const ButtonStyle = styled.button`
  width: ${(props) => props.width};
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  border-radius: 10px;
  margin: ${(props) => props.margin};
  padding: 8px 12px;
  box-sizing: border-box;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${(props) => props.hoverBG};
  }
`;

export default Button;
