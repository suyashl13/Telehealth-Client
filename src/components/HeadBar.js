import React, { useContext, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { loginContext } from '../contexts/LoginContext';


export default function HeadBar() {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const loginCtx = useContext(loginContext)
    
    if (!localStorage.getItem('id')) {
      loginCtx.setIsLoggedIn(false)
    }

    console.log(loginCtx.isLoggedIn)

    return (
      <>
        {
          loginCtx.isLoggedIn ? <Navbar color="transparent" light expand="md" className='container'>
          <NavbarBrand href="/">Telehealth Admin</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse className="navbar-collapse justify-content-end" isOpen={isOpen} navbar>
          
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/appointment">Appointments</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/messenging">Messenging</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/consultancy">Consultancy</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/histroy">History</NavLink>
              </NavItem>
            </Nav>
                <NavLink onClick={e=>{loginCtx.setIsLoggedIn(false); localStorage.clear()}} className="btn btn-danger btn-sm text-light ml-2" href="/login">Logout</NavLink>
          </Collapse>
  
        </Navbar> : null
        }  
      </>
    )
}
