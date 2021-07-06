import { useSelector } from 'react-redux';

// FIREBASE
import { apiKey } from '../firebase/firebase';

const useCheckLoggedIn = () => {
  const userInfo = useSelector((state) => state.user.user);
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const logInStatus = sessionStorage.getItem(sessionKey);

  return userInfo && logInStatus;
};

export default useCheckLoggedIn;
