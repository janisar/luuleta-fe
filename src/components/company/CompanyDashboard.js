import React from "react";
import {
  Button, Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core/es/index";
import Link from "react-router-dom/es/Link";
import { connect } from "react-redux";
import { fetchJobsForCompany } from "../../actions";

class CompanyDashboard extends React.Component {

  componentDidMount() {
    this.props.fetchJobsById(this.props.user.id);
  }

  render() {
    let { companyJobs } = this.props;
    return (
      <div>
        <div>
          <div>
            <p className="Table-Header">
              Your company's jobs:
            </p>
            <Button>
              <Link to={`${this.props.match.url}/add`}>Add new job</Link>
            </Button>
          </div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Responses</TableCell>
                  <TableCell>Response rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyJobs.items && companyJobs.items.map(job => {
                  return (
                    <TableRow key={job.id}>
                      <TableCell component="th" scope="row">
                        {job.title}
                      </TableCell>
                      <TableCell>{job.reactionList.length}</TableCell>
                      <TableCell>{job.reactionList.filter(reaction => reaction.reactionType === "UP").length * 100 / job.reactionList.length} %</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchJobsById: fetchJobsForCompany
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    companyJobs: state.jobs
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashboard)