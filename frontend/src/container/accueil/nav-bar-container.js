
import React, { Component } from 'react' // importer librairie react

import NavBarComponent from '../../component/nav-bar-component' // importer le composant navbar
// import '../component/Navbar/navbar.css'

class NavBarContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            options: []
        }

        this.handleOnClick = this.handleOnClick.bind(this)

        this.BUTTONS = [
            {
                label: 'Acceuil',
                onClick: this.handleOnClick
            },
            {
                label: 'Commerces',
                onClick: this.handleOnClick
            },

            {
                label: 'Contact',
                onClick: this.handleOnClick
            }
        ]
    }

    handleOnClick() {
        console.log('test button click')
    }

    // didmont

    componentDidMount() {
        fetch('/playlists/genres', { method: 'GET' })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ genres: responseJson })
            })
    }

    render() {
        return (
            <NavBarComponent onSubmit={this.props.onHandleRechercheOnClick} genres={this.state.genres} buttons={this.BUTTONS} />
        )
    }
}

export default NavBarContainer
