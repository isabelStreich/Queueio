import React from 'react'

const FILTRE = () => (
    <div class="card bg-light mb-3" id="filtre-commerce">
        <div class="card-header">Filtrer par type de commerces</div>
        <div class="card-body">
          <h5 class="card-title">Catégories</h5>
          <div class="form-check">
            <div className="label-filtre">
              <input class="form-check-input" type="radio" name="filtre" id="filtre1" value="Tous" checked></input>
              <label class="form-check-label" for="filtre1">Tous</label>
            </div>
            <div className="label-filtre">
              <input class="form-check-input" type="radio" name="filtre" id="filtre2" value="Épicerie" ></input>
              <label class="form-check-label" for="filtre2">Épicerie</label>
            </div>
            <div className="label-filtre">
              <input class="form-check-input" type="radio" name="filtre" id="filtre3" value="Restaurant" ></input>
              <label class="form-check-label" for="filtre3">Restaurant</label>
            </div>
            <div className="label-filtre">
              <input class="form-check-input" type="radio" name="filtre" id="filtre4" value="Services gouvernementaux" ></input>
              <label class="form-check-label" for="filtre4">Services gouvernementaux</label>
            </div>
            <div className="label-filtre">
              <input class="form-check-input" type="radio" name="filtre" id="filtre5" value="Vente"></input>
              <label class="form-check-label" for="filtre5">Vente</label>
            </div>
          </div>
        </div>
      </div>
)
export default FILTRE