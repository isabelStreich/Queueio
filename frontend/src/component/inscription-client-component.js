import React, {useState,useEffect} from 'react'
import Navbar from './navbar-component'
import {useParams, useHistory} from 'react-router-dom'
import '../App.css'

function INSCRIPTION_CLIENT(props) {   
    const commerceId = (props.location && props.location.state) || "" ;

    const initialFormData = Object.freeze({
        name: "",
        phone: "",
        commerceId: commerceId
    });

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        console.log(commerceId);
    }, []);


    const onChangeHandler = e =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };    



    const onClickHandler = e =>{
        e.preventDefault();
        console.log(commerceId)

        async function sendData() {
            await sendUserInfo();
        }

        sendData();		

        async function sendUserInfo() {			
            const response = await fetch(
                "https://queueio.herokuapp.com/prendreNumero/" + formData.commerceId + "," + formData.phone + "," + formData.name,{
                    method: 'POST'
                }                
            );
            const liste = await response.json();
            console.log(liste);
        }

        props.history.push({
            pathname: '/file-attente',
            state: formData
        })            
    }


    return(
    <div>
        <Navbar
        />
        <form className="form-client">
                <div className="form-group">
                    <label htmlFor="nomInput">Entrez votre nom</label>
                    <input type="text" className="form-control" id="nomInput" name="name" aria-describedby="name" onChange={onChangeHandler} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="telephone">Entrez votre numéro de téléphone</label>
                    <input type="tel" className="form-control" id="telephone" name="phone" onChange={onChangeHandler} required></input>
                </div>                
                <button className="btn btn-primary" onClick={onClickHandler}>Se mettre en ligne</button>
               
        </form>
    </div>
)}
export default INSCRIPTION_CLIENT