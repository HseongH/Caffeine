// LIBRARY
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

// FUNCTION
import { setCookie, delCookie } from '../../common/cookie';

// FIREBASE
import firebase from 'firebase/app';
import { auth } from '../../firebase/firebase';

// ACTION
const LOGOUT = 'LOGOUT';
const GETUSER = 'GETUSER';
const SETUSER = 'SETUSER';

// ACTION CREATOR
const logOut = createAction(LOGOUT, (user) => ({ user }));
const getUser = createAction(GETUSER, (user) => ({ user }));
const setUser = createAction(SETUSER, (user) => ({ user }));

// INITIAL STATE
const initialState = {
  user: null,
  logInStatus: false,
};

// MIDDLEWARE
const logInFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          dispatch(
            setUser({
              name: user.user.displayName,
              id,
              profile: '',
              uid: user.user.uid,
            })
          );

          history.replace('/');
        })
        .catch((error) => {
          console.error(error.code, error.message);
        });
    });
  };
};

const signUpFB = (id, pwd, name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            dispatch(setUser({ name, id, profile: '', uid: user.uid }));
            history.replace('/');
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };
};

const logInCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            id: user.email,
            profile: '',
            uid: user.uid,
          })
        );
      } else dispatch(logOut());
    });
  };
};

const logOutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace('/');
    });
  };
};

// REDUCER
export default handleActions(
  {
    [SETUSER]: (state, action) =>
      produce(state, (draft) => {
        setCookie('logInStatus', 'success');
        draft.user = action.payload.user;
        draft.logInStatus = true;
      }),

    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        delCookie('logInStatus');
        draft.user = null;
        draft.logInStatus = false;
      }),
  },
  initialState
);

export const userActions = {
  logOut,
  getUser,
  logInFB,
  signUpFB,
  logInCheckFB,
  logOutFB,
};
