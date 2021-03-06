import React, { Component } from "react";
import { connect } from "react-redux";

import { signUp } from "../actions";

class SignUp extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    await this.props.signUp(this.state);

    if (this.props.errorMessage.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    const { errorMessage } = this.props.errorMessage;
    const showError = errorMessage ? (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    ) : null;

    return (
      <div className="container">
        <form className="form-group" onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>
          {showError}
          <p>
            <input
              onChange={this.handleChange}
              className="form-control"
              name="name"
              type="text"
              id="name"
              placeholder="Enter your full name."
            />
          </p>
          <p>
            <input
              onChange={this.handleChange}
              className="form-control"
              name="email"
              type="text"
              id="email"
              placeholder="Enter your email address"
            />
          </p>
          <p>
            <input
              onChange={this.handleChange}
              className="form-control"
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </p>
          <p>
            <button className="btn btn-primary btn-block">Sign Up</button>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth
  };
};

export default connect(
  mapStateToProps,
  { signUp }
)(SignUp);
