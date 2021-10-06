import React from 'react';
import { useState } from 'react';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        const myRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uname: username, email: email, pword: password })
        };
        console.log(myRequest)
        fetch('/SignUp', myRequest)
            .then(response => response.json())
            .then(data => console.log(data));
        e.preventDefault();
    }

    return (
        <form onSubmit={e => { handleSubmit(e) }}>
            <h3>Start Your Future Trading Here!</h3>
            <label>Username</label>
            <input
                name='username'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <br />
            <label>Email</label>
            <input
                name='email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
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
            <button type="submit">Sign Up!</button>
        </form>
    )
}
export default SignUp;