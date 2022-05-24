import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import logo192 from '../assets/images/logo192.png';

class CustomBottomNavbar extends React.Component {

    render() {
        return (
            <>
                <Navbar bg="light" variant="light" sticky={"bottom"}>
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src={logo192}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            <p>© 2022 GaussLabs, Inc.</p>
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/contact">Contact</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>

                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default CustomBottomNavbar;