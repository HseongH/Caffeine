import React, { useRef, useState } from 'react';

// COMPONENTS
import Button from './Button';

// ICON
import MoreVertIcon from '@material-ui/icons/MoreVert';

const Dropdown = (props) => {
  const { contents } = props;
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

      <ul className={open ? 'dropdown' : 'hide'}>
        {contents.map((text, idx) => (
          <li key={idx + Date.now()} onClick={handleClose} className="down-items">
            {text}
          </li>
        ))}
      </ul>
    </>
  );
};

Dropdown.defaultProps = {};

export default Dropdown;
