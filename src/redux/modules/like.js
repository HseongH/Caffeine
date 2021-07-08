// LIBRARY
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

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
      userName: userInfo.name,
      userProfile: userInfo.profile,
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
            //     const notiItem = realtime.ref(`noti/${post.userInfo.userId}/list`).push();

            //     notiItem.set(
            //       {
            //         postId,
            //         userName: comment.userName,
            //         imageUrl: post.imageUrl,
            //         insertDt: comment.insertDt,
            //       },
            //       (error) => {
            //         if (error) console.error('알림 저장 실패', error);
            //         else {
            //           const notiDB = realtime.ref(`noti/${post.userInfo.uid}`);
            //           notiDB.update({ read: false });
            //         }
            //       }
            //     );
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

    // likeDB.add(like).then((doc) => {
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
          // const notiItem = realtime.ref(`noti/${post.userInfo.userId}/list`).push();

          // notiItem.set(
          //   {
          //     postId,
          //     userName: comment.userName,
          //     imageUrl: post.imageUrl,
          //     insertDt: comment.insertDt,
          //   },
          //   (error) => {
          //     if (error) console.error('알림 저장 실패', error);
          //     else {
          //       const notiDB = realtime.ref(`noti/${post.userInfo.uid}`);
          //       notiDB.update({ read: false });
          //     }
          //   }
          // );
        }
      });
    // });
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
