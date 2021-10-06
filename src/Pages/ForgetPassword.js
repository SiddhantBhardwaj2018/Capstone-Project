import React from 'react';
import { useState } from 'react';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        const myRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        };
        console.log(myRequest)
        fetch('/ForgetPassword', myRequest)
            .then(response => response.json())
            .then(data => console.log(data));
        e.preventDefault();
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
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
        </form>
    )
}
export default ForgetPassword;