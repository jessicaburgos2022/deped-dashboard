import React from "react";

export default () => {
  return (
    <React.Fragment>
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
          <li class="nav-item d-flex">
            <a
              class="nav-link px-3"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i class="fas fa-bars"></i>
            </a>
            <span
              style={{
                padding: "8px 16px",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              OP DASH
            </span>
          </li>
        </ul>
        <div class="nav-collapse collapse">
          <ul class="nav">
            <li class="divider-vertical"></li>
            <li>
              <a href="#">
                <i class="icon-home icon-white"></i> Home
              </a>
            </li>
          </ul>
          <div class="pull-right">
            <ul class="nav pull-right">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  Welcome, User <b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a href="/user/preferences">
                      <i class="icon-cog"></i> Preferences
                    </a>
                  </li>
                  <li>
                    <a href="/help/support">
                      <i class="icon-envelope"></i> Contact Support
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li>
                    <a href="/auth/logout">
                      <i class="icon-off"></i> Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
