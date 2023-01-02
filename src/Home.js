import React, { Component } from "react";
import { withOktaAuth } from "@okta/okta-react";

export default withOktaAuth(
  class Home extends Component {
    // This method is called when the component is first added to the document
    constructor(props) {
      // Call the parent class' constructor
      super(props);
      // Set the initial state of the component
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }
    // login users and redirect to '/' route
    async login() {
      await this.props.oktaAuth.signInWithRedirect();
    }

    // logout users and redirect to '/' route
    async logout() {
      await this.props.oktaAuth.signOut();
    }
    // Render the component
    render() {
      let body = null;
      // If the user is not logged in, display a login button
      if (this.props.authState?.isAuthenticated) {
        body = // If the user is logged in, display a logout button and some user info
          (
            <div className="container py-4">
              <div className="jumbotron">
                {/* Display the user's name */}
                <h1>Hello, {this.props.authState?.idToken?.claims?.name}!</h1>
                <p>Welcome! We're glad you're here ...</p>

                <div class="btn-group" role="group" aria-label="Basic example">
                  <button
                    className="btn btn-primary btn"
                    data-testid="logout-button"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                  {/* <button
                  className="btn btn-primary btn"
                  onClick={() => this.props.history.push("/profile")}
                >
                  Profile
                </button> */}
                </div>
              </div>
            </div>
          );
      } else {
        // If the user is not logged in, display a login screen
        body = (
          <div className="container py-4">
            <div className="jumbotron">
              <h1>Hello, world!</h1>
              <p>Welcome to our website. Please ...</p>
              <button
                className="btn btn-primary btn"
                data-testid="login-button"
                onClick={this.login}
              >
                Login
              </button>
            </div>
          </div>
        );
      }
      // Render the component depending on the current auth state
      return <div className="App">{body}</div>;
    }
  }
);
