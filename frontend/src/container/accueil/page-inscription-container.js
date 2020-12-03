
import React, { Component } from 'react'

import PageInscriptionComponent from '../../component/page-inscription-commercant-component'
import NavBarComponent from '../../component/nav-bar-component'

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};
class PageConfifigurationCommerceContainer extends Component {
    constructor(props) {
        super(props)
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
        this.nomDuCommerceRef = React.createRef()
        this.villeRef = React.createRef()
        this.paysRef = React.createRef()
        this.userPhoneRef = React.createRef()
        this.adresseRef = React.createRef()

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

            const credentialObject = { email: emailUtilisateur, password: passwordUtilisateur, nomDuCommerce: nomDuCommerceUtilisateur, ville: villeUtilisateur, pays: paysUtilisateur, userPhone: userPhoneUtilisateur, adresse: adresseUtilisateur }



            // fetch('http://localhost:8080/queueio.com/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(credentialObject)
            // }).then(response => response.json())
            //     .then((result) => this.setState({ result: result }))
        } else {
            console.error('Invalid Form')
        }

    }


    render() {


        return (

            <div>
                <PageInscriptionComponent nomDuCommerceRef={this.nomDuCommerceRef} villeRef={this.villeRef} paysRef={this.paysRef} userPhoneRef={this.userPhoneRef} handleChange={this.handleChange} handleSubmit={this.handleSubmit} errors={this.state.errors} adresseRef={this.adresseRef} />
            </div>

        )
    }
}

export default PageConfifigurationCommerceContainer
