// LIBRARY
import React from 'react';

// COMPONENTS
import Button from '../components/Button';
import Contents from '../components/Contents';

// ICONS
import AddCircleIcon from '@material-ui/icons/AddCircle';

// STYLE
import '../style/scss/post.scss';

const Post = (props) => {
  return (
    <section className="section section--post">
      <div className="container">
        <div className="post create-post">
          <Button>
            <AddCircleIcon style={{ fontSize: 50 }} />
          </Button>

          <strong className="title">게시물 추가</strong>
        </div>

        <div className="post no-posts">
          <strong className="title">게시물 없음</strong>

          <p className="contents">게시물을 추가하여 사진이나 글을 공유해보세요.</p>

          <Button>게시물 추가</Button>
        </div>

        <Contents />
      </div>
    </section>
  );
};

Post.defaultProps = {};

export default Post;
