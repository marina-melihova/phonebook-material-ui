import React from 'react';
import { Hidden, Drawer, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListLinks from './ListLinks';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
    overflowX: 'hidden',
    transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SideBar = ({ isOpen, onDrawerToggle }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <nav className={classes.drawer} aria-label="main pages">
      <Hidden smUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={isOpen}
          onClose={onDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <ListLinks />
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <ListLinks />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default SideBar;
