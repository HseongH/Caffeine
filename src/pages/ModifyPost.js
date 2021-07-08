import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// PAGES
import AddPost from './AddPost';

const ModifyPost = (props) => {
  const postId = useLocation().search.slice(1).split('=')[1];
  const [post] = useSelector((state) => state.post.list).filter((p) => p.id === postId);

  return <AddPost post={post} />;
};

ModifyPost.propTypes = {};

export default ModifyPost;
