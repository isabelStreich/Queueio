
import React, { Component } from 'react'

import PageConfigurationComponent from '../../component/page-configuration-commerce-component'
import NavBarComponent from '../../component/nav-bar-component'

class PageInscriptionContainer extends Component {
    constructor() {
        super()

        this.state = {

        }
        this.hadelOnclick = this.hadelOnclick.bind(this)
    }

    hadelOnclick() {

    }

    render() {
        const BUTTONS = [{
            label: 'Changer le logo',
            onClick: this.hadelOnclick
        },
        {
            label: 'Configuration de profil',
            onClick: this.hadelOnclick
        }, {
            label: 'statistiques',
            onClick: this.hadelOnclick
        },
        {
            label: 'Employes',
            onClick: this.hadelOnclick
        }
        ]
        return (

            <div>
                <PageConfigurationComponent />
            </div>
        )
    }
}

export default PageInscriptionContainer
