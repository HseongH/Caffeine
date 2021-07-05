// LIBRARY
import React from 'react';

// COMPONENTE
import Button from '../components/Button';

// STYLE
import '../style/scss/addPost.scss';

// ICON
import ImageIcon from '@material-ui/icons/Image';

const AddPost = (props) => {
  return (
    <section className="section section--add-post">
      <div className="container">
        <h2 className="title">게시물 만들기</h2>

        <div className="file-box">
          <label className="label--file" htmlFor="upload-file">
            이미지 업로드 <ImageIcon />
          </label>
          <input id="upload-file" className="input--file" type="file" accept="image/*" />
        </div>

        <div className="preview"></div>

        <textarea className="input--text" placeholder="지금 무슨 생각을 하고 계신가요?"></textarea>

        <Button disabled={true}>작성완료</Button>
      </div>
    </section>
  );
};

export default AddPost;
