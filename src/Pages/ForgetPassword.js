import React from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth';
import app from '../firebase';

function ForgetPassword({ history }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email } = e.target.elements;
        try{
            app.auth().sendPasswordResetEmail(email.value);
            history.push("/")
        }catch(error){
            alert(error)
        }
    }

    return (
        <form onSubmit={e => { handleSubmit(e) }}>
            <h3>Have Trouble Logging In?</h3>
            <p>Please input your sign-in email</p>
            <p>And check your mailbox to confirm</p>
            <br />
            <label>Email</label>
            <input
                name='email'
                type='email'
            />
            <br />
            <button type="submit">Submit</button>
        </form>
    )
}
export default withRouter(ForgetPassword);