import React from 'react'
import { Button } from '@material-ui/core'

const LoginComponent = ({ emailRef, passwordRef, handleSubmit, handleChange, errors }) => {
    return (

        <div classNameName=''>
            <div id='divTextMarketing'>

                <div id='divText1' href='#'>

                    <p>Bienvenu</p>

                </div>
                <div className='wrapper'>
                    <div className='form-wrapper'>
                        <div id='divFormulaire'>
                            <form onSubmit={handleSubmit}>
                                <div className='email'>
                                    <label htmlFor="email">Email</label>
                                    <input ref={emailRef} type='email' name='email' onChange={handleChange} placeholder="Enter email" />
                                    {errors.email.length > 0 &&
                                        <span className='error'>{errors.email}</span>}
                                </div>
                                <div className='password'>
                                    <label htmlFor="password">Password</label>
                                    <input ref={passwordRef} type='password' name='password' onChange={handleChange} placeholder="Enter password" />
                                    {errors.password.length > 0 &&
                                        <span className='error'>{errors.password}</span>}
                                </div>
                                <div className='submit'>
                                    <button>Soumettre</button>
                                </div>
                                <div className='inscription'>
                                    <button>S'inscrire</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default LoginComponent
