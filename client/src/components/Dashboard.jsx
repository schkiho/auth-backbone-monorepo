import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getDashBoard();
  }

  render() {
    return (
      <div className="d-block text-center">
        {" "}
        <h3 className="font-weight-bold">
          This is dashboard component Our Statement from Back end
        </h3>{" "}
        <br />
        <p>
          <span className="bg-warning p-2 rounded">
            You can only enter this page and see this statement if you signed
            in!
          </span>
        </p>
        <br />
        <h2>
          <span className="bg-success p-2 rounded">{this.props.dashboard}</span>
        </h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dash.dashboard
  };
};

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
