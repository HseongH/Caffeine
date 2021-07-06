import React from 'react';

// COMPONENTS
import Button from './Button';
import Input from './Input';

// ICON
import MoreVertIcon from '@material-ui/icons/MoreVert';

const Comments = (props) => {
  return (
    <>
      <Input placeholder="댓글을 작성해 주세요." />

      <div className="comment">
        <div className="user--info">
          <div className="info--left">
            <div className="user-profile"></div>

            <div className="contents-box">
              <strong className="user--name">홍성훈</strong>

              <p className="contents">안녕하세요 ㅎㅎ</p>
            </div>
          </div>

          <Button>
            <MoreVertIcon style={{ fontSize: '18px' }} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Comments;
