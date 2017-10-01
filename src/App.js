import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LogPanel from './components/LogPanel';
import InfosForm from './components/InfosForm';
import PricePlans from './components/PricePlans';

class App extends Component {
    constructor() {
        super();
          this.state = {
            token: null,
            pricePlans: null
        }
    }

    setToken(token) {
      	token ? this.setState({token: token}) : this.setState({token: null})
    }

    refreshState() {
		this.setState({
			token: null,
			pricePlans: null
		});
    }

    setPricePlans(plans) {
		plans ? this.setState({pricePlans: plans}) : this.setState({pricePlans: null})
    }

    render() {
			const mainPanelContents = this.state.token ?
			(
				<div>
					<LogPanel 
						token={this.state.token} 
						setToken={(token) => this.setToken(token)} 
						refreshState={() => this.refreshState()}
					/>
					<InfosForm setPricePlans={(plans) => this.setPricePlans(plans)} />
					<PricePlans pricePlans={this.state.pricePlans} />
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
