import React from 'react'
import logo from '../logo.svg';

const CARTE_COMMERCE = (props) => (
    <div>
       <div class="card bg-light mb-3" id="carte-commerce">
        <div class="card-header"><img src={logo} alt="Logo" width="100px"/>{props.nom}</div>
        <div class="card-body">
          <h5 class="card-title">Informations utiles</h5>
          <p class="card-text">Nombre de personnes en file:{props.nbPersonnesEnFile}</p>
          <p class="card-text">Temps d'attente approximatif: {' '} {props.tempsAttenteApprox}</p>
          <button type="button" class="btn btn-success">Prendre un numéro</button>
        </div>
      </div>
    </div>
)

export default CARTE_COMMERCE