// LIBRARY
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// COMPONENTS
import Button from '../components/Button';
import Contents from '../components/Contents';
import Permit from '../common/Permit';
import InfinityScroll from '../components/InfinityScroll';

// REDUX
import { postActions } from '../redux/modules/post';

// HISTORY
import { history } from '../redux/configStore';

// ICONS
import AddCircleIcon from '@material-ui/icons/AddCircle';

// STYLE
import '../style/scss/post.scss';

const Post = (props) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const postList = state.post.list;
  const isLoading = state.post.isLoading;
  const paging = state.post.paging;

  useEffect(() => {
    if (!postList.length) dispatch(postActions.getPostFB());
  }, []);

  return (
    <section className="section section--post">
      <div className="container">
        <Permit>
          <div className="post create-post">
            <Button
              clickEvent={() => {
                history.push('/add-post');
              }}
            >
              <AddCircleIcon style={{ fontSize: 50 }} />
            </Button>

            <strong className="title">게시물 추가</strong>
          </div>
        </Permit>

        {!postList.length ? (
          <div className="post no-posts">
            <strong className="title">게시물 없음</strong>

            <p className="contents">게시물을 추가하여 사진이나 글을 공유해보세요.</p>
            <Permit>
              <Button
                clickEvent={() => {
                  history.push('/add-post');
                }}
              >
                게시물 추가
              </Button>
            </Permit>
          </div>
        ) : (
          <InfinityScroll
            callNext={() => {
              dispatch(postActions.getPostFB(paging.next));
            }}
            isNext={paging.next ? true : false}
            loading={isLoading}
          >
            <Contents postList={postList} />
          </InfinityScroll>
        )}
      </div>
    </section>
  );
};

Post.defaultProps = {};

export default Post;
