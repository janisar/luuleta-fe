import React from "react";
import { fetchUser } from "../actions";

export default class UserProfile extends React.Component {

  constructor() {
    super();

    this.state = {
        user: {
          email: ""
        }
      };
  };

  componentDidMount() {
    fetchUser().then(user => {
      this.setState({
        user: user
      })
    });
  }

  render() {
    return (
      <div>
        Hello {this.state.user.firstName}
      </div>
    );
  }
}
