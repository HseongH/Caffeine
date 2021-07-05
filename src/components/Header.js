// LIBRARY
import React from 'react';
import styled from 'styled-components';

// COMPONENTS
import Layout from './Layout';
import Button from './Button';

// ICONS
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';

const Header = (props) => {
  return (
    <HeaderStyle>
      <Layout sortHoz={'space-between'} width={'100%'} height={'100px'}>
        <h1>
          <Button>
            <AllInclusiveIcon style={{ fontSize: '30' }} />
          </Button>
        </h1>

        <Layout>
          <Button bg={'none'} color={'#000'} padding={'5px 20px'} width={'120px'} hoverBG={'#eee'}>
            <HomeOutlinedIcon style={{ fontSize: '30' }} />
          </Button>

          <Button bg={'none'} color={'#000'} padding={'5px 20px'} width={'120px'} hoverBG={'#eee'}>
            <NoteAddOutlinedIcon style={{ fontSize: '30' }} />
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
    </HeaderStyle>
  );
};

Header.defaultProps = {};

const HeaderStyle = styled.header`
  width: 100%;
  position: fixed;
  padding: 0 100px;
  box-sizing: border-box;
  background: #fff;
`;

export default Header;
