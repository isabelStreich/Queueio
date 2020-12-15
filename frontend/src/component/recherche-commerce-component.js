import React, {useState} from 'react'

const RECHERCHE = () => {

  const [search, setSearch] =  useState("");

  return (
      <div>
          <form className="form-inline">
          <div className="form-group mx-sm-3 mb-2" id="rechercheCommerce">
            <input type="text" className="form-control" id="input-recherche" value="Rechercher des commerces" placeholder="Rechercher des commerces" onChange={e=>setSearch(e.target.value)}></input>
          </div>          
        </form>
      </div>
  )
}

export default RECHERCHE