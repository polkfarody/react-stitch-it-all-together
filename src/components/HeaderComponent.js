import React, {Component} from 'react';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false
    }

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    })
  }

  render() {
    return (
        <>
          <Navbar expand="md" className="navbar navbar-stitch">
            <div className="container">
              <Navbar.Brand className="mr-auto" href="/">
                <span className="stitch-logo-brand">
                  sTitcHt!
                </span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="main-menu-navbar" />
              <Navbar.Collapse id="main-menu-navbar">
                <Nav navbar className="ml-auto">
                  <Nav.Item>
                    <NavLink className="nav-link" to="/home">
                      <span className="fa fa-home fa-lg"/> Home
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink className="nav-link" to="/projects">
                      <span className="fa fa-random"/> Projects
                    </NavLink>
                  </Nav.Item>
                </Nav>
                <Nav className="ml-auto">
                  <Nav.Item>
                    { this.props.isAuthenticated ?
                        <div>
                          <div className="navbar-text mr-3">USERNAME</div>
                          <Button onClick={this.props.logout}>
                            <span className="fa fa-sign-out fa-lg"/> Logout
                          </Button>
                        </div>
                        :
                        <NavLink className="nav-link btn btn-outline-secondary" to="/login">
                          <span className="fa fa-info fa-lg"/> Login
                        </NavLink>
                    }
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </>
    );
  }
}

export default Header;
