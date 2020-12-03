import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import '../App.css'

const INSCRIPTION_CLIENT = props => {
    const {commerceId} = useParams();
    const [name, setName] =  useState("");
    const [telephone, setTelephone] =  useState("");

    const onClickHandler = e =>{
            e.preventDefault();
            console.log(commerceId, name, telephone);
            let clients = localStorage.getItem("clients");            
            
            if (!clients){
                const info = {
                    id: 1,
                    nom: name,
                    telephone,
                    id_commerce: commerceId,
                    position: 1
                }
                localStorage.setItem("clients", JSON.stringify([info]))
            }
            else{
                clients = JSON.parse(clients);
                const info = {
                    id: clients.length,
                    nom: name,
                    telephone,
                    id_commerce: commerceId,
                    position:  clients.filter(clients=>clients.id_commerce === commerceId).length + 1
                }
                clients.push(info);
                localStorage.setItem("clients", JSON.stringify(clients));
            }
    }

    return(
    <div>
        <form className="form-client">
                <div className="form-group">
                    <label htmlFor="nomInput">Entrez votre nom</label>
                    <input type="text" className="form-control" id="nomInput" aria-describedby="name" value={name} onChange={e=>setName(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="telephone">Entrez votre numéro de téléphone</label>
                    <input type="tel" className="form-control" id="telephone" value={telephone} onChange={e=>setTelephone(e.target.value)}></input>
                </div>
                
                <button className="btn btn-primary" onClick={onClickHandler}>Se mettre en ligne</button>
        </form>
    </div>
)}
export default INSCRIPTION_CLIENT