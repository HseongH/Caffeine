// LIBRARY
import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Button from '../components/Button';
import Contents from '../components/Contents';
import Permit from '../common/Permit';

// ICONS
import AddCircleIcon from '@material-ui/icons/AddCircle';

// STYLE
import '../style/scss/post.scss';

const Post = (props) => {
  const postList = useSelector((state) => state.post.list);

  return (
    <section className="section section--post">
      <div className="container">
        <Permit>
          <div className="post create-post">
            <Button>
              <AddCircleIcon style={{ fontSize: 50 }} />
            </Button>

            <strong className="title">게시물 추가</strong>
          </div>
        </Permit>

        {!postList.length ? (
          <div className="post no-posts">
            <strong className="title">게시물 없음</strong>

            <Permit>
              <p className="contents">게시물을 추가하여 사진이나 글을 공유해보세요.</p>

              <Button>게시물 추가</Button>
            </Permit>
          </div>
        ) : (
          <Contents postList={postList} />
        )}
      </div>
    </section>
  );
};

Post.defaultProps = {};

export default Post;
