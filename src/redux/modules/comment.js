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
const DELETE_COMMENT = 'DELETE_COMMENT';
const LOADING = 'LOADING';

// ACTION CREATOR
const getComment = createAction(GET_COMMENT, (postId, commentList) => ({ postId, commentList }));
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({ postId, comment }));
const delComment = createAction(DELETE_COMMENT, (postId, commentId) => ({ postId, commentId }));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

// INITIAL STATE
const initialState = {
  list: {},
  isLoading: false,
};

// MIDDLEWARE
const commentDB = firestore.collection('comment');

const getCommentFB = (postId) => {
  return function (dispatch) {
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
  return function (dispatch, getState) {
    const userInfo = getState().user.user;
    let comment = {
      postId,
      userId: userInfo.uid,
      userName: userInfo.name,
      userProfile: userInfo.profile,
      contents,
      insertDt: moment().format('YYYY.MM.DD HH:mm:ss'),
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
            dispatch(
              postActions.updateCountFB(postId, {
                ...post,
                commentCnt: parseInt(post.commentCnt) + 1,
              })
            );

            if (userInfo.uid !== post.userInfo.userId) {
              const notiItem = realtime.ref(`noti/${post.userInfo.userId}/list`).push();

              notiItem.set(
                {
                  postId,
                  userName: comment.userName,
                  imageUrl: post.imageUrl ? post.imageUrl : '',
                  insertDt: comment.insertDt,
                  action: '댓글을 남겼어요!!',
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

const delCommentDB = (postId, commentId) => {
  return function (dispatch, getState) {
    if (!commentId) return;

    commentDB
      .doc(commentId)
      .delete()
      .then(() => {
        const postDB = firestore.collection('post');

        const post = getState().post.list.find((l) => l.id === postId);
        const increment = firebase.firestore.FieldValue.increment(-1);

        postDB
          .doc(postId)
          .update({ commentCnt: increment })
          .then((_post) => {
            dispatch(delComment(postId, commentId));

            if (post) {
              dispatch(
                postActions.updateCountFB(postId, {
                  ...post,
                  commentCnt: parseInt(post.commentCnt) - 1,
                })
              );
            }
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
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.commentList;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = draft.list[action.payload.postId]
          ? [action.payload.comment, ...draft.list[action.payload.postId]]
          : [action.payload.comment];
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = draft.list[action.payload.postId].filter(
          (comment) => comment.id !== action.payload.commentId
        );
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
  delCommentDB,
};
