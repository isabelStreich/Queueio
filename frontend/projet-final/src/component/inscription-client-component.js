import React from 'react'
import '../App.css'

const INSCRIPTION_CLIENT = () => (
    <div>
    <form className="form-client">
            <div class="form-group">
                <label for="nomInput">Entrez votre nom</label>
                <input type="text" class="form-control" id="nomInput" aria-describedby="name"></input>
            </div>
            <div class="form-group">
                <label for="telephone">Entrez votre numéro de téléphone</label>
                <input type="tel" class="form-control" id="telephone"></input>
            </div>
            
            <button type="submit" class="btn btn-primary">Se mettre en ligne</button>
        </form>
    </div>
)
export default INSCRIPTION_CLIENT