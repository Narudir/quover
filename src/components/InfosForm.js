import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Spinner from 'react-spinner-material';
import {sendDraft} from '../utils/qover-api';
const draft =  require('../utils/draft.json');

class InfosForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Mr",
            firstName: "",
            lastName: "",
            birthDate: "1984-12-16",
            carModel: "114980",
            email: "",
            firstNameError: "",
            lastNameError: "",
            ageErrorText: "",
            emailErrorText: "",
            isLoading: false
        }
    }

    submitInfosForm() {
        this.validate();
        if (
            this.state.firstName &&
            this.state.lastName &&
            this.validateEmail(this.state.email)
        ) {
            const newDraft = this.createNewDraft();
            this.setState({isLoading: true});
            sendDraft(newDraft)
            .then((plans) => {
                this.props.setPricePlans(plans);
                this.setState({isLoading: false});
            })
            .catch((error) => console.log(error));
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validate() {
        this.state.firstName === "" ? 
        this.setState({firstNameError: "First name is required."}) : 
        this.setState({firstNameError: ""});

        this.state.lastName === "" ? 
        this.setState({lastNameError: "Last name is required."}) : 
        this.setState({lastNameError: ""});

        if (this.state.email === "") {
            this.setState({emailErrorText: "Please enter e-mail address."});
        } else {
            this.validateEmail(this.state.email) ? 
            this.setState({emailErrorText: ""}) :
            this.setState({emailErrorText: "Enter valid e-mail address  ."});
        }
    }

    createNewDraft() {
        const driverInfo = draft;
        driverInfo.policyholder.person = {
            birthDate: this.state.birthDate,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            title: this.state.title
        };
        driverInfo.policyholder.contact.email = this.state.email;
        driverInfo.risk.drivers = [
            {   
                contact: {
                    email: this.state.email,
                    phone: "+32478595959"
                },
                numberOfClaimsLast5Years: "0",
                person: {
                    birthDate: this.state.birthDate,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    title: this.state.title
                }
            }
        ];
        driverInfo.risk.vehicle.details = {
            code: this.state.carModel,
            codeType: "NAT",
            country: "BE",
            vehicleType: "10"
        };
        return driverInfo;
    }

    render() {
        const radioStyle = {width: "35%"};
        return(
            <section className="infosForm">
                <Spinner
                    spinnerColor={"#00BCD4"}
                    visible={this.state.isLoading} 
                />
                <RadioButtonGroup 
                    name="title" 
                    defaultSelected="Mr" 
                    className="title-radios" 
                    onChange={(e, value) => this.setState({title: value})}>
                    <RadioButton
                        value="Mr"
                        label="Mr"
                        style={radioStyle}
                    />
                    <RadioButton
                        value="Mrs"
                        label="Mrs"
                        style={radioStyle}
                    />
                </RadioButtonGroup>
                <TextField 
                    hintText="First name" 
                    errorText={this.state.firstNameError}
                    className="infos-field" 
                    onChange={(e, value) => this.setState({firstName: value})} 
                />
                <TextField 
                    hintText="Last name" 
                    errorText={this.state.lastNameError}
                    className="infos-field" 
                    onChange={(e, value) => this.setState({lastName: value})} 
                />
                <DatePicker 
                    hintText="Date of birth" 
                    mode="landscape"
                    defaultDate={new Date(this.state.birthDate)}
                    onChange={(e, date) => this.setState({birthDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`})}
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
                <RaisedButton label="Submit" className="submit" primary={true} onClick={() => this.submitInfosForm()} />
            </section>
        )
    }
}

export default InfosForm;