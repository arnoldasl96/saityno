import React from 'react'
import {Navbar,Nav} from "react-bootstrap"
import logo from '../../images/ktu-logo.png'
import '../../App.css'
import './navbar.css'
import { TakeToken } from '../../TakeToken'


const NavBar = () => {
  
  let token = TakeToken();


  const handleLogout = () => {
    token = undefined
    localStorage.removeItem("token")
  }
    return (
        <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark" id="navBg">
        <Navbar.Brand id = "navBrand" href="/"><img id ="logo" src={logo} alt = "ktu-logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav  className = "mr-auto">
            <Nav.Link  href="/Companies" >Companies</Nav.Link>
            <Nav.Link  href="/Planes" >Planes</Nav.Link>
            <Nav.Link  href="/Places" >Places</Nav.Link>
            </Nav>
            <Nav >
            {(token && token._type==="admin")&&<Nav.Link href="/dashboard" >Dashboard</Nav.Link>}
            {!token && <Nav.Link href ="/login">Login/Register</Nav.Link>}
            {token && <Nav.Link  href="/" onClick= {handleLogout}>LogOut</Nav.Link>}
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
