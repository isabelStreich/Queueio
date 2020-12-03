import React from 'react'

const FILTRE = () => (
    <div className="card bg-light mb-3" id="filtre-commerce">
        <div className="card-header">Filtrer par type de commerces</div>
        <div className="card-body">
          <h5 className="card-title">Catégories</h5>
          <div className="form-check">
            <div className="label-filtre">
              <input className="form-check-input" type="radio" name="filtre" id="filtre1" value="Tous" checked></input>
              <label className="form-check-label" for="filtre1">Tous</label>
            </div>
            <div className="label-filtre">
              <input className="form-check-input" type="radio" name="filtre" id="filtre2" value="Épicerie" ></input>
              <label className="form-check-label" for="filtre2">Épicerie</label>
            </div>
            <div className="label-filtre">
              <input className="form-check-input" type="radio" name="filtre" id="filtre3" value="Restaurant" ></input>
              <label className="form-check-label" for="filtre3">Restaurant</label>
            </div>
            <div className="label-filtre">
              <input className="form-check-input" type="radio" name="filtre" id="filtre4" value="Services gouvernementaux" ></input>
              <label className="form-check-label" for="filtre4">Services gouvernementaux</label>
            </div>
            <div className="label-filtre">
              <input className="form-check-input" type="radio" name="filtre" id="filtre5" value="Vente"></input>
              <label className="form-check-label" for="filtre5">Vente</label>
            </div>
          </div>
        </div>
      </div>
)
export default FILTRE