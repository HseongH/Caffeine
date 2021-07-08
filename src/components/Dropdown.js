import React, { useRef, useState } from 'react';

// COMPONENTS
import Button from './Button';

// ICON
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Dropdown = (props) => {
  const { children } = props;
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((preOpen) => !preOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;

    setOpen(false);
  };

  return (
    <>
      <Button clickEvent={handleToggle}>
        <MoreVertIcon ref={anchorRef} />
      </Button>

      <ClickAwayListener onClickAway={handleClose}>
        <ul className={open ? 'dropdown' : 'hide'}>{children}</ul>
      </ClickAwayListener>
    </>
  );
};

Dropdown.defaultProps = {};

export default Dropdown;
