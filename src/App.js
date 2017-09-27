import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LogPanel from './components/LogPanel';
import InfosForm from './components/InfosForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null
    }
  }

  setToken(token) {
    token ? this.setState({token: token}) : this.setState({token: null})
  }

  render() {
    const mainPanelContents = this.state.token ?
    (
      <div>
        <LogPanel token={this.state.token} setToken={(token) => this.setToken(token)} />
        <InfosForm />
      </div>
    ) : 
    (
      <div>
        <LogPanel token={this.state.token} setToken={(token) => this.setToken(token)} />
      </div>
    );

    return (
      <MuiThemeProvider>
        {mainPanelContents}
      </MuiThemeProvider>
    );
  }
}

export default App;
