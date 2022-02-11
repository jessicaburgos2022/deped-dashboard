import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFC000',
      dark: '#333',
    },
    secondary: {
      main: '#19857b',
    },
    action: {
      main: '#B6244F',
    },
    bapiModule: {
      main: '',
      light: '',
      dark: '#fff'
    }
  },
  typography: {
    fontFamily: `"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: '#000',
        '&:hover': {
          backgroundColor: '#f2b601',
        },
      },
    },
    MuiInputBase: {
      input: {
        height: '1rem'
      }
    },
    MuiTextField: {
      root: {
        "& .MuiInputBase-root": {
          "& input": {
            fontSize: '1rem'
          }
        },
        "& .MuiFormLabel-root": {
          textAlign: "center",
          fontSize: '.8rem'
        }
      }
    },
    MuiTableCell: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
      },
      body: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
});

export default theme;
