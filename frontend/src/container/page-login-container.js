import {Link} from 'react-router-dom'
import React, { useState, useHistory } from 'react'
import { Form, Button } from 'react-bootstrap';

import Navbar from '../component/navbar-component'

function LoginContainer(props) {      

    const initialFormData = Object.freeze({
        email: "",
        password: ""
    });
    
    const [formData, setFormData] = useState(initialFormData);
    // const [commerceId, setCommerceId] = useState(30);
    let userRetourne = [];

    const onChangeHandler = e =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleResponse = (response) =>{
        if (response === undefined || response.length === 0){
            alert("Mauvais email ou mot de passe.");
        }
        else{
            userRetourne = response[0];

            props.history.push({
                pathname: '/commerceConfig',
                state: userRetourne.id
            })
        }
    }

    const onSubmitHandler = e =>{
        e.preventDefault();

        async function sendData(){
            const responseLogin = await fetch('https://queueio.herokuapp.com/login/'.concat(formData.email).concat('/').concat(formData.password));
            const data = await responseLogin.json();
            return data;
        }
        sendData().then(reponse =>{
            handleResponse(reponse);
        })      

        
        // fetch('https://queueio.herokuapp.com/login/'.concat(formData.email).concat('/').concat(formData.password))
        //     .then(response => response.json())
        //     .then(data => {
        //     console.log('Success:', data);
        //     response = data;
        //     console.log(response);
        //     })
        //     .catch((error) => {
        //     console.error('Error:', error);
        // });        
    }

    return (

        <div>
            <Navbar/>

            <div className='form-wrapper'>
                <div id='divFormulaire'>
                    <form onSubmit={onSubmitHandler} className="text-center border border-light p-5">
                        <p className="h4 mb-4">Sign in</p>
                        <div className='email'>
                            <label htmlFor="email">Email</label>
                             <input  type='email' className="form-control mb-4" name='email' onChange={onChangeHandler} placeholder="Enter email" />                           
                        </div>
                        <div className='password'>
                            <label htmlFor="password">Password</label>
                            <input className="form-control mb-4" type='password' name='password' onChange={onChangeHandler} placeholder="Enter password" />                            
                        </div>
                        <div className='submit' >
                            <button className="btn btn-info btn-block my-4" type="submit">Soumettre</button>
                        </div>

                        <Link to={`/inscription`}>
                            <button type="button" className="btn btn-info btn-block my-4">S'inscrire</button>
                        </Link>
                    </form>
                </div>
            </div>
{/* 
            <div>
                <h1>Registration Form</h1>
                <Form className="register-form">
                    <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                    />
                    </Form.Group>
                    <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                    />
                    </Form.Group>
                    <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        name="city"
                    />
                    </Form.Group>
                    <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter phone"
                        name="phone"
                    />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Register
                    </Button>
                </Form>
            </div> */}
        </div>

    );


}

export default LoginContainer;
