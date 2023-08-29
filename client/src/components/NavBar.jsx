import React, { useContext } from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../FutHut_Logo.png";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
  const { userState } = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="FutHut logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/players">Players</Nav.Link>
          <Nav.Link href="/leagues">Leagues</Nav.Link>
          <Nav.Link href="/myfuthut">My FutHut</Nav.Link>
          {userState && userState.signedIn ? (
            <Nav.Link href="/signout">Sign Out</Nav.Link>
          ) : (
            <Nav.Link href="/signin">Sign In</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
