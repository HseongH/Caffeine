import React from 'react';

const Noti = (props) => {
  return (
    <div className="notice">
      <div className="user-profile"></div>

      <p className="contents">
        <strong className="title">홍성훈</strong>님이 게시글에{' '}
        <strong className="work">좋아요</strong>를 눌렀어요!!
      </p>
    </div>
  );
};

export default Noti;
