// LIBRARY
import React from 'react';
import { useDispatch } from 'react-redux';

// COMPONENTS
import Button from './Button';
import Permit from '../common/Permit';

// REDUX
import { userActions } from '../redux/modules/user';

// HISTORY
import { history } from '../redux/configStore';

// FUNCTION
import useCheckLoggedIn from '../common/checkLoggedIn';

// ICONS
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import HomeIcon from '@material-ui/icons/Home';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonIcon from '@material-ui/icons/Person';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Header = React.memo((props) => {
  const dispatch = useDispatch();

  return (
    <header className="section">
      <div className="container">
        <h1 className="logo">
          <Button>
            <AllInclusiveIcon style={{ fontSize: '30' }} />
          </Button>
        </h1>

        <div className="tab-menu">
          <Button>
            <HomeIcon style={{ fontSize: '30' }} />
          </Button>

          <Permit>
            <Button
              clickEvent={() => {
                history.push('/add-post');
              }}
            >
              <NoteAddIcon style={{ fontSize: '30' }} />
            </Button>
          </Permit>
        </div>

        <div className="user-info">
          {useCheckLoggedIn() ? (
            <>
              <Button>
                <Badge color="secondary" badgeContent={0}>
                  <NotificationsIcon />
                </Badge>
              </Button>

              <Button>
                <PersonIcon />
              </Button>

              <Button
                clickEvent={() => {
                  dispatch(userActions.logOutFB());
                }}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <Button
              clickEvent={() => {
                history.push('/sign-in');
              }}
            >
              로그인 / 회원가입
            </Button>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
