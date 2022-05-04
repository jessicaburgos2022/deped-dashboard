import React from "react";
// import usercardheader from '../../media/user-dropdown-bg.jpg';
import usercardheader from '../../media/user-dropdown-bg.jpg';
import userimage from '../../media/userimage.jpg';

export default () => {
  return (
    <React.Fragment>
        <nav className="main-header navbar navbar-light navbar-expand bg-light">
            <a className="toggle-button navbar-brand d-flex align-items-center" data-widget="pushmenu" href="#" role="button">
                <i className="fas fa-bars"></i>
            </a>
            <a className="navbar-brand fw-bold">OP DASH</a>
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item bottom-right position-relative">
                  <a className="btn btn-userDropdown" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2">
                      <small>Hi,&nbsp;</small>
                      <b>Ralph</b>
                    </span>
                    <img src={userimage} alt="user image" className="user-image"></img>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <div className="user-card-header notification-item-padding-x" style={{backgroundImage: `url(${usercardheader})`}}>
                      <div className="user-card-avatar d-inline-flex">
                        <img src={userimage} alt="user image" className="user-image"></img>
                        <div className="user-card-name ml-3">
                          <span>Ralph Christian Escarilla</span>
                          <span>[QAD] Encoder</span>
                        </div>
                      </div>
                    </div>
                    <div className="notification-custom">
                      <a className="btn btn-danger border-0" href="javascript:;"> <i className="bx bx-log-out mr-2"></i>Sign Out</a>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
    </React.Fragment>
  );
};
