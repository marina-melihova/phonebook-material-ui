import { withStyles } from '@material-ui/core/styles';
const GlobalCss = withStyles({
  '@global': {
    '.MuiSnackbar-anchorOriginTopRight': {
      top: '64px',
      '@media (min-width:0px) and (orientation: landscape)': {
        top: '56px',
      },
      '@media (min-width:600px)': {
        top: '74px',
      },
    },
  },
})(() => null);

export default GlobalCss;
