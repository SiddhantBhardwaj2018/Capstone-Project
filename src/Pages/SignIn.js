import React, { useCallback, useContext } from 'react';
import { useState } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth';
import app from '../firebase';

function SignIn({ history }) {
    
    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        console.log(email.value,password.value)
        try{
            await app.auth().signInWithEmailAndPassword(email.value,password.value);
            history.push("/")
        }catch(error){
            alert(error)
        }
    },[history])
    
    const  { currentUser } = useContext(AuthContext)
    if(currentUser){
        return <Redirect to = "/" />
    }
    return (
        <div>
            <form onSubmit={e => { handleSubmit(e) }}>
                <h3>Welcome back!</h3>
                <label>Email</label>
                <input
                name='email'
                type='email'
                />
                <br />
                <label>Password</label>
                <input
                name='password'
                type='password'
                />
                <br />
                <button type="submit">Sign In!</button>
            </form>
            <br/>
            <label>New for Cryptics?</label>
            <button><Link to="/SignUp">Sign Up!</Link></button>
            <br />
            <Link to="/ForgetPassword">Forget Password</Link>
         </div>
    )
}
export default withRouter(SignIn);