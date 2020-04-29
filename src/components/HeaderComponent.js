import React, {Component} from 'react';
import {
  Navbar,
  NavbarBrand,
  NavDropdown,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  ModalHeader,
  ModalBody, Modal
} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import Login from "./LoginComponent";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isNavOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    })
  }


  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpenPrivateRoute
    })
  }

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    return (
        <>
          <Navbar dark expand="md" className="navbar navbar-stitch">
            <div className="container">
              <NavbarBrand className="mr-auto" href="/">
                <span className="stitch-logo-brand">
                  sTitcHt!
                </span>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggleNav}/>
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar className="ml-auto">
                  <NavItem>
                    <NavLink className="nav-link" to="/home">
                      <span className="fa fa-home fa-lg"></span> Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/aboutus">
                      <span className="fa fa-info fa-lg"></span> About Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/menu">
                      <span className="fa fa-list fa-lg"></span> Menu
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/contactus">
                      <span className="fa fa-address-card fa-lg"></span> Contact Us
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto">
                  <NavItem>
                    { !this.props.auth.isAuthenticated ?
                        <Button outline onClick={this.toggleModal}>
                          <span className="fa fa-sign-in fa-lg"></span> Login
                          {this.props.auth.isFetching ?
                              <span className="fa fa-spinner fa-pulse fa-fw"></span>
                              : null
                          }
                        </Button>
                        :
                        <div>
                          <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                          <Button outline onClick={this.handleLogout}>
                            <span className="fa fa-sign-out fa-lg"></span> Logout
                            {this.props.auth.isFetching ?
                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                : null
                            }
                          </Button>
                        </div>
                    }
                  </NavItem>
                </Nav>
              </Collapse>
            </div>
          </Navbar>
          <Modal isOpen={this.state.isModalOpen && !this.props.auth.isAuthenticated} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
            <ModalBody>
              <Login onSuccess={() => {
                this.toggleModal()
              }} loginUser={this.props.loginUser} auth={this.props.auth} />
            </ModalBody>
          </Modal>
        </>
    );
  }
}

export default Header;
