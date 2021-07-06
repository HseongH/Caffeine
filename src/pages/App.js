// LIBRARY
import React from 'react';

// COMPONENTS
import Header from '../components/Header';

// PAGES
import Post from './Post';
import SignUp from './SignUp';
import SignIn from './SignIn';
import AddPost from './AddPost';
import Notice from './Notice';

// STYLE
import '../style/scss/main.scss';

function App() {
  return (
    <>
      <Header />

      {/* <Post /> */}
      {/* <SignUp /> */}
      {/* <SignIn /> */}
      {/* <AddPost /> */}
      <Notice />
    </>
  );
}

export default App;
