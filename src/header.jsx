import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './app.css';
import logo from './Assets/logo.png';

export function Header() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary header">
            <Container id="nav-container">
                <Navbar.Brand href="/" id="main-title">
                    <img src={logo} id="logo"></img>
                    Gollab
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/profile" className="nav-text">Profile</Nav.Link>
                        <Nav.Link href="/goals" className="nav-text">My Goals</Nav.Link>
                        <Nav.Link href="/friendlist" className="nav-text">Friends</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
