import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const MessageBar = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.alert.open);
  const message = useSelector((state) => state.alert.message);

  const handleClose = () => {
    dispatch({ type: 'CLOSE_ALERT' });
  };

  return (
    // <Snackbar
    //   open={open}
    //   anchorOrigin={{ vertical, horizontal }}
    //   TransitionComponent={TransitionUp}
    //   autoHideDuration={5000}
    // >
    //   <Box
    //     component='div'
    //     fontStyle='italic'
    //     m={2}
    //     bgcolor={
    //       _.isEmpty(message.typ) || _.isUndefined(message.typ)
    //         ? '#388e3c'
    //         : '#f44336'
    //     }
    //     pt={2}
    //     pb={2}
    //     pl={4}
    //     pr={4}
    //     color='white'
    //     borderRadius={16}
    //   >
    //     <Typography>{message.message}</Typography>

    //   </Box>
    // </Snackbar>
    <Snackbar
      key={message.message ? message.message : undefined}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      // onExited={handleExited}
      // message={message.message ? message.message : undefined}
      action={
        <React.Fragment>
          <IconButton
            aria-label='close'
            color='inherit'
            // className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    >
      <Alert
        onClose={handleClose}
        severity={message.typ ? message.typ : 'success'}
      >
        {message.message ? message.message : undefined}
      </Alert>
    </Snackbar>
  );
};

export default MessageBar;
