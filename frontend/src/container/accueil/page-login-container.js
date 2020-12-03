
import React, { Component } from 'react'

import LoginComponent from '../../component/page-login-component'
import NavBarComponent from '../../component/nav-bar-component'



import utilisateurs from '/w17-project-octobre2020-queue.io/frontend/utilisateurs.json'

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

class LoginContainer extends Component {
    constructor(props) {
        super(props)
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()

        this.state = {

            email: null,
            password: null,
            errors: {
                email: '',
                password: '',
            }


        }

        /* console.log(this.onClick) */

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
            alert(emailUtilisateur)
            alert(passwordUtilisateur)
            const credentialObject = { email: emailUtilisateur, password: passwordUtilisateur }

            console.log(utilisateurs)



            const utilisateurJsonArray = JSON.stringify(utilisateurs, null, 2);
            for (let i = 0; i < utilisateurs.length; i++) {
                let obj = utilisateurs[i];

                console.log(`Name: ${obj.email}, ${obj.pwd}`);
            }





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
                <LoginComponent emailRef={this.emailRef} passwordRef={this.passwordRef} handleChange={this.handleChange} handleSubmit={this.handleSubmit} errors={this.state.errors} />
            </div>

        )
    }
}

export default LoginContainer
