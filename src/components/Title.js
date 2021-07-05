// LIBRARY
import React from 'react';

const Title = (props) => {
  const { fontSize, lineHeight, textAlign, color, children } = props;
  const styles = {
    fontSize,
    lineHeight,
    textAlign,
    color,
  };

  return <h2 {...styles}>{children}</h2>;
};

Title.defaultProps = {
  fontSize: '16px',
  lineHeight: '1.25',
  textAlign: 'left',
  color: '#343a40',
};

// const TitleStyle = styled.h2`
//   font-size: ${(props) => props.fontSize};
//   line-height: ${(props) => props.lineHeight};
//   text-align: ${(props) => props.textAlign};
//   font-weight: 700;
// `;

export default Title;
