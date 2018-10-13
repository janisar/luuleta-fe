import React from "react";
import {
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  MenuItem, Menu
} from "@material-ui/core/es/index";
import { connect } from "react-redux";
import { logout } from "../actions";
import {} from "react-router";

class HeaderBar extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  logout = () => {
    this.props.logout();
    this.setState({ anchorEl: null });
    window.location.href = "/";
  };

  render() {
    let user = this.props.user;
    const { anchorEl } = this.state;

    return (

      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton aria-label="Delete" color="primary" onClick={this.handleClick}>
            <i className="material-icons">
              more_vert
            </i>
          </IconButton>
          <Typography variant="title" color="inherit" className="Header-Name">
            {user  && user.firstName} {user && user.lastName}
          </Typography>
        </Toolbar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Menu>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
};

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);