// LIBRARY
import React from 'react';

const Layout = (props) => {
  const {
    isFlex,
    direction,
    width,
    height,
    sortVer,
    sortHoz,
    padding,
    margin,
    bg,
    radius,
    children,
  } = props;
  const styles = {
    isFlex,
    direction,
    width,
    height,
    sortVer,
    sortHoz,
    padding,
    margin,
    bg,
    radius,
  };

  return <div {...styles}>{children}</div>;
};

Layout.defaultProps = {
  isFlex: true,
  direction: 'row',
  width: 'auto',
  height: 'auto',
  sortVer: 'center',
  sortHoz: 'center',
  bg: 'none',
  margin: 0,
  padding: 0,
};

// const LayoutFlex = styled.div`
//   width: ${(props) => props.width};
//   height: ${(props) => props.height};
//   background: ${(props) => props.bg};
//   ${(props) => props.isFlex && 'display: flex'};
//   flex-direction: ${(props) => props.direction};
//   justify-content: ${(props) => props.sortHoz};
//   align-items: ${(props) => props.sortVer};
//   border-radius: ${(props) => props.radius};
//   padding: ${(props) => props.padding};
//   margin: ${(props) => props.margin};
// `;

export default Layout;
