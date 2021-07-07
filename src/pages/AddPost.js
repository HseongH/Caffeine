// LIBRARY
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch();
  const [contensts, setContents] = useState('');
  const uploading = useSelector((state) => state.image.uploading);
  const preview = useSelector((state) => state.image.preview);
  const fileInput = useRef();

  const addPost = () => {
    dispatch(postActions.addPostFB(contensts));
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

        <div className="preview">
          <img src={preview ? preview : 'http://via.placeholder.com/400x300'} alt="preview" />
        </div>

        <textarea
          className="input--text"
          placeholder="지금 무슨 생각을 하고 계신가요?"
          value={contensts}
          onChange={(event) => {
            setContents(event.target.value);
          }}
        ></textarea>

        <Button clickEvent={addPost}>작성완료</Button>
      </div>
    </section>
  );
};

export default AddPost;
