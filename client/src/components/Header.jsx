// Header.jsx
import React from 'react';
"use client";
import { Link } from "react-router-dom";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from '../assets/logo pfe.png';
import icUser from '../assets/user.png';


function Header({ isAuthenticated }) {
  
  return (
    <>
       <Navbar fluid rounded className="fixed mx-auto w-full top-0 left-0 z-50 bg-white shadow-md">
        <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo Digilink" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Digilink</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={icUser} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bénédicte YAO</span>
            <span className="block truncate text-sm font-medium">bene@gmail.com</span>
          </Dropdown.Header>
          <Dropdown.Item as={Link} to="/Scan">Numériser cartes</Dropdown.Item>
          <Dropdown.Item as={Link} to="/GestionCarte">Gérer mes pages</Dropdown.Item>
          <Dropdown.Item as={Link} to="/GestionCompte">Gérer mon compte</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Déconnexion</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#accueil">Acceuil</Navbar.Link>
        <Navbar.Link href="#solutions">Solutions</Navbar.Link>
        <Navbar.Link href="#tarifs">Tarifs</Navbar.Link>
        <Navbar.Link href="#footer">Contact</Navbar.Link>
      </Navbar.Collapse>
      
    </Navbar>
    </>
  );
}

export default Header;
