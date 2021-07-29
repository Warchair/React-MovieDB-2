import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const NavbarMovie = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar" dark expand="md">
        <div class="container">
        <NavbarBrand href="/React-MovieDB-2/">Movie<strong>GO</strong></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar className="mr-4">
              <DropdownToggle nav>
                Recommended Film
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Movie
                </DropdownItem>
                <DropdownItem>
                  TV Series
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem className="mr-4">
              <NavLink href="/React-MovieDB-2/">News</NavLink>
            </NavItem>
            <NavItem className="mr-4">
              <NavLink href="/React-MovieDB-2/" >About Us</NavLink>
            </NavItem>
            <NavItem className="mr-4">
              <NavLink href="mailto:chairulsp2@gmail.com">Contact Us</NavLink>
            </NavItem>
            {/* <button className="btn sign-in mr-3">SIGN IN</button>
            <button className="btn sign-up">SIGN UP</button> */}
          </Nav>
        </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarMovie;