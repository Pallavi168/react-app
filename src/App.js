import logo from './logo.svg'
import './App.css';
import { config } from './config';
import { PublicClientApplication } from '@azure/msal-browser';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {}
    };
    this.login = this.login.bind(this)

    //Initialize the MSAL application object
    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirecturl: config.redirectUrl,
        authority: config.authority
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
      }
    });
  }
  async login(){
    try {
      //Login via popup
      await this.publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: "select_account"
      });
      this.setState({
        isAuthenticated: true
      });
    }
    catch(err) {
      this.setState({
        isAuthenticated: false,
        user: {},
        error: err
      });
    }
  }

  /*logout() {
    this.publicClientApplication.logout()
  }*/

  render(){
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          {this.state.isAuthenticated ? <p>
            Successful Logged In
          </p>:
          <p>
            <button onClick={() => this.login()}>Log In</button>
          </p>
          }
        </header>
      </div>
    )
  }
}

export default App;
