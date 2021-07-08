// LIBRARY
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import Input from './Input';
import Dropdown from './Dropdown';

// REDUX
import { commentActions } from '../redux/modules/comment';

// ICON
import PersonIcon from '@material-ui/icons/Person';

const Comments = (props) => {
  const { postId, show } = props;

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userId = state.user.user && state.user.user.uid;
  const commentList = state.comment.list;
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
    <div className={show ? '' : 'hide'}>
      {userId && (
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
      )}

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

                {userId === elem.userId && <Dropdown contents={['수정', '삭제']} />}
              </div>
            </div>
          );
        })}
    </div>
  );
};

Comments.defaultProps = {
  postId: null,
};

export default Comments;
