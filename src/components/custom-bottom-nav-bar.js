import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
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
                            <span id={"company-name"}>© 2022 GaussLabs, Inc.</span>
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                            <Nav.Link herf="/#features">Features</Nav.Link>
                            <Nav.Link herf="/#pricing">Pricing</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default CustomBottomNavbar;