/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import "./HomePage.css";
import user from "../assets/user.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';
function Compte() {
  
  return (
    <>
      <div className="mt-5 h-full w-full py-4 px-4">
        <div className="mt-5 d-flex items-center space-x-4">
          <img className="rounded-full w-10 h-10" src={user} alt="Profil" />
          <div className="d-flex flex-col space-y-1 align-items-start">
            <h1 className="font-bold">Bénédicte Yao</h1>
            <h3>(+225) 0555971970</h3>
            <h3>Kossiabenedicte20@gmail.com</h3>
          </div>
          <a href="/Exports" className="ms-auto"><FontAwesomeIcon icon={faFileExport} className="w-10 h-10" /></a>
        </div>
      </div>
      <hr className="w-full "/>
      <div className="py-3 text-center">
        <div className="hover:bg-neutral-300 py-3 cursor-pointer">
          <Link to="/Contacts"><h2>Mes contacts</h2></Link>
        </div>
        <div className="hover:bg-neutral-300 py-3 cursor-pointer">
          <Link to="/edit-carte"><h2>Modifier le compte</h2></Link>
        </div>
        <div className="hover:bg-neutral-300 py-3 cursor-pointer">
          <Link to="/Abonne"><h2>Mettre à jour le Compte</h2></Link>
        </div>
        <div className="hover:bg-neutral-300 py-3 cursor-pointer">
          <h2 className="text-red-500">Supprimer le compte</h2>
        </div>
      </div>
    </>
  );
}

export default Compte;
