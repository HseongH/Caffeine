import React from 'react';

const Noti = (props) => {
  const { imageUrl, userName } = props;
  console.log(props);

  return (
    <div className="notice">
      <div className="user-profile">
        <img src={imageUrl} alt={userName} />
      </div>

      <p className="contents">
        <strong className="title">{userName}</strong>님이 게시글에{' '}
        <strong className="work">좋아요</strong>를 눌렀어요!!
      </p>
    </div>
  );
};

export default Noti;
