import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class InfosForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            driverName: "",
            driverAge: 22,
            carModel: "114980",
            email: "",
            driverErrorText: "",
            ageErrorText: "",
            emailErrorText: "",
        }
    }

    validate() {
        this.state.driverName === "" ? 
        this.setState({driverErrorText: "This field is required."}) : 
        this.setState({driverErrorText: ""});

        !this.state.driverAge ? 
        this.setState({ageErrorText: "This field is required."}) : 
        this.setState({ageErrorText: ""});

        this.state.email === "" ? 
        this.setState({emailErrorText: "This field is required."}) : 
        this.setState({emailErrorText: ""});
    }

    render() {
        const draft = require('../utils/draft.json');
        return(
            <section className="infosForm">
                <TextField 
                    hintText="Driver name" 
                    errorText={this.state.driverErrorText}
                    className="infos-field" 
                    onChange={(e, value) => this.setState({driverName: value})} 
                />
                <TextField 
                    hintText="Age"
                    defaultValue={this.state.driverAge}
                    errorText={this.state.ageErrorText}
                    className="infos-field" 
                    onChange={(e, value) => this.setState({driverAge: value})}
                />
                <SelectField
                    floatingLabelText="Car Model"
                    value={this.state.carModel}
                    onChange={(e, index, value) => this.setState({carModel: value})}
                >
                    <MenuItem value="114980" primaryText="BMW 418d" />
                    <MenuItem value="117499" primaryText="Toyota avensis" />
                    <MenuItem value="101181" primaryText="Volkswagen Golf" />
                </SelectField>
                <TextField 
                    hintText="E-mail"
                    errorText={this.state.emailErrorText}
                    className="infos-field"
                    onChange={(e, value) => this.setState({email: value})}
                />
                <RaisedButton label="Submit" className="submit" primary={true} onClick={() => this.validate()} />
            </section>
        )
    }
}

export default InfosForm;