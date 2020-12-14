import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Box, Snackbar } from '@material-ui/core';
import SideBar from '../sideBar/SideBar';
import { makeStyles } from '@material-ui/core/styles';
import { MenuAppBar } from '..';
import Spinner from '../../components/spinner/Spinner';
import { authSelectors, authSlice } from '../../redux/auth';
import { contactsSelectors, contactsSlice } from '../../redux/contacts';
import GlobalCss from './globalCss';
import { lightTheme, darkTheme } from './theme';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
}));

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const initialTheme = localStorage.getItem('theme');
  const isDark = initialTheme === 'dark' ? true : false;
  const [darkState, setDarkState] = useState(isDark);
  const classes = useStyles();

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  let theme = darkState ? darkTheme : lightTheme;
  theme = responsiveFontSizes(theme);
  useEffect(() => {
    localStorage.setItem('theme', darkState ? 'dark' : 'light');
  }, [darkState]);
  const authLoading = useSelector(state => authSelectors.getLoading(state));
  const contactsLoading = useSelector(state =>
    contactsSelectors.getLoading(state),
  );
  const dispatch = useDispatch();
  const authError = useSelector(state => authSelectors.getError(state));
  const contactsError = useSelector(state => contactsSelectors.getError(state));
  const [alert, setAlert] = useState(false);

  const delay = 150000;

  useEffect(() => {
    let alertTimeout;
    if (authError || contactsError) {
      setAlert(true);

      alertTimeout = setTimeout(() => {
        setAlert(false);
        authError && dispatch(authSlice.error.actions.resetError());
        contactsError && dispatch(contactsSlice.error.actions.resetError());
      }, delay);
    }
    return () => alertTimeout && clearTimeout(alertTimeout);
  }, [authError, contactsError, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert(false);
    authError && dispatch(authSlice.error.actions.resetError());
    contactsError && dispatch(contactsSlice.error.actions.resetError());
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalCss />
      <ScopedCssBaseline>
        <div className={classes.wrapper}>
          <MenuAppBar
            isOpen={mobileOpen}
            onDrawerToggle={handleDrawerToggle}
            isDark={darkState}
            changeTheme={handleThemeChange}
          />

          <Box component="main" className={classes.mainContainer}>
            <div className={classes.toolbar} />
            <div className={classes.content}>
              <SideBar
                isOpen={mobileOpen}
                onDrawerToggle={handleDrawerToggle}
              />
              {children}
            </div>
          </Box>

          {authLoading || (contactsLoading && <Spinner />)}

          {authError && (
            <Snackbar
              open={alert}
              autoHideDuration={delay}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                elevation={6}
              >
                {authError}
              </Alert>
            </Snackbar>
          )}

          {contactsError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {contactsError}
            </Alert>
          )}
        </div>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
};

export default Layout;
