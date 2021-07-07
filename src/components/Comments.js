// LIBRARY
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import Button from './Button';
import Input from './Input';

// REDUX
import { commentActions } from '../redux/modules/comment';

// ICON
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';

const Comments = (props) => {
  const { postId } = props;

  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.list);
  const [contents, setContents] = useState('');

  const write = () => {
    if (!contents) return;

    dispatch(commentActions.addCommentFB(postId, contents));
    setContents('');
  };

  useEffect(() => {
    if (!commentList[postId]) {
      dispatch(commentActions.getCommentFB(postId));
    }
  }, []);

  return (
    <>
      <Input
        value={contents}
        changeEvent={(event) => {
          setContents(event.target.value);
        }}
        placeholder="댓글을 작성해 주세요."
        keyPressEvent={(event) => {
          if (event.key === 'Enter') {
            write();
          }
        }}
      />

      {commentList[postId] &&
        commentList[postId].map((elem) => {
          return (
            <div className="comment" key={elem.id}>
              <div className="user--info">
                <div className="info--left">
                  <div className="user-profile">
                    {elem.userProfile ? (
                      <img src={elem.userProfile} alt={elem.userName} />
                    ) : (
                      <PersonIcon />
                    )}
                  </div>

                  <div className="contents-box">
                    <strong className="user--name">{elem.userName}</strong>

                    <p className="contents">{elem.contents}</p>
                  </div>
                </div>

                <Button>
                  <MoreVertIcon style={{ fontSize: '18px' }} />
                </Button>
              </div>
            </div>
          );
        })}
    </>
  );
};

Comments.defaultProps = {
  postId: null,
};

export default Comments;
