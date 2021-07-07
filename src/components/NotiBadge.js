// LIBRARY
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// ICON
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

// FIREBASE
import { realtime } from '../firebase/firebase';

// HISTORY
import { history } from '../redux/configStore';

const NotiBadge = (props) => {
  const [isRead, setIsRead] = useState(true);
  const userId = useSelector((state) => state.user.user.uid);
  const notiDB = realtime.ref(`noti/${userId}`);

  const notiCheck = () => {
    notiDB.update({ read: true });

    history.push('/notice');
  };

  useEffect(() => {
    notiDB.on('value', (snapshot) => {
      snapshot.val() && setIsRead(snapshot.val().read);
    });

    return () => notiDB.off();
  }, []);

  return (
    <Badge color="secondary" badgeContent={0} showZero={isRead} onClick={notiCheck}>
      <NotificationsIcon />
    </Badge>
  );
};

NotiBadge.defaultProps = {};

export default NotiBadge;
