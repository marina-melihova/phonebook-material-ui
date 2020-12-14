import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MenuItem,
  Menu,
  IconButton,
  SvgIcon,
  Tooltip,
} from '@material-ui/core';
import { registerRoute, loginRoute } from '../../routes';

const AuthNav = () => {
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
        aria-controls="auth-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Tooltip title="Login">
          <SvgIcon>
            <use href="#login"></use>
          </SvgIcon>
        </Tooltip>
      </IconButton>
      <Menu
        id="auth-menu"
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
        <NavLink to={loginRoute.path} exact={loginRoute.exact}>
          <MenuItem onClick={handleClose}>{loginRoute.label}</MenuItem>
        </NavLink>
        <NavLink to={registerRoute.path} exact={registerRoute.exact}>
          <MenuItem onClick={handleClose}>{registerRoute.label}</MenuItem>
        </NavLink>
      </Menu>
    </div>
  );
};

export default AuthNav;
