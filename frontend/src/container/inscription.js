import React, { Component } from 'react'

import Input from 'component/input'
import Select from 'component/select'

class Inscription extends Component {
    constructor (props) {
        super(props)

        this.state = {
            cities: [],
            values: {},
            result: {}
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleInputOnChange = this.handleInputOnChange.bind(this)
    }

    componentDidMount () {
        fetch('http://localhost:8080/cities', {
            method: 'GET'
        }).then(response => response.json())
            .then((cities) => this.setState({ cities: cities }))
    }

    handleInputOnChange (event) {
        this.setState({
            values: Object.assign(this.state.values, { [event.target.name]: event.target.value })
        })
    }

    handleOnSubmit (event) {
        event.preventDefault()

        fetch('http://localhost:8080/inscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.values)
        }).then(response => response.json())
            .then((result) => this.setState({ result: result }))
    }

    render () {
        return (
            <div className='container'>
                <h1>Inscription</h1>

                <form onSubmit={this.handleOnSubmit}>

                    <Input
                        id='firstName-id'
                        name='firstName'
                        label='Prénom'
                        type='text'
                        onChange={(event) => this.handleInputOnChange(event)}
                    />

                    <Input
                        id='lastName-id'
                        name='lastName'
                        label='Nom de famille'
                        type='text'
                        onChange={(event) => this.handleInputOnChange(event)}
                    />

                    <Input
                        id='address-id'
                        name='address'
                        label='Adresse'
                        type='text'
                        onChange={(event) => this.handleInputOnChange(event)}
                    />

                    <Select
                        id='city'
                        name='city'
                        label='Ville'
                        options={this.state.cities}
                        onChange={(event) => this.handleInputOnChange(event)}
                    />

                    <div className='row'>
                        <div className='col text-center'>
                            <input class='btn btn-primary' type='submit' value='Sauvegarder' />
                        </div>
                    </div>
                </form>

                <h1>Les valeurs saisies:</h1>

                <pre>
                    {JSON.stringify(this.state.values)}
                </pre>

                <h1>La réponse du serveur:</h1>

                <pre>
                    {JSON.stringify(this.state.result)}
                </pre>
            </div>
        )
    }
}

export default Inscription
