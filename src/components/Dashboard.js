import React from "react";
import { Redirect } from "react-router";
import { fetchJobs, saveUser } from "../actions";
import EmployeeDashboard from "./EmployeeDashboard";
import CompanyDashboard from "./company/CompanyDashboard";
import { connect } from "react-redux";

class Dashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      jobIndex: 0,
      jobs: [{}]
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.getDashboardComponent = this.getDashboardComponent.bind(this);
  }

  updateIndex() {
    let newIndex = this.state.jobIndex + 1;
    this.setState({ jobIndex: newIndex })
  }

  render() {
    if (this.props.user) {
      let user = this.props.user;
      return (
        <div>
          {this.getDashboardComponent(user.role)}
        </div>
      );
    } else {
      return (
        <Redirect to="/"/>
      )
    }
  }

  getDashboardComponent(role) {
    if (role === 'EMPLOYEE') {
      return <EmployeeDashboard/>;
    } else if (role === 'COMPANY') {
      return <CompanyDashboard company={this.state}
                               match={this.props.match}
                               history={this.props.history}/>
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
};


const mapDispatchToProps = {
  // saveUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);