import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      padding: '30px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '50px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '100px',
    },
  },
  wrapper: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  toolbar: theme.mixins.toolbar,
  text: {
    marginBottom: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      marginRight: '35px',
      marginBottom: 0,
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: '60%',
    },
  },

  list: {
    listStylePosition: 'inside',
    marginBottom: '25px',
  },
  listItem: {
    paddingTop: '2px',
    paddingBottom: '2px',
    paddingLeft: 0,
  },
  itemText: {
    margin: 0,
  },
  title: {
    marginBottom: '50px',
    // color: theme.palette.text.primary,
  },
  icon: {
    fill: theme.palette.primary.main,
    minWidth: '150px',
    minHeight: '150px',
    [theme.breakpoints.up('lg')]: {
      minWidth: '300px',
      minHeight: '300px',
    },
  },
}));

export default useStyles;
