import React, { useCallback } from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router';
import  app from '../firebase';

const db = app.firestore()

function SignUp({ history }) {
    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const { firstname,lastname, username, email, password } = event.target.elements;
        try{
            await app.auth().createUserWithEmailAndPassword(email.value,password.value).then(cred => {
                return db.collection("users").doc(cred.user.uid).set({
                    id: cred.user.uid,
                    username: username.value,
                    firstname: firstname.value,
                    lastname: lastname.value,
                    amount_balance: 1500,
                    wallet: {},
                    profit: 0,
                    receipts: []
                })
            })
            history.push("/Information")
        }catch(error){
            alert(error)
        }
    },[history])

    return (
        <form onSubmit={e => { handleSubmit(e) }}>
             <label>FirstName</label>
            <input
                name='firstname'
                type='text'
            />
            <br />
            <label>LastName</label>
            <input
                name='lastname'
                type='text'
            />
            <br />
            <label>Username</label>
            <input
                name='username'
                type='text'
            />
            <br />
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