import React, {useEffect, useState} from 'react';
import '../App.css';
import Navbar from '../component/navbar-component'
// import ListeCommerce from '../liste-commerces.json'
import FileAttente from '../file-attente.json'
import {useHistory} from "react-router-dom"

function PageFileAttente(props) {
  
  let history = useHistory();
  const userInfo = (props.location && props.location.state) || "";

  const [client, setClient] =  useState({});  
  const [commerce, setCommerce] =  useState({});
  const [file, setFile] =  useState({});
  const [fileInitial, setFileInitial] =  useState({});
  const [position, setPosition] =  useState([]);
  const [numeroActuel, setNumeroActuel] =  useState([]);
  const [keyClient, setKeyClient] =  useState([]);  

  useEffect(() => {
    async function fetchData() {
      await fetchCommerceInfo();
      await fetchFile();
		}

    fetchData();


    async function fetchCommerceInfo() {
      const response = await fetch(
          "https://queueio.herokuapp.com/commerceById/".concat(userInfo.commerceId)
      );
      const liste = await response.json();
      if (liste !== undefined && liste.length !== 0) {				
          setCommerce(liste[0]);
      }
    }

    async function fetchFile() {
      const response = await fetch(
          "https://queueio.herokuapp.com/redis/listClient/".concat(userInfo.commerceId)
      );
      const liste = await response.json();
      if (liste !== undefined && liste.length !== 0) {		
          setKeyClient("commerce" + userInfo.commerceId + "Client" + liste[liste.length-1]);	
          setFile(liste);
          setFileInitial(liste);
          setPosition(liste[liste.length-1]);
          setNumeroActuel(liste[0]);
      }
    }

    setClient(userInfo);
    console.log(userInfo);

  },[])     

  const onClickHandler= () =>{

    console.log(keyClient);

    async function deleteDeLaFile() {
      await deleteClient();
		}

    deleteDeLaFile();

    async function deleteClient() {
      const response = await fetch(
          "https://queueio.herokuapp.com/deleteClientList/" + userInfo.commerceId + "," + keyClient );
      const liste = await response;
      console.log(liste);
    }

     history.push('/');
  }
  

  return (
    <div>
        <Navbar
        />
        <div className='file-attente'>
            <h2>Bienvenue! {client.name} </h2>
            <h3>Vous êtes dans la fille d'attente pour: {commerce.nom}  </h3>

            <div className="card border-info mb-3" id="carte-file-attente">
                <div className="card-header">Votre fille d'attente</div>
                <div className="card-body text-info">
                    <h5 className="card-title">Votre numéro est le: {position}   </h5>
                    <p className="card-text">Il y a présentement: {fileInitial.length - 1}  personnes devant vous.</p>
                    <p className="card-text">Le temps d'attente est d'environ: {(fileInitial.length-1) * 5} minutes.</p>
                </div>
            </div>
            <button type="button" className="btn btn-danger" onClick={onClickHandler}>Quitter la file d'attente</button>
        </div>      
    </div>
  );
}

export default PageFileAttente;