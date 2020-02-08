import {
  Block,
  Brand,
  Button,
  Container,
  InputBlock,
  RememberMeBlock,
} from "./LoginView.css";
import {
  FORGOT_PASSWORD_QUERY,
  LOGIN_QUERY,
} from "../../../shared/queries/Mutations";
import Notifications, { notify } from "react-notify-toast";
import React, { Component, ReactChild } from "react";

import { RouteComponentProps } from "react-router";
import { TypeSettings } from "../../../client/types";
import apolloClient from "../../../shared/apolloClient";
import util from "../../../shared/util";

interface ILoginProps {
  settings: TypeSettings;
  router: RouteComponentProps;
}

interface ILoginState {
  loginEmail: string;
  password: string;
  rememberMe: boolean;
  loginView: boolean;
}

class LoginView extends Component<ILoginProps, ILoginState> {
  state = {
    loginEmail: "",
    password: "",
    rememberMe: false,
    loginView: true,
  };

  onloginEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ loginEmail: e.target.value });
  };

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  onRememberMeChange = (e: React.MouseEvent<HTMLInputElement>) => {
    this.setState({ rememberMe: e.target["checked"] });
  };

  showLostPasswordView = e => {
    e.preventDefault();
    this.setState({ loginView: false });
  };

  showLoginView = e => {
    e.preventDefault();
    this.setState({ loginView: true });
  };

  login = async () => {
    const loginResult = await apolloClient().mutate({
      mutation: LOGIN_QUERY,
      variables: {
        username: this.state.loginEmail,
        password: this.state.password,
        remember: this.state.rememberMe,
      },
    });
    if (!loginResult.data.login.ok) {
      let errors = util.parseErrors(loginResult.data.login);
      errors = errors.map(error => error["message"]);
      notify.show(errors.join("\n"), "warning", 33000);
    } else {
      localStorage.token = loginResult.data.login.token;
      this.props.router.history.push("/admin/home");
    }
  };

  forgotPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { loginEmail } = this.state;
    const sanitisedLoginEmail = loginEmail.trim();
    if (sanitisedLoginEmail.length > 0) {
      e.currentTarget.disabled = true;
      const response = await apolloClient().mutate({
        mutation: FORGOT_PASSWORD_QUERY,
        variables: {
          email: sanitisedLoginEmail,
        },
      });
      e.currentTarget.disabled = false;
      if (response.data.forgotPassword.ok) {
        notify.show(
          "Great. Check your email to reset your password!",
          "success",
          3000,
        );
      } else {
        notify.show(response.data.forgotPassword.msg, "warning", 3000);
      }
    } else {
      notify.show("Please fill up the email field.", "warning", 3000);
    }
  };

  render() {
    const logoSrc = this.props.settings.site_logo.value;
    let siteTitle = this.props.settings.site_title;
    let logo;
    if (logoSrc) {
      logo = (
        <img src={this.props.settings.site_logo.value} height="200" />
      ) as ReactChild;
    }

    return (
      <Container>
        <Brand>{logo || siteTitle}</Brand>

        <div className="login">
          <Notifications />
          <Block isVisible={this.state.loginView}>
            <InputBlock>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={this.state.loginEmail}
                onChange={this.onloginEmailChange}
                autoComplete="off"
              />
            </InputBlock>
            <InputBlock>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={this.onPasswordChange}
                value={this.state.password}
                autoComplete="off"
                onKeyUp={(e: React.KeyboardEvent) => {
                  if (e.keyCode === 13) {
                    this.login();
                  }
                }}
              />
            </InputBlock>
            <RememberMeBlock>
              <label>
                <input type="checkbox" onClick={this.onRememberMeChange} />
                <span className="label-text"> Remember my password</span>
              </label>
            </RememberMeBlock>
            <br />
            <Button onClick={this.login}>Login</Button>
            <InputBlock>
              <a
                onClick={this.showLostPasswordView}
                className="forgot-pwd"
                href="#"
              >
                Lost your password ?
              </a>
            </InputBlock>
          </Block>
          <Block isVisible={!this.state.loginView}>
            <InputBlock>
              <label htmlFor="username">Enter your email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={this.state.loginEmail}
                onChange={this.onloginEmailChange}
                autoComplete="off"
              />
            </InputBlock>
            <br />
            <br />
            <InputBlock>
              <Button contained secondary onClick={this.showLoginView}>
                Cancel
              </Button>
              <Button onClick={this.forgotPassword}>Submit</Button>
            </InputBlock>
          </Block>
        </div>
      </Container>
    );
  }
}

export default LoginView;
