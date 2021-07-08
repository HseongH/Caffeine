// LIBRARY
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// REDUX
import { commentActions } from '../redux/modules/comment';

// COMPONENTS
import Dropdown from './Dropdown';

// ICON
import PersonIcon from '@material-ui/icons/Person';

const Comments = (props) => {
  const { postId } = props;

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const userId = state.user.user && state.user.user.uid;
  const commentList = state.comment.list;

  const removeComment = (commentId) => {
    dispatch(commentActions.delCommentDB(postId, commentId));
  };

  useEffect(() => {
    if (!commentList[postId]) {
      dispatch(commentActions.getCommentFB(postId));
    }
  }, []);

  return (
    <>
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

                {userId === elem.userId && (
                  <Dropdown>
                    <li
                      className="down-items"
                      onClick={() => {
                        removeComment(elem.id);
                      }}
                    >
                      삭제
                    </li>
                  </Dropdown>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};

Comments.propTypes = {};

export default Comments;
