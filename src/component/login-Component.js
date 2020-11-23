import React from 'react'
import { Button } from '@material-ui/core'

const LoginComponent = () => (
    <form action="login.html">

        <fieldset>
            <legend>Se connecter</legend>
            <div>
                <label for="Courriel">Courriel</label>
                <input type="text" id="Courriel" placeholder="Courriel" name="Courriel" required="required"
                    maxlength="50" autofocus />
            </div>

            <div>
                <label for="firstName">Mot de passe </label>
                <input type="text" id="password" name="password" placeholder="Mot de passe" required="required"
                    maxlength="50" />
            </div>
        </fieldset>
        <div>
            <input type="submit" value="Soumettre" />
        </div>
        <div>
            <input type="submit" value="S'incrire" />
        </div>
    </form>
)