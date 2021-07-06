import React from 'react';

// COMPONENTS
import Button from './Button';
import Comments from './Comments';

// ICON
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const Contents = (props) => {
  const { postList } = props;

  return (
    <>
      {postList.map((post) => {
        return (
          <div className="post real-post" key={post.user.id}>
            <div className="user--info">
              <div className="info--left">
                <div className="user-profile"></div>

                <div className="info--text">
                  <strong className="user--name">{post.user.name}</strong>
                  <p className="contents time-of-posting">{post.insertDt}</p>
                </div>
              </div>

              <Button>
                <MoreVertIcon />
              </Button>
            </div>

            <p className="description">{post.comments}</p>

            <div className="image-contents"></div>

            <div className="reaction">
              <div className="like">
                <Button>
                  <EmojiEmotionsIcon />
                </Button>

                <strong className="contents like--counter">10</strong>
              </div>

              <strong className="comment--counter contents">댓글 {post.commentCnt}개</strong>
            </div>

            <Comments />
          </div>
        );
      })}
    </>
  );
};

export default Contents;
