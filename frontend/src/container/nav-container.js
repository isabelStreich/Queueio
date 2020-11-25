
import React, { Component } from 'react' // importer librairie react

import AccueilComponent from '../../component/accueil/accueil-componement' // importer le composant accueil
import NavBarComponent from '../../component/accueil/nav-bar-component'

class LoginContainer extends Component {
    constructor() {
        super()

        this.state = {

        }

        /* console.log(this.onClick) */
        this.hadelOnclick = this.hadelOnclick.bind(this)
    }

    hadelOnclick() {

    }

    render() {
        const BUTTONS = [{
            label: 'Acceuil',
            onClick: this.hadelOnclick
        }, {
            label: 'Commereces',
            onClick: this.hadelOnclick
        }, {
            label: 'Configuration de Profil',
            onClick: this.hadelOnclick
        }, {
            label: 'Contact',
            onClick: this.hadelOnclick
        }
        ]
        return (

            <div>

                {/* <NavBarComponent buttons={BUTTONS} /> */}
                <AccueilComponent />

            </div>

        )
    }
}

export default LoginContainer
