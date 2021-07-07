// LIBRARY
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';

// FIREBASE
import { firestore } from '../../firebase/firebase';
import { storage } from '../../firebase/firebase';

// REDUX
import { imgActions } from './image';

// ACTION
const LOAD = 'post/LOAD';
const CREATE = 'post/CREATE';

// ACTION CREATOR
const getPost = createAction(LOAD, (postList) => ({ postList }));
const addPost = createAction(CREATE, (post) => ({ post }));

// INITIAL STATE
const initialState = {
  list: [],
};

// MIDDLEWARE
const postDB = firestore.collection('post');

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    postDB.get().then((docs) => {
      let postList = [];

      docs.forEach((doc) => {
        const temp = doc.data();
        const post = Object.keys(temp).reduce(
          (acc, cur) => {
            if (cur.indexOf('user') !== -1) {
              return {
                ...acc,
                userInfo: {
                  ...acc.userInfo,
                  [cur]: temp[cur],
                },
              };
            }

            return { ...acc, [cur]: temp[cur] };
          },
          { id: doc.id, userInfo: {} }
        );

        postList = [...postList, post];
      });
      console.log(postList);
      dispatch(getPost(postList));
    });
  };
};

const initialPost = {
  id: 0,
  userInfo: {
    userName: 'mean0',
    userProfile: 'https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg',
  },
  imageUrl: 'https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg',
  contents: '고양이네요!',
  commentCnt: 10,
  insertDt: '2021-02-27 10:00:00',
};

const addPostFB = (contents) => {
  return function (dispatch, getState, { history }) {
    const temp = getState().user.user;
    const userInfo = {
      userName: temp.name,
      userId: temp.uid,
      userProfile: temp.profile,
      commentCnt: 0,
    };

    const _post = {
      contents,
      insertDt: moment().format('YYYY.MM.DD hh:mm'),
    };

    const image = getState().image.preview;
    const upload = storage
      .ref(`images/${userInfo.userId}_${Date.now()}`)
      .putString(image, 'data_url');

    upload
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            dispatch(imgActions.uploadImage(url));
            return url;
          })
          .then((url) => {
            postDB
              .add({ ...userInfo, ..._post, imageUrl: url })
              .then((doc) => {
                const post = { userInfo, ..._post, id: doc.id, imageUrl: url };

                dispatch(addPost(post));
                history.replace('/');
              })
              .catch((error) => {
                console.error('post 작성 실패!!!', error);
              });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        const _post = doc.data();

        if (!_post) return;

        const post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf('user') !== -1) {
              return {
                ...acc,
                userInfo: { ...acc.userInfo, [cur]: _post[cur] },
              };
            }

            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, userInfo: {} }
        );

        dispatch(getPost([post]));
      });
  };
};

// REDUCER
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.postList);

        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
      }),

    [CREATE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.post);
        draft.list.unshift(action.payload.post);
      }),
  },
  initialState
);

export const postActions = {
  getPost,
  addPost,
  getPostFB,
  addPostFB,
  getOnePostFB,
};
