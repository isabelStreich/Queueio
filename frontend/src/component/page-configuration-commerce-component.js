import React from 'react'

const PageConfigurationComponent = ({ nomDuCommerceRef, villeRef, paysRef, userPhoneRef, emailRef, passwordRef, adresseRef, handleSubmit, errors, handleChange, maxClientDansCommerceRef, horaireOuvertureRef, horaireFermetureRef, tempsMaxAttenteClientRef }) => {
    return (
        <div className=''>

            <div id='divTextMarketing'>
                <div id='divText1' href='#'>

                    <p>Bienvenu</p>
                </div>

                <div id='divFormulaire'>
                    <form onSubmit={handleSubmit}>
                        <h1>Configuration du Commerce</h1>
                        <fieldset>

                            <div className='nomDuCommerce'>
                                {/* <label htmlFor="nomDuCommerce">Nom Du Commerce</label> */}
                                <input class="form-control mb-4" ref={nomDuCommerceRef} type='text' id="nomDuCommerce" name='nomDuCommerce' placeholder="Nom Du Commerce" required="required" maxlength="50" autofocus />

                            </div>

                            <div className='ville'>
                                {/* <label for="ville">Ville</label> */}
                                <input class="form-control mb-4" ref={villeRef} type="text" id="ville" placeholder="Ville" name="ville" required="required" maxlength="50" />
                            </div>
                            <div className='pays'>
                                {/* <label for="pays">Pays</label> */}
                                <input class="form-control mb-4" ref={paysRef} type="text" id="pays" placeholder="pays" name="pays" required="required" maxlength="50" />
                            </div>

                            <div className='userPhone'>
                                {/* <label for="userPhone">Téléphone</label> */}
                                <input class="form-control mb-4" ref={userPhoneRef} type="tel" id="userPhone" name="userPhone" placeholder="514-888-9999"
                                    pattern="^\(?\d{3}\)?(-| )?\d{3}(-| )?\d{4}$" required="required" />
                            </div>

                            <div className='email'>
                                {/* <label htmlFor="email">Email</label> */}
                                <input class="form-control mb-4" ref={emailRef} type='email' name='email' onChange={handleChange} placeholder="Enter email" />
                                {errors.email.length > 0 &&
                                    <span className='error'>{errors.email}</span>}
                            </div>
                            <div className='password'>
                                {/* <label htmlFor="password">Password</label> */}
                                <input class="form-control mb-4" ref={passwordRef} type='password' name='password' onChange={handleChange} placeholder="Enter password" />
                                {errors.password.length > 0 &&
                                    <span className='error'>{errors.password}</span>}
                            </div>

                            <div className='adresse'>
                                <label for="story">Adresse</label>

                                <textarea class="form-control mb-4" id="adresse" ref={adresseRef} name="adresse" rows="3" cols="10" required>
                                </textarea>
                            </div>

                            <div className='checkbox'>
                                <label for="validationClient">Demander une validation au client(sms)</label>
                                <input type="checkbox" id="validationClient" name="validation" value="sendMessageClient" onChange={handleChange} />

                            </div>

                            <div className='maxClientDansCommerce'>
                                <label for="maxClientDansCommerce">max Clients  Dans le Commerce</label>
                                <input ref={maxClientDansCommerceRef} type="text" id="maxClientDansCommerce" placeholder="max Clients  Dans le Commerce" name="maxClientDansCommerce" required="required" maxlength="50" />
                            </div>
                            <div className='horaireOuverture'>
                                <label for="horaireOuverture">horaire d'Ouverture:</label>
                                <input ref={horaireOuvertureRef} type="time" id="horaireOuverture" name="horaireOuverture"
                                    min="06:00" max="23:00" required></input>
                            </div>
                            <div className='horaireFermeture'>
                                <label for="horaireFermeture">horaire de fermeture:</label>
                                <input ref={horaireFermetureRef} type="time" id="horaireFermetureRef" name="horaireFermetureRef"
                                    min="06:00" max="23:00" required></input>

                            </div>
                            <div className='tempsMaxAttenteClient'>
                                <label for="tempsMaxAttenteClient">le temps Max d'attente du Client dans la file</label>
                                <input ref={tempsMaxAttenteClientRef} type="text" id="tempsMaxAttenteClient" placeholder="max temps  Dans le Commerce" name="maxClientDansCommerce" required="required" maxlength="50" />
                            </div>

                            <div className='submit'>
                                <button type="submit" class="btn btn-primary btn-lg btn-block">Sauvegarder les modifications</button>
                            </div>
                            <div className='quitter'>
                                <button type="submit" class="btn btn-secondary btn-lg btn-block">Annuler</button>
                            </div>
                        </fieldset>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default PageConfigurationComponent
