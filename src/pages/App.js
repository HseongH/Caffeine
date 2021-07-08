// LIBRARY
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';

// REDUX
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/modules/user';
import { likeActions } from '../redux/modules/like';

// FIREBASE
import { apiKey } from '../firebase/firebase';

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
  const dispatch = useDispatch();

  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const logInStatus = Boolean(sessionStorage.getItem(sessionKey));

  useEffect(() => {
    if (logInStatus) dispatch(userActions.logInCheckFB());
  }, []);

  return (
    <>
      <Header />

      <ConnectedRouter history={history}>
        <Route path="/" exact component={Post} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/add-post" exact component={AddPost} />
        <Route path="/notice" exact component={Notice} />
      </ConnectedRouter>
    </>
  );
}

export default App;
