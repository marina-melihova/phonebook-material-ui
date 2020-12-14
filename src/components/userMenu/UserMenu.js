import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { MenuItem, Menu, IconButton, Link, Tooltip } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { authOperations } from '../../redux/auth';
import { profileRoute } from '../../routes';

const UserMenu = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Tooltip title="Account">
          <AccountCircle />
        </Tooltip>
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <Link
          to={profileRoute.path}
          component={RouterLink}
          color="textPrimary"
          underline="none"
        >
          <MenuItem onClick={handleClose}>{profileRoute.label}</MenuItem>
        </Link>
        <MenuItem onClick={() => dispatch(authOperations.logout())}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
