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
                                width="25"
                                height="25"
                                className="d-inline-block center"
                            />
                            <span id={"company-name"}>© 2022 Gauss Labs, Inc.</span>
                        </Navbar.Brand>
                        <Nav className="me-auto">
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default CustomBottomNavbar;