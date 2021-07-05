// LIBRARY
import React from 'react';

const Layout = (props) => {
  const { layout, children } = props;

  return <div className={layout}>{children}</div>;
};

export default Layout;
