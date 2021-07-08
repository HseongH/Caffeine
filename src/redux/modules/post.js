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
const POST_DELETE = 'post/DELETE';
const LOADING = 'post/LOADING';

// ACTION CREATOR
const getPost = createAction(LOAD, (postList, paging) => ({ postList, paging }));
const addPost = createAction(CREATE, (post) => ({ post }));
const updatePost = createAction(POST_UPDATE, (postId, post) => ({ postId, post }));
const delPost = createAction(POST_DELETE, (postId) => ({ postId }));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

// INITIAL STATE
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 5 },
  isLoading: false,
};

// MIDDLEWARE
const postDB = firestore.collection('post');

const getPostFB = (start = null, size = 5) => {
  return function (dispatch, getState) {
    const _paging = getState().post.paging;

    if (_paging.start && !_paging.next) return;

    dispatch(loading(true));

    let query = postDB.orderBy('insertDt', 'desc');

    if (start) query = query.startAt(start);

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let postList = [];

        let paging = {
          start: docs.docs[0],
          next: docs.docs.length === size + 1 ? docs.docs[docs.docs.length - 1] : null,
          size,
        };

        docs.forEach((doc) => {
          postList = [...postList, { ...doc.data(), id: doc.id }];
        });

        postList.pop();
        dispatch(getPost(postList, paging));
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

    if (image) {
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

      return;
    }

    postDB
      .add({ userInfo, ..._post })
      .then((doc) => {
        const post = { userInfo, ..._post, id: doc.id };

        dispatch(addPost(post));
        history.replace('/');
      })
      .catch((error) => {
        console.error('post 작성 실패!!!', error);
      });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch) {
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

    if (!image || image === _post.imageUrl) {
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

    if (image) {
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

      return;
    }
  };
};

export const removePostFB = (postId) => {
  return function (dispatch, getState) {
    if (!postId) return;

    postDB
      .doc(postId)
      .delete()
      .then(() => {
        dispatch(delPost(postId));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// REDUCER
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [...draft.list, ...action.payload.postList];
        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),

    [CREATE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [action.payload.post, ...draft.list];
      }),

    [POST_UPDATE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex((p) => p.id === action.payload.postId);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),

    [POST_DELETE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((post) => post.id !== action.payload.postId);
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState
);

export const postActions = {
  getPostFB,
  addPostFB,
  getOnePostFB,
  updatePostFB,
  updateCountFB,
  removePostFB,
};
