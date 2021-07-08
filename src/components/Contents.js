import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Comments from './Comments';
import Dropdown from './Dropdown';
import Like from './Like';

// ICON
import PersonIcon from '@material-ui/icons/Person';

const Contents = (props) => {
  const { postList } = props;

  const state = useSelector((state) => state);
  const userInfo = state.user.user;
  const userId = userInfo && userInfo.uid;

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((show) => !show);
  };

  return (
    <>
      {postList.map((post, idx) => {
        return (
          <div className="post real-post" key={post.id}>
            <div className="user--info">
              <div className="info--left">
                <div className="user-profile">
                  {post.userInfo.userProfile ? (
                    <img src={post.userInfo.userProfile} alt={post.userInfo.userName} />
                  ) : (
                    <PersonIcon />
                  )}
                </div>

                <div className="info--text">
                  <strong className="user--name">{post.userInfo.userName}</strong>
                  <p className="contents time-of-posting">{post.insertDt}</p>
                </div>
              </div>

              {userId === post.userInfo.userId && <Dropdown contents={['수정', '삭제']} />}
            </div>

            <p className="description">{post.contents}</p>

            <div className="image-contents">
              <img src={post.imageUrl} alt={post.contents} />
            </div>

            <div className="reaction">
              <div className="like">
                <Like postId={post.id} userId={post.userInfo.userId} idx={idx} />

                <strong className="contents like--counter">{post.likeCnt}</strong>
              </div>

              <strong onClick={handleToggle} className="comment--counter contents">
                댓글 {post.commentCnt}개
              </strong>
            </div>

            <Comments show={open} postId={post.id} />
          </div>
        );
      })}
    </>
  );
};

export default Contents;
