import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import { homeRoute, contactsRoute } from '../../routes';
import { authSelectors } from '../../redux/auth';

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.primary.contrastText,
  },
  navlink: {
    marginRight: '25px',
    lineHeight: 1,
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const isAuth = useSelector(state => authSelectors.isAuth(state));

  return (
    <>
      <NavLink
        to={homeRoute.path}
        exact={homeRoute.exact}
        className={classes.navlink}
      >
        <Tooltip title={homeRoute.label}>
          <HomeIcon className={classes.icon} />
        </Tooltip>
      </NavLink>
      {isAuth && (
        <NavLink
          to={contactsRoute.path}
          exact={contactsRoute.exact}
          className={classes.navlink}
        >
          <Tooltip title={contactsRoute.label}>
            <PhoneIcon className={classes.icon} />
          </Tooltip>
        </NavLink>
      )}
    </>
  );
};

export default Navigation;
