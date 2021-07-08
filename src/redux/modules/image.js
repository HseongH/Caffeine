// LIBRARY
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

// FIREBASE
import { storage } from '../../firebase/firebase';

// ACTION
const UPLOADING = 'UPLOADING';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
const SET_PREVIEW = 'SET_PREVIEW';

// ACTION CREATOR
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (imgUrl) => ({ imgUrl }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// INITIAL STATE
const initialState = {
  imageUrl: 'http://via.placeholder.com/400x300',
  uploading: false,
  preview: null,
};

// MIDDLEWARE
const uploadImageFB = (image) => {
  return function (dispatch) {
    dispatch(uploading(true));

    const upload = storage.ref(`images/${image.name}`).put(image);

    upload
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          dispatch(uploadImage(url));
        });
      })
      .catch((error) => {
        dispatch(uploading(false));
      });
  };
};

// REDUCER
export default handleActions(
  {
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),

    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.imageUrl = action.payload.imageUrl;
        draft.uploading = action.payload.uploading;
      }),

    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

export const imgActions = {
  uploadImage,
  uploadImageFB,
  setPreview,
};
