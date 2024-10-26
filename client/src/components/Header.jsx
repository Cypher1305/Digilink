/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
            <span className="block font-bold text-sm">DIGILINK</span>
            <span className="block truncate text-sm font-light">Votre réseau, votre force.</span>
          </Dropdown.Header>
          <Dropdown.Item as={Link} to="/Bientot">Numériser cartes</Dropdown.Item>
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
        <Navbar.Link href="/">Acceuil</Navbar.Link>
        <Navbar.Link href="/Annuaire">Annuaire</Navbar.Link>
        <Navbar.Link href="/FAQ">FAQ</Navbar.Link>
        <Navbar.Link href="#footer">Contacts</Navbar.Link>
      </Navbar.Collapse>
      
    </Navbar>
    </>
  );
}

export default Header;
