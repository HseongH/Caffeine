import React from 'react';

// COMPONENTS
import Button from './Button';
import Comments from './Comments';

// ICON
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const Contents = (props) => {
  return (
    <div className="post real-post">
      <div className="user--info">
        <div className="info--left">
          <div className="user-profile"></div>

          <div className="info--text">
            <strong className="user--name">홍성훈</strong>
            <p className="contents time-of-posting">2021.07.06 09:54</p>
          </div>
        </div>

        <Button>
          <MoreVertIcon />
        </Button>
      </div>

      <p className="description">안녕하세요?</p>

      <div className="image-contents"></div>

      <div className="reaction">
        <div className="like">
          <Button>
            <EmojiEmotionsIcon />
          </Button>

          <strong className="contents like--counter">10</strong>
        </div>

        <strong className="comment--counter contents">댓글 10개</strong>
      </div>

      <Comments />
    </div>
  );
};

export default Contents;
