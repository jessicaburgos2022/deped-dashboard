import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CircularProgress from '@material-ui/core/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default class PromiseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      loading: false,
    };

    this.promiseInfo = {};
  }

  show = async () => {
    this.setState({
      loading:false
    });
    return new Promise((resolve, reject) => {
      this.promiseInfo = {
        resolve,
        reject,
      };
      this.setState({
        show: true,
      });
    });
  };

  hide = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { show } = this.state;
    const { resolve, reject } = this.promiseInfo;
    const {
      confirmTitle,
      confirmationDetail,
      confirmButtonText,
      cancelButtonText,
    } = this.props;
    return (
      <React.Fragment>
        <Dialog
          open={show}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => reject()}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {confirmTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              color="primary"
            >
              {confirmationDetail}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => reject()} color="primary" disabled={this.state.loading}>
              {cancelButtonText}
            </Button>
            <Button onClick={() => {this.setState({loading:true});resolve();}} color="primary" disabled={this.state.loading}>
              {this.state.loading && <CircularProgress size={15} />}
              {confirmButtonText}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  getResolve() {
    const { resolve = () => {} } = this.promiseInfo || {};
    return (result) => {
      resolve(result);
      this.hide();
    };
  }

  /**
   * reject
   */
  getReject() {
    const { reject = () => {} } = this.promiseInfo || {};
    return (err) => {
      reject(err);
      this.hide();
    };
  }
}
