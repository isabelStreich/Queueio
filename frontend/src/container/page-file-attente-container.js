import React from 'react';
import '../App.css';
import Navbar from '../component/navbar-component'

function PageFileAttente() {
  return (
    <div>
        <Navbar
        />
        <div className='file-attente'>
            <h2>Bienvenue! (prenom du client)</h2>
            <h3>Vous êtes dans la fille d'attente pour: (nom du commerce)</h3>

            <div className="card border-info mb-3" id="carte-file-attente">
                <div className="card-header">Votre fille d'attente</div>
                <div className="card-body text-info">
                    <h5 className="card-title">Votre numéro est le: (numéro du client)</h5>
                    <p className="card-text">Il y a présentement: (nombre de personnes avant le client) personnes devant vous.</p>
                    <p className="card-text">Le temps d'attente est d'environ: (temps d'attente approximatif en minutes).</p>
                </div>
            </div>
            <button type="button" className="btn btn-danger">Quitter la file d'attente</button>
        </div>      
    </div>
  );
}

export default PageFileAttente;