// LIBRARY
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';

// FIREBASE
import firebase from 'firebase';
import { firestore, realtime } from '../../firebase/firebase';
import { postActions } from './post';

// ACTION
const GET_LIKE = 'GET_LIKE';
const ADD_LIKE = 'ADD_LIKE';
const REMOVE_LIKE = 'REMOVE_LIKE';

// ACTION CREATOR
const getLike = createAction(GET_LIKE, (postId, likeList) => ({ postId, likeList }));
const addLike = createAction(ADD_LIKE, (postId, like) => ({ postId, like }));
const removeLike = createAction(REMOVE_LIKE, (postId, likeId) => ({ postId, likeId }));

// INITIAL STATE
const initialState = {
  list: {},
};

// MIDDLEWARE
const likeDB = firestore.collection('like');

const getLikeFB = (postId) => {
  return function (dispatch, getState) {
    likeDB
      .where('postId', '==', postId)
      .orderBy('userId')
      .get()
      .then((docs) => {
        let list = [];

        docs.forEach((doc) => {
          list = [...list, { ...doc.data(), id: doc.id }];
        });

        dispatch(getLike(postId, list));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const addLikeFB = (postId) => {
  return function (dispatch, getState, { history }) {
    const userInfo = getState().user.user;
    let like = {
      postId,
      userId: userInfo.uid,
    };

    likeDB.add(like).then((doc) => {
      const postDB = firestore.collection('post');

      const post = getState().post.list.find((l) => l.id === postId);
      const increment = firebase.firestore.FieldValue.increment(1);

      like = { ...like, id: doc.id };

      postDB
        .doc(postId)
        .update({ likeCnt: increment })
        .then((_post) => {
          dispatch(addLike(postId, like));

          if (post) {
            dispatch(
              postActions.updateCountFB(postId, { ...post, likeCnt: parseInt(post.likeCnt) + 1 })
            );

            if (userInfo.uid !== post.userInfo.userId) {
              const notiItem = realtime.ref(`noti/${post.userInfo.userId}/list`).push();

              notiItem.set(
                {
                  postId,
                  userName: userInfo.name,
                  imageUrl: post.imageUrl,
                  insertDt: moment().format('YYYY.MM.DD HH:mm'),
                  action: '좋아요를 눌렀어요!!',
                },
                (error) => {
                  if (error) console.error('알림 저장 실패', error);
                  else {
                    const notiDB = realtime.ref(`noti/${post.userInfo.userId}`);
                    notiDB.update({ read: false });
                  }
                }
              );
            }
          }
        });
    });
  };
};

const removeLikeFB = (postId) => {
  return function (dispatch, getState, { history }) {
    const userInfo = getState().user.user;
    const [like] = getState().like.list[postId].filter((post) => post.userId === userInfo.uid);
    const likeId = like.id;

    likeDB
      .doc(likeId)
      .delete()
      .then(() => {
        const postDB = firestore.collection('post');

        const post = getState().post.list.find((l) => l.id === postId);
        const increment = firebase.firestore.FieldValue.increment(-1);

        postDB
          .doc(postId)
          .update({ likeCnt: increment })
          .then((_post) => {
            dispatch(removeLike(postId, likeId));
          })
          .catch((err) => {
            console.log(err);
          });

        if (post) {
          dispatch(
            postActions.updateCountFB(postId, { ...post, likeCnt: parseInt(post.likeCnt) - 1 })
          );
        }
      });
  };
};

// REDUCER
export default handleActions(
  {
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.likeList;
      }),

    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        if (draft.list[action.payload.postId])
          draft.list[action.payload.postId].push(action.payload.like);
        else draft.list[action.payload.postId] = action.payload.like;
      }),

    [REMOVE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = draft.list[action.payload.postId].filter(
          (elem) => elem.id !== action.payload.likeId
        );
      }),
  },
  initialState
);

export const likeActions = {
  getLikeFB,
  addLikeFB,
  removeLikeFB,
};
