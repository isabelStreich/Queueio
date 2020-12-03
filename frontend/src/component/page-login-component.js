import React from 'react'
import { Button } from '@material-ui/core'

const LoginComponent = ({ emailRef, passwordRef, handleSubmit, handleChange, errors }) => {
    return (

        <div className=''>
            <div id='divTextMarketing'>

                <div id='divText1' href='#'>

                    <p>Bienvenu</p>

                </div>
                <div className='wrapper'>
                    <div className='form-wrapper'>
                        <div id='divFormulaire'>
                            <form onSubmit={handleSubmit} class="text-center border border-light p-5">
                                <p class="h4 mb-4">Sign in</p>
                                <div className='email'>
                                    <label htmlFor="email">Email</label>
                                    <input ref={emailRef} type='email' class="form-control mb-4" name='email' onChange={handleChange} placeholder="Enter email" />
                                    {errors.email.length > 0 &&
                                        <span className='error'>{errors.email}</span>}
                                </div>
                                <div className='password'>
                                    <label htmlFor="password">Password</label>
                                    <input class="form-control mb-4" ref={passwordRef} type='password' name='password' onChange={handleChange} placeholder="Enter password" />
                                    {errors.password.length > 0 &&
                                        <span className='error'>{errors.password}</span>}
                                </div>
                                <div className='submit' >
                                    <button class="btn btn-info btn-block my-4" type="submit">Soumettre</button>
                                </div>
                                <div className='inscription'>
                                    <button class="btn btn-info btn-block my-4" type="submit">S'inscrire</button>
                                </div>

                                <p>or sign in with:</p>

                                <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
                                <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
                                <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
                                <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default LoginComponent
