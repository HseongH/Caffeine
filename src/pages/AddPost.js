// LIBRARY
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

// COMPONENTE
import Button from '../components/Button';

// REDUX
import { postActions } from '../redux/modules/post';
import { imgActions } from '../redux/modules/image';

// STYLE
import '../style/scss/addPost.scss';

// ICON
import ImageIcon from '@material-ui/icons/Image';

const AddPost = (props) => {
  const { post } = props;

  const dispatch = useDispatch();
  const currentPage = useLocation().pathname === '/add-post';

  const [contents, setContents] = useState(post ? post.contents : '');

  const imageState = useSelector((state) => state.image);
  const uploading = imageState.uploading;
  const preview = post && !imageState.preview ? post.imageUrl : imageState.preview;

  const fileInput = useRef();

  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
    fileInput.current.value = '';
    dispatch(imgActions.setPreview(null));
  };

  const modifyPost = (postId, post) => {
    const newPost = { ...post, contents };

    dispatch(imgActions.setPreview(preview));
    dispatch(postActions.updatePostFB(postId, newPost));
  };

  const selectFile = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = () => {
      dispatch(imgActions.setPreview(reader.result));
    };
  };

  return (
    <section className="section section--add-post">
      <div className="container">
        <h2 className="title">게시물 만들기</h2>

        <div className="file-box">
          <label className="label--file" htmlFor="upload-file">
            이미지 업로드 <ImageIcon />
          </label>
          <input
            id="upload-file"
            ref={fileInput}
            className="input--file"
            type="file"
            accept="image/*"
            onChange={selectFile}
            disabled={uploading}
          />
        </div>

        {preview && (
          <div className="preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        <textarea
          className="input--text"
          placeholder="지금 무슨 생각을 하고 계신가요?"
          value={contents}
          onChange={(event) => {
            setContents(event.target.value);
          }}
        ></textarea>

        <Button
          clickEvent={() => {
            currentPage ? addPost() : modifyPost(post.id, post);
          }}
        >
          {currentPage ? '작성완료' : '수정완료'}
        </Button>
      </div>
    </section>
  );
};

export default AddPost;
