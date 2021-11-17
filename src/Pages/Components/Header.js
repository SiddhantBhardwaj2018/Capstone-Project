import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AuthContext } from '../../Auth';
import logo from '../../logo.jpg';
import app from '../../firebase';


function Header() {
    const { currentUser } = useContext(AuthContext)
    if (currentUser) {
        return (
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/Market">Market</Nav.Link>
                        <Nav.Link href="/News">News</Nav.Link>
                        <Nav.Link href="/Leaderboard">Leaderboard</Nav.Link>
                        <Nav.Link href="/Wallet">Wallet</Nav.Link>
                    </Nav>
                </Container>
                <button onClick = {() => {
                    localStorage.clear()
                    app.auth().signOut()}}>Sign Out</button>
            </Navbar>);
    }
    else {
        return (<Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/"><img src={logo} alt="Logo" /></Navbar.Brand>
                <Nav>
                    <Nav.Link href="/SignIn">Sign In</Nav.Link>
                    <Nav.Link href="/SignUp">Sign Up</Nav.Link>
                </Nav>
            </Container>
        </Navbar>);
    }
}
export default Header;