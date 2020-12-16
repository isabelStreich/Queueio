import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import NavBarComponent from '../component/navbar-component'

function PageConfifigurationCommerceContainer(props){

    let history = useHistory();

    const initialFormData = Object.freeze({
        nomDuCommerce: "",        
        adresse: "",
        email: "",
        password: ""
    });

    const [formData, setFormData] = useState(initialFormData);

    const onChangeHandler = e =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const onSubmitHandler = e =>{
        e.preventDefault();        

        fetch('https://queueio.herokuapp.com/commerceinscription/'.concat(formData.nomDuCommerce,'/',formData.adresse,'/', formData.email,'/', formData.password),{
            method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
        });

        history.push("/login")


    }

    return (
        <div>
            <NavBarComponent/>

            <h1>Inscription</h1>

            <div id='divFormulaire'>
                <form onSubmit={onSubmitHandler} className="text-center border border-light p-5">

                    <fieldset>
                        <div className='nomDuCommerce'>
                            <input className="form-control mb-4" type='text' id="nomDuCommerce" name='nomDuCommerce' placeholder="Nom Du Commerce" required maxLength="50" autoFocus onChange={onChangeHandler} />
                        </div>

                        {/* <div className='ville'>
                            <input className="form-control mb-4" type="text" id="ville" placeholder="Ville" name="ville" required="required" maxLength="50" onChange={onChangeHandler} />
                        </div>

                        <div className='pays'>
                            <input className="form-control mb-4" type="text" id="pays" placeholder="pays" name="pays" required="required" maxLength="50" onChange={onChangeHandler} />
                        </div> */}

                        {/* <div className='userPhone'>                           
                            <input className="form-control mb-4" type="tel" id="userPhone" name="userPhone" placeholder="514-888-9999"
                                pattern="^\(?\d{3}\)?(-| )?\d{3}(-| )?\d{4}$" required="required" onChange={onChangeHandler} />
                        </div> */}

                        <div className='email'>                            
                            <input className="form-control mb-4" type='email' name='email' placeholder="Enter email" required onChange={onChangeHandler}/>                         
                        </div>

                        <div className='password'>
                            <input className="form-control mb-4" type='password' name='password'  placeholder="Enter password" required onChange={onChangeHandler} />                           
                        </div>

                        <div className='adresse'>
                            <label htmlFor="story">Adresse</label>
                            <textarea className="form-control mb-4" id="adresse"name="adresse" rows="3" cols="10" required onChange={onChangeHandler}>
                            </textarea>
                        </div>
                    </fieldset>

                    <div className='submit'>
                        <button type="submit" className="btn btn-info btn-block my-4">Soumettre</button>
                    </div>
                    <div className='quitter'>
                        <Link to={`/`}>
                            <button type="submit" className="btn btn-info btn-block my-4">Quitter</button>
                        </Link>
                        
                    </div>
                </form>
            </div>           
        </div>

    )
}

export default PageConfifigurationCommerceContainer
