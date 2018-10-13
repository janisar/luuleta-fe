import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core/es/index";
import '../styles/JobCard.css';
import { showInterest } from "../actions";
import { connect } from "react-redux";

class JobCard extends React.Component {

  constructor() {
    super();

    this.showInterest = this.showInterest.bind(this);
  }

  showInterest(id, reactionType) {
    return () =>
      this.props.showInterest(id, reactionType).then(response => {
        console.log(response);
        this.props.updateIndex()
      });
  }

  render() {
    let job = this.props.job;
    return (
      <div className="JobCard-Wrapper">
        <Card className="JobCard">
          <CardContent className="CardContent">
            <Typography variant="headline">
              {job.title}
            </Typography>
            <Typography component="div" className="Job-Description">
              <p>
                {job.description}
              </p>
            </Typography>
            <Typography component="div">
              <p>
                <label>Salary:</label>
                {job.salary ? job.salary : " Unknown"}
              </p>
            </Typography>
          </CardContent>
          <CardActions className="JobCard-Actions">
            <Button size="small" onClick={this.showInterest(job.id, 0)}>Mehh..</Button>
            <Button size="small" onClick={this.showInterest(job.id, 1)}>Yass!</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = {
  showInterest
};

export default connect(null, mapDispatchToProps)(JobCard);