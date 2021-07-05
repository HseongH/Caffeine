// LIBRARY
import React from 'react';

const Title = (props) => {
  const { children } = props;

  return <h2 className="title">{children}</h2>;
};

export default Title;
