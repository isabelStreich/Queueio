import React, { Component } from 'react' // importer li
import LoginContainer from './accueil/page-login-container'


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

                <LoginContainer />

            </div>
        )
    }
}

export default App
