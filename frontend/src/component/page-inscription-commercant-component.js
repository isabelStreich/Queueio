import React from 'react'
import { Button } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function radioButtonsGroup() {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Qui etes vous</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="commercant" />
                <FormControlLabel value="male" control={<Radio />} label="client" />
            </RadioGroup>
        </FormControl>
    );
}
const PageInscriptionComponent = () => (
    <div className=''>



        <div id='divTextMarketing'>
            <div id='divText1' href='#'>

                <p>Bienvenu</p>
            </div>

            <h1>Inscription</h1>
            {radioButtonsGroup()}
            <div id='divFormulaire'>
                <form action="inscription.html">

                    <fieldset>
                        <legend>Vous êtes:</legend>
                        <div>
                            <label for="nomDuCommerce">Nom Du Commerce</label>
                            <input type="text" id="nomDuCommerce" placeholder="Nom Du Commerce" name="nomDuCommerce"
                                required="required" maxlength="50" autofocus />
                        </div>
                        <div>
                            <label for="nomDuCommerce">Ville</label>
                            <input type="text" id="ville" placeholder="Ville" name="ville" required="required" maxlength="50" />
                        </div>
                        <div>
                            <label for="nomDuCommerce">Pays</label>
                            <input type="text" id="pays" placeholder="pays" name="pays" required="required" maxlength="50" />
                        </div>

                        <div>
                            <label for="userPhone">Téléphone</label>
                            <input type="tel" id="userPhone" name="userPhone" placeholder="514-888-9999"
                                pattern="^\(?\d{3}\)?(-| )?\d{3}(-| )?\d{4}$" required="required" />
                        </div>

                        <div>
                            <label for="userEmail">Courriel</label>
                            <input type="email" id="userEmail" name="userEmail" placeholder="Courriel" required="required"
                                maxlength="100" />
                        </div>

                        <div>
                            <label for="password">Mot de Passe </label>
                            <input type="text" id="password" name="password" placeholder="Mot de Passe" required="required"
                                maxlength="2000" />
                        </div>

                        <div>
                            <label for="story">Adresse</label>

                            <textarea id="adresse" name="adresse" rows="5" cols="33">
                            </textarea>
                        </div>
                    </fieldset>

                    {/* <div>
                        <input type="submit" value="Soumettre" />
                    </div>

                    <div>
                        <input type="submit" value="Quitter" />
                    </div> */}
                    <div id='divBtnJoin'>
                        <Button id='btnJoin1' variant='outlined'>Soumettre</Button>
                        <Button id='btnJoin2' variant='outlined'>S'inscrire</Button>
                    </div>
                </form>
            </div>



        </div>
    </div>

)

export default PageInscriptionComponent
