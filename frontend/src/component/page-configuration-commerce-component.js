import React from 'react'
import { Button } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function radioButtonsGroup() {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Definir la couleur de votre application</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="berge" control={<Radio />} label="berge par defaut" />
                <FormControlLabel value="gris" control={<Radio />} label="gris" />
                <FormControlLabel value="vert" control={<Radio />} label="vert" />
            </RadioGroup>
        </FormControl>
    );
}

export default function SwitchLabels() {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <FormGroup row>
            <FormControlLabel
                control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                label="Secondary"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Primary"
            />
            <FormControlLabel control={<Switch />} label="Uncontrolled" />
            <FormControlLabel disabled control={<Switch />} label="Disabled" />
            <FormControlLabel disabled control={<Switch checked />} label="Disabled" />
        </FormGroup>
    );
}
//pour la date
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

//pour la date
export default function TimePickers() {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="debutTemps"
                label="temps d'ouverture"
                type="time"
                defaultValue="07:30"
                className={classes.textField1}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />

            <TextField
                id="finTemps"
                label="temps de fermeture"
                type="time"
                defaultValue="18:30"
                className={classes.textField2}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
        </form>
    );
}
const PageConfigurationComponent = () => (
    <div className=''>

        <div id='divTextMarketing'>
            <div id='divText1' href='#'>

                <p>Bienvenu</p>
            </div>

            <div id='divFormulaire'>
                <form action="configuration.html">

                    <fieldset>
                        <div>
                            <label for="story">Adresse</label>

                            <textarea id="adresse" name="adresse" rows="5" cols="33">
                            </textarea>
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
                            <label for="maxClient">Definir le nombre maximum de client dans le commerce </label>
                            <input type="text" id="maxClient" name="maxClient" placeholder="max Client dans le commerce" required="required"
                                maxlength="2000" />
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


                    </fieldset>

                    <div class='affichageCouleur'>
                        {radioButtonsGroup()}
                    </div>

                    <div class='switch'>
                        <label for="validationClient">Demander une validation au client(sms)</label>
                        {SwitchLabels()}
                    </div>

                    <div class='formatDate'>
                        <label for="validationClient">Definir horaire de travail</label>
                        {TimePickers()}
                    </div>
                    <h1>Definire les services</h1>
                    <div id='divBtnJoin'>
                        <Button id='btnSaveModification' variant='outlined'>Sauvegarder Les modifications </Button>
                        <Button id='btnCancel' variant='outlined'>Annuler</Button>
                    </div>

                </form>
            </div>
        </div>
    </div>

)

export default PageConfigurationComponent
