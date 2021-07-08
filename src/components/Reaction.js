// LIBRARY
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import Input from './Input';
import Like from './Like';
import Comments from './Comments';

// REDUX
import { commentActions } from '../redux/modules/comment';

const Reaction = (props) => {
  const { index, post } = props;

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const userId = state.user.user && state.user.user.uid;
  const [contents, setContents] = useState('');

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((show) => !show);
  };

  const addComment = () => {
    if (!contents) return;

    dispatch(commentActions.addCommentFB(post.id, contents));
    setContents('');
  };

  return (
    <>
      <div className="reaction">
        <div className="like">
          <Like postId={post.id} userId={userId} idx={index} />

          <strong className="contents like--counter">{post.likeCnt}</strong>
        </div>

        <strong onClick={handleToggle} className="comment--counter contents">
          댓글 {post.commentCnt}개
        </strong>
      </div>

      <div className={open ? 'comment-box' : 'comment-box hide'}>
        {userId && (
          <Input
            value={contents}
            changeEvent={(event) => {
              setContents(event.target.value);
            }}
            placeholder="댓글을 작성해 주세요."
            keyPressEvent={(event) => {
              if (event.key === 'Enter') {
                addComment();
              }
            }}
          />
        )}

        <Comments postId={post.id} />
      </div>
    </>
  );
};

Reaction.defaultProps = {
  postId: null,
};

export default Reaction;
