import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AuthContext } from '../../Auth';
//import logo from '../../logo.jpg';
import app from '../../firebase';
import { ReactComponent as Logo } from '../../logo_dark.svg';


function Header() {
    const { currentUser } = useContext(AuthContext)

    const color = {
        backgroundColor: "#82A9FD"
    }

    const signOutButton = {
        marginRight: "5%",
        
    }

    if (currentUser) {
        return (
            <Navbar variant="light" style={color}>
                <Container style={color}>
                    <Navbar.Brand href="/">
                        <Logo width={300} height={200}  />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link style={color} href="/Market">Market</Nav.Link>
                        <Nav.Link style={color} href="/News">News</Nav.Link>
                        <Nav.Link style={color} href="/Leaderboard">Leaderboard</Nav.Link>
                        <Nav.Link style={color} href="/Wallet">Wallet</Nav.Link>
                    </Nav>
                </Container>
                <button style={signOutButton} onClick = {() => app.auth().signOut()}>Sign Out</button>
            </Navbar>);
    }
    else {
        return (<Navbar variant="light" style={color}>
            <Container style={color}>
                <Navbar.Brand href="/">
                    <Logo width={300} height={200} />
                </Navbar.Brand>
                <Nav>
                    <Nav.Link style={color} href="/SignIn">Sign In</Nav.Link>
                    <Nav.Link style={color}
                        href="/SignUp">Sign Up</Nav.Link>
                </Nav>
            </Container>
        </Navbar>);
    }
}
export default Header;