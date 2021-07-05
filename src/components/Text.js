// LIBRARY
import React from 'react';

const Text = (props) => {
  const { strong, fontSize, lineHeight, textAlign, color, children } = props;
  const styles = {
    strong,
    fontSize,
    lineHeight,
    textAlign,
    color,
  };

  return <p {...styles}>{children}</p>;
};

Text.defaultProps = {
  fontSize: '16px',
  lineHeight: '1.25',
  textAlign: 'left',
  color: '#343a40',
};

// const TextStyle = styled.p`
//   font-size: ${(props) => props.fontSize};
//   line-height: ${(props) => props.lineHeight};
//   color: ${(props) => props.color};
//   text-align: ${(props) => props.textAlign};
//   ${(props) => props.strong && 'font-weight: 700'};
// `;

export default Text;
