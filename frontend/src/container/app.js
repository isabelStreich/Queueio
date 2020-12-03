import React, { Component } from 'react' // importer li
//import LoginContainer from './accueil/page-login-container'
//import PageInscriptionContainer from './accueil/page-inscription-container'
import PageConfigurationCommerceContainer from './accueil/page-configuration-commerce-container'
//import NavbarPage from './accueil/nav-bar-container'


class App extends Component { // composant container qui est le formualaire 'Contenant'
    constructor(props) {
        super(props)
        this.state = {
            container: 'accueil'
        }
    }

    render() {
        return (
            <div>
                {/* 
                <LoginContainer /> */}
                {/* <PageInscriptionContainer /> */}
                <PageConfigurationCommerceContainer />


            </div>
        )
    }
}

export default App
