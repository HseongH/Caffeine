// LIBRARY
import React from 'react';
import styled from 'styled-components';

const Layout = (props) => {
  const { width, height, sortVer, sortHoz, bg, radius, children } = props;
  const styles = {
    width,
    height,
    sortVer,
    sortHoz,
    bg,
    radius,
  };

  return <LayoutFlex {...styles}>{children}</LayoutFlex>;
};

Layout.defaultProps = {
  width: 'auto',
  height: 'auto',
  sortVer: 'center',
  sortHoz: 'center',
  bg: 'none',
};

const LayoutFlex = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.bg};
  display: flex;
  justify-content: ${(props) => props.sortHoz};
  align-items: ${(props) => props.sortVer};
  border-radius: ${(props) => props.radius};
`;

export default Layout;
