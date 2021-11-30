import React, {useState,useEffect, useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth';
import app from '../firebase';

function SignIn({ history }) {

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app.auth().signInWithEmailAndPassword(email.value, password.value);
            history.push("/")
        } catch (error) {
            alert(error)
        }
    }, [history])

    const { currentUser } = useContext(AuthContext)
    if (currentUser) {
        return <Redirect to="/Market" />
    }
    return (
        <div>
            <form onSubmit={e => { handleSubmit(e) }}>
                <div>
                    <h3 style = {{fontFamily: 'Kanit'}}> Welcome back!</h3>
                </div>
                <div className="signin">
                    <label style = {{fontFamily: 'Kanit'}}>Email</label>
                </div>
                <input
                    name='email'
                    type='email'
                    placeholder = "John@example.com"
                />
                <br />
                <div className="signin">
                    <label style = {{fontFamily: 'Kanit'}}>Password</label>
                </div>
                <input
                    name='password'
                    type='password'
                    placeholder = "********"
                />
                <br />
                <br />
                <div className="button">
                    <button style = {{fontFamily: 'Kanit'}} className=".btn-space btn btn-outline-primary mr-1" type="submit">Sign In!</button>
                </div>
            </form>
            <br />
            <label style = {{fontFamily: 'Kanit'}}>New to Cryptic?</label>
            <br />
            <button style = {{fontFamily: 'Kanit'}} className=".btn-space btn btn-outline-primary mr-1"><Link style={{ color: "blue" }} to="/SignUp">Sign Up!</Link></button>
            <br />
            <br />
            <Link style = {{fontFamily: 'Kanit'}} className=".btn-space btn btn-outline-primary mr-1" to="/ForgotPassword" >Forgot Password?</Link>
            <br />
            <br />
        </div>
    )
}
export default withRouter(SignIn);