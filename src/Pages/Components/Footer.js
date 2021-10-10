import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo_light from '../../logo_light.jpg';

function Footer() {
    return (
        <div>
            <Navbar bg="dark" variant="light">
                <Container>
                    <Navbar.Brand href="/"><img src={logo_light} alt="Logo" /></Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/Market">Market</Nav.Link>
                        <Nav.Link href="/News">News</Nav.Link>
                        <Nav.Link href="/Leaderboard">Leaderboard</Nav.Link>
                        <Nav.Link href="/Wallet">Wallet</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <p>2021 Cryptics. All rights reserved.</p>
        </div>);
}
export default Footer;