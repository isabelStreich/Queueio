import React from 'react'
import logo from '../logo.svg';
import {Link} from 'react-router-dom'
import FileAttente from '../file-attente.json'

const CARTE_COMMERCE = props => {

  // const [file, setFile] =  useState({});


  return(
      <div>
        <div className="card bg-light mb-3" id="carte-commerce">
          <div className="card-header"><img src={logo} alt="Logo" width="100px"/>{props.nom}</div>
          <div className="card-body">
            <h5 className="card-title">Informations utiles</h5>
            <p className="card-text">Addresse: {props.addresse}</p>
            <p className="card-text">Nombre de personnes en file: {props.nbPersonnesEnFile} personnes.</p>
            <p className="card-text">Temps d'attente approximatif: {props.tempsAttenteApprox} minutes.</p>
            <Link to={`/info-client/${props.id}`}>
              <button type="button" className="btn btn-success">Prendre un numéro</button>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default CARTE_COMMERCE