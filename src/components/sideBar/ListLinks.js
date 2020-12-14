import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  SvgIcon,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import NotesIcon from '@material-ui/icons/Notes';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';
import { authSelectors, authOperations } from '../../redux/auth';
import {
  registerRoute,
  loginRoute,
  contactsRoute,
  homeRoute,
  profileRoute,
} from '../../routes';
import { ListItemLink } from '..';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  avatar: {
    margin: theme.spacing(2) + 'px auto',
    backgroundColor: theme.palette.secondary.main,
  },
  name: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

const ListLinks = () => {
  const classes = useStyles();
  const isGetUser = useRef(false);
  const dispatch = useDispatch();
  const name = useSelector(state => authSelectors.getUserName(state));
  if (name) {
    isGetUser.current = true;
  }

  const isAuth = useSelector(state => authSelectors.isAuth(state));
  const loginIcon = (
    <SvgIcon className={classes.icon}>
      <use href="#login"></use>
    </SvgIcon>
  );
  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      {isAuth && (
        <>
          <Avatar alt={name} className={classes.avatar}>
            {isGetUser.current && name[0].toUpperCase()}
          </Avatar>
          <p className={classes.name}> {name} </p>
          <Divider />
        </>
      )}
      <List>
        <ListItemLink
          icon={<HomeIcon />}
          primary="Home"
          to={homeRoute.path}
        ></ListItemLink>
        {isAuth ? (
          <>
            <ListItemLink
              icon={<NotesIcon />}
              primary="Contacts"
              to={contactsRoute.path}
            ></ListItemLink>
            <ListItemLink
              icon={<AccountBoxIcon />}
              primary="My profile"
              to={profileRoute.path}
            ></ListItemLink>

            <ListItem
              component="li"
              button
              key="Logout"
              onClick={() => dispatch(authOperations.logout())}
            >
              <ListItemIcon>
                <SvgIcon className={classes.icon}>
                  <use href="#logout"></use>
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItemLink
              icon={<AccountBoxIcon />}
              primary="Registration"
              to={registerRoute.path}
            ></ListItemLink>
            <ListItemLink
              icon={loginIcon}
              primary="Sign in"
              to={loginRoute.path}
            ></ListItemLink>
          </>
        )}
      </List>
    </>
  );
};

export default ListLinks;
