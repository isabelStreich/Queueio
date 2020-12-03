import React from 'react'



const PageInscriptionComponent = ({ nomDuCommerceRef, villeRef, paysRef, userPhoneRef, emailRef, passwordRef, adresseRef, handleSubmit, errors, handleChange }) => {
    return (
        <div className=''>
            <div id='divTextMarketing'>

                <div id='divText1' href='#'>

                    <p>Bienvenu</p>
                </div>

                <h1>Inscription</h1>

                <div id='divFormulaire'>
                    <form onSubmit={handleSubmit} class="text-center border border-light p-5">

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
                                <input class="form-control mb-4" ref={emailRef} type='email' name='email' onChange={handleChange} placeholder="Enter email" required />
                                {errors.email.length > 0 &&
                                    <span className='error'>{errors.email}</span>}
                            </div>



                            <div className='password'>
                                {/* <label htmlFor="password">Password</label> */}
                                <input class="form-control mb-4" ref={passwordRef} type='password' name='password' onChange={handleChange} placeholder="Enter password" required />
                                {errors.password.length > 0 &&
                                    <span className='error'>{errors.password}</span>}
                            </div>


                            <div className='adresse'>
                                <label for="story">Adresse</label>

                                <textarea class="form-control mb-4" id="adresse" ref={adresseRef} name="adresse" rows="3" cols="10" required>
                                </textarea>
                            </div>

                        </fieldset>

                        <div className='submit'>
                            <button type="submit" class="btn btn-info btn-block my-4">Soumettre</button>
                        </div>
                        <div className='quitter'>
                            <button type="submit" class="btn btn-info btn-block my-4">Quitter</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default PageInscriptionComponent
