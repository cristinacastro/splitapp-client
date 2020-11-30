import React, { Component } from "react";
import auth from "./auth-service";
const { Consumer, Provider } = React.createContext();

// HOC para crear Consumer
const withAuth = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <Consumer>
          {({ login, signup, user, logout, isLoggedin }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends Component {
  state = { isLoggedin: false, user: null, isLoading: true, message: "" };

  componentDidMount() {
    auth
      .me()
      .then((res) => {
        if (res.email) {
          this.setState({ isLoggedin: true, user: res, isLoading: false });
        }
      })
      .catch((err) =>
        this.setState({
          isLoggedin: false,
          user: null,
          isLoading: false,
          message: err.message,
        })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoggedin !== this.state.isLoggedin) {
      auth
        .me()
        .then((res) => {
          if (res.email && this.state.isLoggedin) {
            this.setState({ isLoggedin: true, user: res, isLoading: false });
          }
        })
        .catch((err) =>
          this.setState({
            isLoggedin: false,
            user: null,
            isLoading: false,
            message: err.message,
          })
        );
    }
  }

  signup = (user) => {
    const { username, email, password } = user;

    auth
      .signup({ username, email, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch(({ response }) => {
        this.setState({ message: {status: response.status, statusText: response.statusText, errorMessage: response.data.errorMessage} })
      }
      );
  };

  login = (user) => {
    const { email, password } = user;

    auth
      .login({ email, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch(({ response }) => {
        this.setState({ message: {status: response.status, statusText: response.statusText, errorMessage: response.data.errorMessage} })
      })
  };

  logout = () => {
    auth
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch((err) => console.log(err));
  };

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { login, logout, signup } = this;

    return isLoading ? (
      <div>Loading</div>
    ) : (
      <Provider value={{ isLoggedin, user, login, logout, signup }}>
        {this.props.children}
      </Provider>
    ); 
  }
}

export { Consumer, withAuth }; 

export default AuthProvider; 