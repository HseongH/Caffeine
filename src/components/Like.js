// LIBRARY
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// COMPONENT
import Button from './Button';

// REDUX
import { likeActions } from '../redux/modules/like';

// HISTORY
import { history } from '../redux/configStore';

// ICON
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const Like = (props) => {
  const { postId, userId } = props;

  const dispatch = useDispatch();

  const postLike = useSelector((state) => state.like.list)[postId];
  const likeList = postLike && postLike.map((post) => post.userId);
  const [isLike, setIsLike] = useState(false);

  let like = likeList && likeList.includes(userId);

  const addLike = (postId) => {
    if (!userId) {
      const logIn = window.confirm(
        '로그인 후 이용할 수 있습니다. 확인 시 로그인 페이지로 이동합니다.'
      );
      if (logIn) history.push('/sign-in');
      return;
    }

    setIsLike(true);
    dispatch(likeActions.addLikeFB(postId));
  };

  const removeLike = (postId) => {
    if (!userId) {
      const logIn = window.confirm(
        '로그인 후 이용할 수 있습니다. 확인 시 로그인 페이지로 이동합니다.'
      );
      if (logIn) history.push('/sign-in');
      return;
    }

    like = false;
    setIsLike(false);
    dispatch(likeActions.removeLikeFB(postId));
  };

  useEffect(() => {
    dispatch(likeActions.getLikeFB(postId));
  }, []);

  return (
    <Button
      buttonClass={like || isLike ? 'btn active' : 'btn'}
      clickEvent={() => {
        like || isLike ? removeLike(postId) : addLike(postId);
      }}
    >
      <EmojiEmotionsIcon />
    </Button>
  );
};

Like.propTypes = {};

export default Like;
