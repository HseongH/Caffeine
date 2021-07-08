import React from 'react';

// ICON
import PersonIcon from '@material-ui/icons/Person';

const Noti = (props) => {
  const { imageUrl, userName, action } = props;

  return (
    <div className="notice">
      <div className="user-profile">
        {imageUrl ? <img src={imageUrl} alt={userName} /> : <PersonIcon />}
      </div>

      <p className="contents">
        <strong className="title">{userName}</strong>님이 게시글에{' '}
        <strong className="work">{action}</strong>
      </p>
    </div>
  );
};

export default Noti;
