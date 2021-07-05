// LIBRARY
import React from 'react';
import styled from 'styled-components';

// COMPONENTS
import Layout from './Layout';
import Post from './Post';

const Section = (props) => {
  return (
    <SectionStyle>
      <Layout width={'590px'} sortVer={'none'}>
        <Post />
      </Layout>
    </SectionStyle>
  );
};

Section.defaultProps = {};

const SectionStyle = styled.header`
  padding-top: 120px;
  min-height: 100vh;
  background: #eee;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

export default Section;
