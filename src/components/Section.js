// LIBRARY
import React from 'react';

// COMPONENTS
import Layout from './Layout';

// PAGES
import Post from '../pages/Post';
import SignUp from '../pages/SignUp';

const Section = (props) => {
  return (
    <section className="section">
      <Layout width={'590px'} isFlex={false}>
        <SignUp />
      </Layout>
    </section>
  );
};

Section.defaultProps = {};

// const SectionStyle = styled.section`
//   padding-top: 120px;
//   min-height: 100vh;
//   background: #eee;
//   display: flex;
//   justify-content: center;
//   box-sizing: border-box;
// `;

export default Section;
