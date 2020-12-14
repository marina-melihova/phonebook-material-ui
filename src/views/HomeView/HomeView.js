import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Box,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { registerRoute, loginRoute, contactsRoute } from '../../routes';
import { authSelectors } from '../../redux/auth';
import useStyles from './styles';

const HomeView = () => {
  const classes = useStyles();
  const isAuth = useSelector(state => authSelectors.isAuth(state));

  return (
    <Card className={classes.content}>
      <Box className={classes.wrapper}>
        <div className={classes.text}>
          <Typography component="h2" variant="h5" className={classes.title}>
            Manage contacts using the Phonebook-app
          </Typography>

          <Typography component="p">
            Struggling to stay organized with all of your contacts? This
            Phonebook-app can help. It can do so much to make your life more
            efficient and dynamic:
          </Typography>
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText className={classes.itemText}>
                Create a new contact
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText className={classes.itemText}>
                Edit contacts in your list
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText className={classes.itemText}>
                Search for contacts in your list by name
              </ListItemText>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText className={classes.itemText}>
                Delete any contact from your list
              </ListItemText>
            </ListItem>
          </List>
          <Typography component="p">
            {!isAuth ? (
              <>
                <Link component={RouterLink} to={registerRoute.path}>
                  Register
                </Link>
                {'  '}
                your account or
                <Link component={RouterLink} to={loginRoute.path}>
                  {'  '}
                  Log in
                </Link>
              </>
            ) : (
              <Link component={RouterLink} to={contactsRoute.path}>
                My Phonebook
              </Link>
            )}
          </Typography>
        </div>
        <svg className={classes.icon}>
          <use href="#phonebook"></use>
        </svg>
      </Box>
    </Card>
  );
};

export default HomeView;
