import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from 'react-spinner-material';
import { login, logout } from '../utils/qover-api';

class LogPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
          emailValue: "",
          passwordValue: "",
          emailErrorText: "",
          passwordErrorText: "",
          incorrectCredentials: false,
          isLoading: false
        };
    }
    
    logIn() {
        this.state.emailValue === "" ? 
        this.setState({emailErrorText: "This field is required."}) : 
        this.setState({emailErrorText: ""});

        this.state.passwordValue === "" ? 
        this.setState({passwordErrorText: "This field is required."}) : 
        this.setState({passwordErrorText: ""});

        if (this.state.emailValue && this.state.passwordValue) {
            this.setState({isLoading: true});
            login(this.state.emailValue, this.state.passwordValue)
            .then((token) => {
                if (token) {
                    this.setState({incorrectCredentials: false});
                    this.props.setToken(token);
                } else {
                    this.setState({incorrectCredentials: true});
                }
                this.setState({isLoading: false});
            });
        }
    }

    logOut() {
       logout(this.props.token).then(this.props.setToken(null));
    }

    render() {
        const error = this.state.incorrectCredentials ?
        <p className="error-text">One of the supplied credentials is incorrect</p> : null
        if (this.props.token) {
            return (
                <div className="log-panel">
                    <Spinner
                        spinnerColor={"#00BCD4"}
                        visible={this.state.isLoading} 
                    />
                    <RaisedButton label="Logout" className="logout-btn" secondary={true} onClick={() => this.logOut()} />
                </div>
            )
        } else {
            return (
                <div className="log-panel">
                    <Spinner
                        spinnerColor={"#00BCD4"}
                        visible={this.state.isLoading} 
                    />
                    <div className="login-form">
                        <TextField 
                            hintText="E-mail" 
                            errorText={this.state.emailErrorText}
                            className="login-field" 
                            onChange={(e, value) => this.setState({emailValue: value})} 
                        />
                        <TextField 
                            hintText="Password"
                            type="password"
                            errorText={this.state.passwordErrorText}
                            className="login-field" 
                            onChange={(e, value) => this.setState({passwordValue: value})}
                        />
                        <RaisedButton label="LogIn" className="login-btn" primary={true} onClick={() => this.logIn()} />
                    </div>
                    {error}
                </div>
            )
        }
    }
}

export default LogPanel;