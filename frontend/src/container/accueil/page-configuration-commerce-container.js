
import React, { Component } from 'react'

import PageConfigurationComponent from '../../component/page-configuration-commerce-component'
import NavBarComponent from '../../component/nav-bar-component'

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};
class PageConfigurationCommerceContainer extends Component {
    constructor(props) {
        super(props)
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
        this.nomDuCommerceRef = React.createRef()
        this.villeRef = React.createRef()
        this.paysRef = React.createRef()
        this.userPhoneRef = React.createRef()
        this.adresseRef = React.createRef()
        this.maxClientDansCommerceRef = React.createRef()
        this.horaireOuvertureRef = React.createRef()
        this.horaireFermetureRef = React.createRef()
        this.tempsMaxAttenteClientRef = React.createRef()

        this.state = {
            email: null,
            password: null,
            errors: {
                email: '',
                password: '',
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errors;
        let isChecked = e.target.checked;

        switch (name) {
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be at least 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();

        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
            const emailUtilisateur = this.emailRef.current.value
            const passwordUtilisateur = this.passwordRef.current.value
            const nomDuCommerceUtilisateur = this.nomDuCommerceRef.current.value
            const villeUtilisateur = this.villeRef.current.value
            const paysUtilisateur = this.paysRef.current.value
            const userPhoneUtilisateur = this.userPhoneRef.current.value
            const adresseUtilisateur = this.adresseRef.current.value
            const maxClientDansCommerceUtilisateur = this.maxClientDansCommerceRef.current.value
            const horaireOuvertureUtilisateur = this.horaireOuvertureRef.current.value
            const horaireFermetureUtilisateur = this.horaireFermetureRef.current.value
            const tempsMaxAttenteClientUtilisateur = this.tempsMaxAttenteClientRef.current.value

            const credentialObject = { email: emailUtilisateur, password: passwordUtilisateur, nomDuCommerce: nomDuCommerceUtilisateur, ville: villeUtilisateur, pays: paysUtilisateur, userPhone: userPhoneUtilisateur, adresse: adresseUtilisateur, maxClientDansCommerce: maxClientDansCommerceUtilisateur, horaireOuverture: horaireOuvertureUtilisateur, horaireFermeture: horaireFermetureUtilisateur, tempsMaxAttenteClient: tempsMaxAttenteClientUtilisateur }

        } else {
            console.error('Invalid Form')
        }

    }

    render() {

        return (

            <div>
                <PageConfigurationComponent nomDuCommerceRef={this.nomDuCommerceRef} villeRef={this.villeRef} paysRef={this.paysRef} userPhoneRef={this.userPhoneRef} handleChange={this.handleChange} handleSubmit={this.handleSubmit} errors={this.state.errors} adresseRef={this.adresseRef} maxClientDansCommerceRef={this.maxClientDansCommerceRef} horaireOuvertureRef={this.horaireOuvertureRef} horaireFermetureRef={this.horaireFermetureRef} tempsMaxAttenteClientRef={this.tempsMaxAttenteClientRef} />
            </div>
        )
    }
}

export default PageConfigurationCommerceContainer
