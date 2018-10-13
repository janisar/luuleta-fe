import React from "react";
import JobCard from "./JobCard";
import { fetchJobs } from "../actions";
import { connect } from "react-redux";

class EmployeeDashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      jobs: [],
      jobIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    this.props.fetchJobs();
  }

  updateIndex() {
    this.setState({
      jobIndex: this.state.jobIndex + 1
    })
  }

  render() {
    return (
      <div>
        {this.props.jobs && this.props.jobs.length > 0 && this.state.jobIndex < this.props.jobs.length ?
          <JobCard job={this.props.jobs[this.state.jobIndex]} updateIndex={this.updateIndex}/>
          :
          <div className="No-Jobs">
            No more jobs for you!
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs.items
  }
};

const mapDispatchToProps = {
  fetchJobs
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard)