import React from 'react';
import '../App.css';
import Navbar from '../component/navbar-component'
import InscriptionClient from '../component/inscription-client-component'

function PageInscriptionClient(props) {
  return (
    <div>
      <Navbar
      />

      <InscriptionClient
      />
      
    </div>
  );
}

export default PageInscriptionClient;