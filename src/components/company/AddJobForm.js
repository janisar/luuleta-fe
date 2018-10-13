import React from "react";
import { Button, Input, InputLabel } from "@material-ui/core/es/index";
import { connect } from "react-redux";
import { postJob } from "../../actions";

class AddJobForm extends React.Component {

  constructor() {
    super();

    this.state = {
      title: '',
      location: '',
      description: '',
      salary: ''
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateSalary = this.updateSalary.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.saveJob = this.saveJob.bind(this);
  }

  updateTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  updateLocation(e) {
    this.setState({
      location: e.target.value
    });
  }
  updateDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  updateSalary(e) {
    this.setState({
      salary: e.target.value
    });
  }

  saveJob() {
    console.log(this.state);
    this.props.postJob(this.state);
  }

  render() {
    return (
      <div>
        <InputLabel htmlFor="component-simple">Title </InputLabel>
        <Input id="component-simple" value={this.state.title} onChange={this.updateTitle} />
        <br/>
        <InputLabel htmlFor="component-simple">Location </InputLabel>
        <Input id="component-simple" value={this.state.location} onChange={this.updateLocation} />
        <br/>
        <InputLabel htmlFor="component-simple">Description </InputLabel>
        <Input id="component-simple" value={this.state.description} onChange={this.updateDescription} />
        <br/>
        <InputLabel htmlFor="component-simple">Salary </InputLabel>
        <Input id="component-simple" value={this.state.salary} onChange={this.updateSalary} />
        <br/>
        <Button onClick={this.saveJob}>Save</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = {
  postJob
}

export default connect(mapStateToProps, mapDispatchToProps)(AddJobForm)