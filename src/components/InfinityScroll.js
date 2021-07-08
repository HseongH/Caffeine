// LIBRARY
import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';

// COMPONENT
// import Spinner from './Spinner';

const InfinityScroll = (props) => {
  const { children, callNext, isNext, loading } = props;

  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 50) {
      if (loading) return;

      callNext();
    }
  }, 300);

  const handleScroll = useCallback(_handleScroll, [loading]);

  useEffect(() => {
    if (loading) return;

    if (isNext) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => window.addEventListener('scroll', handleScroll);
  }, [isNext, loading]);

  return <>{children}</>;
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  isNext: false,
  loading: false,
};

export default InfinityScroll;
