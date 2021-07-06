// LIBRARY
import React from 'react';

// COMPONENTS
import Noti from '../components/Noti';

// STYLE
import '../style/scss/notice.scss';

const Notice = (props) => {
  return (
    <section className="section section--notice">
      <div className="container">
        <h2 className="title">알림</h2>

        {/* <p className="contents no-notice">알림이 없습니다</p> */}

        <Noti />
        <Noti />
        <Noti />
      </div>
    </section>
  );
};

export default Notice;
