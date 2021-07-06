// LIBRARY
import React from 'react';

// FUNCTION
import useCheckLoggedIn from './checkLoggedIn';

const Permit = (props) => {
  return useCheckLoggedIn() ? <>{props.children}</> : null;
};

export default Permit;
