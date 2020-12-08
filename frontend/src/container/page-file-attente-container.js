import React, {useEffect, useState} from 'react';
import '../App.css';
import Navbar from '../component/navbar-component'
import ListeCommerce from '../liste-commerces.json'
import FileAttente from '../file-attente.json'
import {useHistory} from "react-router-dom"

const myUserid = 1;



function PageFileAttente() {
  
  let history = useHistory();

  const [client, setClient] =  useState({});
  const [commerce, setCommerce] =  useState({});
  const [file, setFile] =  useState({});

  useEffect(() => {
    let clients = localStorage.getItem("clients");
    if (clients){
      clients = JSON.parse(clients);

      setClient(clients.find(client =>{

        if (client.id === myUserid){
          console.log(client.id_commerce);
          setCommerce(ListeCommerce.find(commerce =>commerce.id === client.id_commerce));
          setFile(FileAttente.find(f => f.id_commerce === client.id_commerce));
          return true
        }
        return false
      }));     
    }
    
  },[])   

  const onClickHandler= () =>{
    let clients = localStorage.getItem("clients");

    if (clients){
      clients = JSON.parse(clients);
      localStorage.setItem("clients", JSON.stringify(clients.filter(c => c.id !== client.id)));
    }
    history.push('/');
  }
  

  return (
    <div>
        <Navbar
        />
        <div className='file-attente'>
            <h2>Bienvenue! {client.nom} </h2>
            <h3>Vous êtes dans la fille d'attente pour: {commerce.nom_compagnie}  </h3>

            <div className="card border-info mb-3" id="carte-file-attente">
                <div className="card-header">Votre fille d'attente</div>
                <div className="card-body text-info">
                    <h5 className="card-title">Votre numéro est le: {client.position}   </h5>
                    <p className="card-text">Il y a présentement: {client.position - file.numero_actuel}  personnes devant vous.</p>
                    <p className="card-text">Le temps d'attente est d'environ: {(client.position - file.numero_actuel) * 5} minutes.</p>
                </div>
            </div>
            <button type="button" className="btn btn-danger" onClick={onClickHandler}>Quitter la file d'attente</button>
        </div>      
    </div>
  );
}

export default PageFileAttente;