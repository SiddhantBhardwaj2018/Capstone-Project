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
            <h3 style = {{fontFamily: 'Kanit'}}>Forgot your Password?</h3>
            <p style = {{fontFamily: 'Kanit'}}>Please input your email</p>
            <p style = {{fontFamily: 'Kanit'}}>Confirmation will be sent to your mailbox.</p>
            <br />
            <div className="signin">
            <label style = {{fontFamily: 'Kanit'}}>Email</label>
            </div>
            <input
                name='email'
                type='email'
                placeholder = "John@example.com"
            />
            <br />
            <br />
            <button style = {{fontFamily: 'Kanit'}} class="black" className=".btn-space btn btn-outline-primary mr-1" type="submit">Submit</button>
        </form>
    )
}
export default withRouter(ForgetPassword);