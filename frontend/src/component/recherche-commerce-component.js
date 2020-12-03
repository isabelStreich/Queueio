import React from 'react'

const RECHERCHE = () => (
    <div>
        <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2" id="rechercheCommerce">
          <input type="text" className="form-control" id="input-recherche" value="Rechercher des commerces" placeholder="Rechercher des commerces"></input>
        </div>
        <button type="submit" id="btn-recherche" className="btn btn-primary mb-2">Rechercher</button>
      </form>
    </div>
)

export default RECHERCHE