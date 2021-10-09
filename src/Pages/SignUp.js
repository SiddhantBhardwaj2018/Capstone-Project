import React, { useCallback } from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router';
import app from '../firebase';

function SignUp({ history }) {
    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try{
            await app.auth().createUserWithEmailAndPassword(email.value,password.value)
            console.log("First Step achieved")
            history.push("/")
        }catch(error){
            alert(error)
        }
    },[history])

    return (
        <form onSubmit={e => { handleSubmit(e) }}>
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
            <button type="submit">Sign Up!</button>
        </form>
    )
}
export default withRouter(SignUp);