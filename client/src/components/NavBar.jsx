import React from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">FutHut</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/players">Players</Nav.Link>
          <Nav.Link href="/leagues">Leagues</Nav.Link>
          <Nav.Link href="/myfuthut">My FutHut</Nav.Link>
          <Nav.Link href="/signin">Sign In</Nav.Link>
          <Nav.Link href="/signout">Sign Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
