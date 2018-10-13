import React from "react";
import { register } from "../../actions/index";
import { Redirect } from "react-router";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core/es/index";

export default class Register extends React.Component {

  constructor() {
    super();

    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.register = this.register.bind(this);
    this.updateRole = this.updateRole.bind(this);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: '0',
      registered: false
    }
  }

  updateEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  updateRole(e) {
    this.setState({
      role: e.target.value
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  updateFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  updateLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  register() {
    register(this.state).then(() => {
      this.setState({
        registered: true
      })
    });
  }

  render() {
    if (this.state.registered) {
      return (<Redirect to={{
        pathname: '/',
        state: { registered: true }
      }}/>)
    }
    return (
      <div className="Login-Form">
        <label>Register:</label>
        <FormControl className="Login-Input">
          <InputLabel htmlFor="component-simple">Email</InputLabel>
          <Input id="component-simple" value={this.state.email} onChange={this.updateEmail}/>
        </FormControl>
        <TextField
          id="password"
          variant="outlined"
          type='password'
          label="Password"
          className="Login-Input"
          value={this.state.password}
          onChange={this.updatePassword}/>
        <FormControl className="Login-Input">
          <InputLabel htmlFor="component-simple">First name</InputLabel>
          <Input id="component-simple" value={this.state.firstName}
                 onChange={this.updateFirstName}/>
        </FormControl>
        <FormControl className="Login-Input">
          <InputLabel htmlFor="component-simple">Last name</InputLabel>
          <Input id="component-simple" value={this.state.lastName} onChange={this.updateLastName}/>
        </FormControl>

        <FormControl className="Login-Input">
          <InputLabel htmlFor="age-simple">Type</InputLabel>
          <Select
            value={this.state.role}
            onChange={this.updateRole}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}>
            <MenuItem value={0}>Looking for a job</MenuItem>
            <MenuItem value={1}>Offering a job</MenuItem>
          </Select>
        </FormControl>

        <Button onClick={this.register}>Register</Button>
      </div>
    )
  }
}
