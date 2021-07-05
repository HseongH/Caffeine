// LIBRARY
import React from 'react';

const Text = (props) => {
  const { children } = props;

  return <p className="comments">{children}</p>;
};

export default Text;
