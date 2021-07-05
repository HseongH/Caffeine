// LIBRARY
import React from 'react';

// COMPONENTS
import Button from './Button';

// ICONS
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import HomeIcon from '@material-ui/icons/Home';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Header = (props) => {
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

          <Button>
            <NoteAddIcon style={{ fontSize: '30' }} />
          </Button>
        </div>

        <div className="user-info">
          <Button>
            <NotificationsIcon />
          </Button>

          <Button>
            <PersonIcon />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
