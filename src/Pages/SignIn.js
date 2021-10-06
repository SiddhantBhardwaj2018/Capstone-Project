import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        const myRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uname: username, pword: password })
        };
        console.log(myRequest)
        fetch('/SignIn', myRequest)
            .then(response => response.json())
            .then(data => console.log(data));
        e.preventDefault();
    }
    

    return (
        <div>
            <form onSubmit={e => { handleSubmit(e) }}>
                <h3>Welcome back!</h3>
                <label>Username/Email</label>
                <input
                name='username'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
                <br />
                <label>Password</label>
                <input
                name='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
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
export default SignIn;