import React from "react";
import { checkIfTokenExists, login, saveUser } from "../../actions/index";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Button, FormControl, Input, InputLabel, TextField } from "@material-ui/core/es/index";
import './Login.css';

class Login extends React.Component {

  constructor() {
    super();
    this.updatePassword = this.updatePassword.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.login = this.login.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

    this.state = {
      username: '',
      password: '',
      redirectToDashboard: false,
      showPassword: false,
      token: null
    };
  }

  componentDidMount() {
    this.props.checkIfTokenExists();
  }

  login() {
    login(this.state.username, this.state.password).then(token => {
      this.props.saveUser(token);
    });
  }

  updateUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleClickShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  render() {
    let message;
    if (this.props.location.state && this.props.location.state.registered) {
      message = <div>You can log in now</div>
    }
    if (this.props.user.redirectToDashboard) {
      return (<Redirect to={{ pathname: '/dashboard' }}/>)
    }
    return (
      <div className="Login-Form">
        {message}
        <FormControl className="Login-Input">
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Input id="component-simple" value={this.state.username} onChange={this.updateUsername}/>
        </FormControl>
        <TextField
          id="password"
          variant="outlined"
          type='password'
          label="Password"
          className="Login-Input"
          value={this.state.password}
          onChange={this.updatePassword}
        />
        <br/>
        <Button variant="outlined" className="Login-Input" onClick={this.login}>Login</Button>
        <br/>
        or
        <br/>
        <Button variant="outlined" className="Login-Input" color="secondary">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    shouldRedirect: state.shouldRedirect
  }
};
const initMapDispatchToProps = {
  saveUser,
  checkIfTokenExists
};

export default connect(mapStateToProps, initMapDispatchToProps)(Login)