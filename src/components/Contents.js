import React from 'react';

// COMPONENTS
import Button from './Button';
import Comments from './Comments';

// ICON
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import PersonIcon from '@material-ui/icons/Person';

const Contents = (props) => {
  const { postList } = props;

  return (
    <>
      {postList.map((post) => {
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

              <Button>
                <MoreVertIcon />
              </Button>
            </div>

            <p className="description">{post.contents}</p>

            <div className="image-contents">
              <img src={post.imageUrl} alt={post.contents} />
            </div>

            <div className="reaction">
              <div className="like">
                <Button>
                  <EmojiEmotionsIcon />
                </Button>

                <strong className="contents like--counter">10</strong>
              </div>

              <strong className="comment--counter contents">댓글 {post.commentCnt}개</strong>
            </div>

            <Comments postId={post.id} />
          </div>
        );
      })}
    </>
  );
};

export default Contents;
