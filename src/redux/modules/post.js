// LIBRARY
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

// FIREBASE
import firebase from 'firebase/app';
import { auth } from '../../firebase/firebase';

// ACTION
const LOAD = 'post/LOAD';
const CREATE = 'post/CREATE';

// ACTION CREATOR
const getPost = createAction(LOAD, (postList) => ({ postList }));
const addPost = createAction(CREATE, (post) => ({ post }));

const initialPost = {
  user: {
    id: 0,
    name: 'mean0',
    profile: 'https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg',
  },
  imageUrl: 'https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg',
  contents: '고양이네요!',
  commentCnt: 10,
  insertDt: '2021-02-27 10:00:00',
};

// INITIAL STATE
const initialState = {
  list: [initialPost],
};

// MIDDLEWARE

// REDUCER
export default handleActions(
  {
    [LOAD]: (state, action) => produce(state, (draft) => {}),

    [CREATE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

export const postActions = {
  getPost,
  addPost,
};
