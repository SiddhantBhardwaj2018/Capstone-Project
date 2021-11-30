import React, { useCallback } from 'react';
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
                    uid: cred.user.uid,
                    username: username.value,
                    firstname: firstname.value,
                    lastname: lastname.value,
                    amount_balance: 1500,
                    wallet: {},
                    profit: 0,
                    receipts: []
                })
            })
            history.push("/Market")
        }catch(error){
            alert(error)
        }
    },[history])

    return (
        <form onSubmit={e => { handleSubmit(e) }}>
            <h3 style = {{fontFamily: 'Kanit'}}> Create your Cryptic account</h3>
            <div className=".signin">
             <label style = {{fontFamily: 'Kanit'}}>FirstName</label>
            </div>
            <input
                name='firstname'
                type='text'
                placeholder = 'First name'
            />
            <br />
            <div className=".signin">
            <label style = {{fontFamily: 'Kanit'}}>LastName</label>
            </div>
            <input
                name='lastname'
                type='text'
                placeholder = 'Last name'
            />
            <br />
            <div className=".signin">
            <label style = {{fontFamily: 'Kanit'}}>Username</label>
            </div>
            <input
                name='username'
                type='text'
                placeholder = 'John18'
            />
            <br />
            <div className=".signin">
            <label style = {{fontFamily: 'Kanit'}}>Email</label>
            </div>
            <input
                name='email'
                type='email'
                placeholder = 'John@example.com'
            />
            <br />
            <div className=".signin">
            <label style = {{fontFamily: 'Kanit'}}>Password</label>
            </div>
            <input
                name='password'
                type='password'
                placeholder = '********'
            />
            <br />
            <br />
            <div className=".signin">
            <button style = {{fontFamily: 'Kanit'}} className=".btn-space btn btn-outline-primary mr-1" type="submit">Sign Up!</button>
            </div>
        </form>
    )
}
export default withRouter(SignUp);