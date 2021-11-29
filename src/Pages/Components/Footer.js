import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../logo_dark.svg';
function Footer() {
    const color = {
        backgroundColor: "#171771"
    };

    const containerStyle = {
        paddingTop: "1%",
        paddingBottom:"5%",
        height: "50px",
        backgroundColor: "#171771",
        display: "flex",
        flexDirection: "column"
    };


    return (
        <div>
            <Navbar style={color}>
                <Container style={containerStyle}>
                    <Nav>
                        <Nav.Link style={color} href="/Market"><span style={{color: "white"} }>Market</span></Nav.Link>
                        <Nav.Link style={color} href="/News"><span style={{ color: "white" }}>News</span></Nav.Link>
                        <Nav.Link style={color} href="/Leaderboard"><span style={{ color: "white" }}>Leaderboard</span></Nav.Link>
                        <Nav.Link style={color} href="/Wallet"><span style={{ color: "white" }}>Wallet</span></Nav.Link>
                    </Nav>
                    <p>2021 Cryptics. All rights reserved.</p>
                </Container>
            </Navbar>
            
        </div>);
}
export default Footer;