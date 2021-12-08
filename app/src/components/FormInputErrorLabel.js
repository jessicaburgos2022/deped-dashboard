import React from "react";
import "./FormInputErrorLabel.css";
export default class FormInputErrorLabel extends React.Component {
  render() {
    const { message } = this.props;
    return (
      <div className="form-input-error-label-container">
        <span className="form-input-error-label">* {message}</span>
      </div>
    );
  }
}
