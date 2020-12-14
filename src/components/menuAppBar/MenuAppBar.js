import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { Navigation, UserMenu, AuthNav } from '..';
import { authSelectors } from '../../redux/auth';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    paddingLeft: '15px',
    textAlign: 'left',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '35px',
    },
  },
  btn: {
    marginRight: '5px',
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const MenuAppBar = ({ onDrawerToggle, isDark, changeTheme }) => {
  const isAuth = useSelector(state => authSelectors.isAuth(state));
  const icon = isDark ? <Brightness5Icon /> : <Brightness4Icon />;
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Phonebook
          </Typography>
          <nav className={classes.navbar}>
            <Navigation />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="mode"
              onClick={changeTheme}
              className={classes.btn}
            >
              <Tooltip title="Theme">
                <icon.type className={classes.icon} />
              </Tooltip>
            </IconButton>
            {isAuth ? <UserMenu /> : <AuthNav />}
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MenuAppBar;
