// LIBRARY
import React from 'react';

// COMPONENTS
import Layout from './Layout';
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
      <Layout sortHoz={'space-between'} width={'100%'} height={'100px'}>
        <h1>
          <Button>
            <AllInclusiveIcon style={{ fontSize: '30' }} />
          </Button>
        </h1>

        <Layout>
          <Button
            bg={'none'}
            color={'#ffbf69'}
            padding={'5px 20px'}
            width={'80px'}
            hoverBG={'#eee'}
          >
            <HomeIcon style={{ fontSize: '30' }} />
          </Button>

          <Button bg={'none'} color={'#000'} padding={'5px 20px'} width={'80px'} hoverBG={'#eee'}>
            <NoteAddIcon style={{ fontSize: '30' }} />
          </Button>
        </Layout>

        <Layout>
          <Button bg={'#ddd'} margin={'0 15px 0 0'} hoverBG={'#aaa'}>
            <NotificationsIcon />
          </Button>

          <Button bg={'#ddd'} hoverBG={'#aaa'}>
            <PersonIcon />
          </Button>
        </Layout>
      </Layout>
    </header>
  );
};

Header.defaultProps = {};

// const HeaderStyle = styled.header`
//   width: 100%;
//   position: fixed;
//   padding: 0 100px;
//   box-sizing: border-box;
//   background: #fff;
// `;

export default Header;
