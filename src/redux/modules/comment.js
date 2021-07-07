// LIBRARY
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';

// FIREBASE
import firebase from 'firebase';
import { firestore, realtime } from '../../firebase/firebase';
import { postActions } from './post';

// ACTION
const GET_COMMENT = 'GET_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const LOADING = 'LOADING';

// ACTION CREATOR
const getComment = createAction(GET_COMMENT, (postId, commentList) => ({ postId, commentList }));
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({ postId, comment }));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

// INITIAL STATE
const initialState = {
  list: {},
  isLoading: false,
};

// MIDDLEWARE
const commentDB = firestore.collection('comment');

const getCommentFB = (postId) => {
  return function (dispatch, getState, { history }) {
    if (!postId) return;

    commentDB
      .where('postId', '==', postId)
      .orderBy('insertDt', 'desc')
      .get()
      .then((docs) => {
        let list = [];

        docs.forEach((doc) => {
          list = [...list, { ...doc.data(), id: doc.id }];
        });

        dispatch(getComment(postId, list));
      })
      .catch((error) => {
        console.error('댓글 가져오기 실패!', error);
      });
  };
};

const addCommentFB = (postId, contents) => {
  return function (dispatch, getState, { history }) {
    const userInfo = getState().user.user;
    let comment = {
      postId,
      userId: userInfo.uid,
      userName: userInfo.name,
      userProfile: userInfo.profile,
      contents,
      insertDt: moment().format('YYYY.MM.DD hh:mm'),
    };

    commentDB.add(comment).then((doc) => {
      const postDB = firestore.collection('post');
      comment = { ...comment, id: doc.id };

      const post = getState().post.list.find((l) => l.id === postId);
      const increment = firebase.firestore.FieldValue.increment(1);

      postDB
        .doc(postId)
        .update({ commentCnt: increment })
        .then((_post) => {
          dispatch(addComment(postId, comment));

          if (post) {
            const notiItem = realtime.ref(`noti/${post.userInfo.userId}/list`).push();

            notiItem.set(
              {
                postId,
                userName: comment.userName,
                imageUrl: post.imageUrl,
                insertDt: comment.insertDt,
              },
              (error) => {
                if (error) console.error('알림 저장 실패', error);
                else {
                  const notiDB = realtime.ref(`noti/${post.userInfo.uid}`);
                  notiDB.update({ read: false });
                }
              }
            );
          }
        });
    });
  };
};

// REDUCER
export default handleActions(
  {
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.commentList;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        if (draft.list[action.payload.postId])
          draft.list[action.payload.postId].push(action.payload.comment);
        else draft.list[action.payload.postId] = action.payload.comment;
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
  },
  initialState
);

export const commentActions = {
  getComment,
  addComment,
  getCommentFB,
  addCommentFB,
};
