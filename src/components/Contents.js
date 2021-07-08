import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENTS
import Reaction from './Reaction';
import Dropdown from './Dropdown';

// REDUX
import { postActions } from '../redux/modules/post';

// HISTORY
import { history } from '../redux/configStore';

// ICON
import PersonIcon from '@material-ui/icons/Person';

const Contents = (props) => {
  const dispatch = useDispatch();

  const { postList } = props;

  const state = useSelector((state) => state);
  const userInfo = state.user.user;
  const userId = userInfo && userInfo.uid;

  const removePost = (postId) => {
    dispatch(postActions.removePostFB(postId));
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

              {userId === post.userInfo.userId && (
                <Dropdown>
                  <li
                    onClick={() => {
                      history.push(`/modify-post?id=${post.id}`);
                    }}
                    className="down-items"
                  >
                    수정
                  </li>
                  <li
                    className="down-items"
                    onClick={() => {
                      removePost(post.id);
                    }}
                  >
                    삭제
                  </li>
                </Dropdown>
              )}
            </div>

            <p className="description">{post.contents}</p>

            {post.imageUrl && (
              <div className="image-contents">
                <img src={post.imageUrl} alt={post.contents} />
              </div>
            )}

            <Reaction post={post} index={idx} />
          </div>
        );
      })}
    </>
  );
};

export default Contents;
