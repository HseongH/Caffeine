// LIBRARY
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Noti from '../components/Noti';
import { realtime } from '../firebase/firebase';

// STYLE
import '../style/scss/notice.scss';

const Notice = (props) => {
  const [noti, setNoti] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) return;

    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    const _noti = notiDB.orderByChild('insertDt');

    _noti.once('value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const notiList = Object.keys(data)
          .reverse()
          .map((l) => {
            return data[l];
          });

        setNoti(notiList);
      }
    });
  }, [user]);

  return (
    <section className="section section--notice">
      <div className="container">
        <h2 className="title">알림</h2>

        {!noti.length && <p className="contents no-notice">알림이 없습니다</p>}

        {noti.map((n, idx) => {
          return <Noti {...n} key={`noti_${idx}`} />;
        })}
      </div>
    </section>
  );
};

export default Notice;
