import React from 'react'
import { Button } from '@material-ui/core'

const LoginRapideComponent = () => (
    <div className=''>


        <div id='divTextMarketing'>
            <div id='divText1' href='#'>

                <p>Bienvenu</p>

            </div>
            <div id='divFormulaire'>
                <form action='login.html'>

                    <fieldset>
                        <legend>Se connecter</legend>
                        <div>
                            <label for='Courriel'>Prenom</label>
                            <input
                                type='text' id='Courriel' placeholder='Courriel' name='Courriel' required='required'
                                maxlength='50' autofocus
                            />
                        </div>

                        <div>
                            <label for='firstName'>Telephone </label>
                            <input
                                type='text' id='password' name='password' placeholder='Mot de passe' required='required'
                                maxlength='50'
                            />
                        </div>
                    </fieldset>

                </form>
            </div>

            <div id='divBtnJoin'>
                <Button id='btnJoin1' variant='outlined'>Soumettre</Button>
                <Button id='btnJoin2' variant='outlined'>S'inscrire</Button>
            </div>

        </div>
    </div>

)

export default LoginRapideComponent
