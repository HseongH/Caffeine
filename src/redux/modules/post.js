// LIBRARY
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';

// FIREBASE
import { firestore, storage } from '../../firebase/firebase';

// REDUX
import { imgActions } from './image';

// ACTION
const LOAD = 'post/LOAD';
const CREATE = 'post/CREATE';
const POST_UPDATE = 'post/UPDATE';
const DELETE = 'post/DELETE';

// ACTION CREATOR
const getPost = createAction(LOAD, (postList) => ({ postList }));
const addPost = createAction(CREATE, (post) => ({ post }));
const updatePost = createAction(POST_UPDATE, (postId, post) => ({ postId, post }));

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
        postList = [...postList, { ...doc.data(), id: doc.id }];
      });

      dispatch(getPost(postList));
    });
  };
};

const addPostFB = (contents) => {
  return function (dispatch, getState, { history }) {
    const temp = getState().user.user;
    const userInfo = {
      userName: temp.name,
      userId: temp.uid,
      userProfile: temp.profile,
    };

    const _post = {
      contents,
      insertDt: moment().format('YYYY.MM.DD HH:mm'),
      commentCnt: 0,
      likeCnt: 0,
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
              .add({ userInfo, ..._post, imageUrl: url })
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

const updateCountFB = (postId, post) => {
  return function (dispatch) {
    if (!postId) return;

    postDB
      .doc(postId)
      .update(post)
      .then((doc) => {
        dispatch(updatePost(postId, { ...post }));
      });

    return;
  };
};

const updatePostFB = (postId, post) => {
  return function (dispatch, getState, { history }) {
    if (!postId) return;

    const image = getState().image.preview;
    const postIdx = getState().post.list.findIndex((p) => p.id === postId);
    const _post = getState().post.list[postIdx];

    if (image === _post.imageUrl) {
      postDB
        .doc(postId)
        .update(post)
        .then((doc) => {
          dispatch(updatePost(postId, { ...post }));
          history.replace('/');
        });

      return;
    }

    const userId = getState().user.user.uid;
    const upload = storage.ref(`images/${userId}_${Date.now()}`).putString(image, 'data_url');

    upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .then((url) => {
          postDB
            .doc(postId)
            .update({ ...post, imageUrl: url })
            .then((doc) => {
              dispatch(updatePost(postId, { ...post, imageUrl: url }));
              history.replace('/');
            });
        })
        .catch((error) => {
          console.error(error);
        });
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
        draft.list.unshift(action.payload.post);
      }),

    [POST_UPDATE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex((p) => p.id === action.payload.postId);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
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
  updatePostFB,
  updateCountFB,
};
