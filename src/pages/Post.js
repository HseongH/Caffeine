// LIBRARY
import React from 'react';

// COMPONENTS
import Layout from '../components/Layout';
import Button from '../components/Button';
import Text from '../components/Text';

// ICONS
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Post = (props) => {
  return (
    <>
      <Layout radius={'10px'} bg={'#fff'} padding={'10px'} margin={'0 0 20px 0'} sortHoz={'left'}>
        <Button padding={0} bg={'none'} color={'#ffbf6966'} margin={'0 20px 0 0'}>
          <AddCircleIcon style={{ fontSize: 50 }} />
        </Button>

        <Text strong fontSize={'20px'}>
          게시물 추가
        </Text>
      </Layout>

      <Layout
        radius={'10px'}
        direction={'column'}
        sortHoz={'left'}
        bg={'#fff'}
        margin={'0 0 20px 0'}
        padding={'10px'}
      >
        <Text strong fontSize={'25px'}>
          게시물 없음
        </Text>

        <Text color={'#6c757d'}>게시물을 추가하여 사진이나 글을 공유해보세요.</Text>

        <Button>게시물 추가</Button>
      </Layout>
    </>
  );
};

Post.defaultProps = {};

export default Post;
