import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import user from "../assets/user.png";
import "./HomePage.css";
import Lin from "../assets/in.png";
import fb from "../assets/fb.png";
import twit from "../assets/twit.png";
import ins from "../assets/ins.png";
import youtube from "../assets/youtube.png";
import git from "../assets/github.png";
import site from "../assets/site.png";
import wha from "../assets/wha.png";
import beh from "../assets/behance.png";
import pint from "../assets/pint.png";

import log from "../assets/kyconsultingci_logo.jpg";

function Preview({ formData, logoUrl }) {

  const socialNetworks = [
    { name: 'LinkedIn', icon: Lin, url: formData.linkedin },
    { name: 'Twitter', icon: twit, url: formData.twitter },
    { name: 'Facebook', icon: fb, url: formData.facebook },
    { name: 'Instagram', icon: ins, url: formData.instagram },
    { name: 'WhatsApp', icon: wha, url: formData.whatsapp },
    { name: 'Youtube', icon: youtube, url: formData.youtube },
    { name: 'Github', icon: git, url: formData.github },
    { name: 'Site', icon: site, url: formData.site },
    { name: 'Pinterest', icon: pint, url: formData.pinterest },
    { name: 'Behance', icon: beh, url: formData.behance },
  ];
  // Utilisez les données de formData pour afficher l'aperçu
  // Par exemple :
  return (
    <>
    <div className="flex flex-col items-center justify-center mt-5 space-y-3 mx-auto">
      <img className="rounded-full w-[54px] h-[54px] " src={user} alt="Profil" />
      <h3 className="font-bold">{formData.firstName || 'Bény'} {formData.lastName || 'Yao'}</h3>
      <h3 className="uppercase text-sm">{formData.function || 'Webmaster'}</h3>
      <button className="hey">
      Enregistrer le contact
      </button>
      <h6 className="font-light text-green-600 text-[10px] ">Réseaux sociaux</h6>
      <div className="flex flex-wrap items-center justify-center space-x-1 mx-auto">
          {socialNetworks.map(network => (
            network.url && (
              <div className="flex flex-col items-center mx-2 my-2" key={network.name}>
                <img className="w-[50px] h-[50px] border rounded py-1 px-1" src={network.icon} alt={network.name} />
                <span className="text-gray-700 text-[8px]">{network.name}</span>
              </div>
            )
          ))}
        </div>
      <h6 className="font-light text-green-600 text-[10px] ">Références / Services</h6> 
    <div className='flex flex-col'>
    <div className='flex flex-row items-center space-x-2'>
      <img className="w-[34px] h-[34px] border rounded py-1 px-1" src={logoUrl || log} alt="logo entreprise" />
      <h3>{formData.companyName || 'KY\'s CONSULTING'}</h3>
    </div> 
      <h3 className='text-[12px]'>{formData.companyDescription || 'Prestation de services'}</h3>
    </div>
      <button className="hey">
        Voir l'entreprise
      </button>
      <h3 className='text-[11px]  text-gray-300'>@DIGILINK.CI</h3>
    </div>
    </>
  );
}

function View() {
  
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    function: "",
    email: "",
    phone1: "",
    phone2: "",
    References: "",
    companyDescription: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    whatsapp:"",
    youtube:"",
    github:"",
    site:"",
    pinterest:"",
    behance:""

  });

  const [logoUrl, setLogoUrl] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <style>
        {`
          body {
            overflow: hidden;
          }
        `}
      </style>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="mon_block w-full md:w-1/2 h-full overflow-y-auto p-5">
          <h5 className="text-xl font-bold text-gray-500 dark:text-gray-400 mt-5">
            Information personnelle
          </h5>
          <form className="flex flex-col gap-4 mt-5">
            <div className="flex gap-4">
              <TextInput
                id="nom"
                type="text"
                sizing="md"
                required
                className="flex-1"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Nom"
              />
              <TextInput
                id="prenom"
                type="text"
                sizing="md"
                required
                placeholder="Prénom"
                className="flex-1"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <TextInput
              id="fonction"
              type="text"
              sizing="md"
              required
              placeholder="Fonction"
              name="function"
              value={formData.function}
              onChange={handleInputChange}
            />
            <TextInput
              id="email1"
              type="email"
              icon={HiMail}
              placeholder="name@gmail.com"
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextInput
              id="telephone1"
              type="text"
              sizing="md"
              required
              placeholder="Numéro de téléphone 1"
              name="phone1"
              value={formData.phone1}
              onChange={handleInputChange}
            />
            <TextInput
              id="telephone2"
              type="text"
              sizing="md"
              required
              placeholder="Numéro de téléphone 2"
              name="phone2"
              value={formData.phone2}
              onChange={handleInputChange}
            />
            
          </form>
          <div className="flex flex-col gap-4 mt-5">
          <h5 className="text-xl font-bold text-gray-500 dark:text-gray-400 mt-5">
            Réseaux sociaux
          </h5>
            <TextInput
              id="linkedin"
              type="text"
              sizing="md"
              placeholder="Lien LinkedIn"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
            />
             <TextInput
              id="twitter"
              type="text"
              sizing="md"
              placeholder="Lien Twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
            />
            <TextInput
              id="facebook"
              type="text"
              sizing="md"
              placeholder="Lien Facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
            />
            <TextInput
              id="instagram"
              type="text"
              sizing="md"
              placeholder="Lien Instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
            />
            <TextInput
              id="youtube"
              type="text"
              sizing="md"
              placeholder="Lien Youtube"
              name="youtube"
              value={formData.youtube}
              onChange={handleInputChange}
            />
            <TextInput
              id="whatsapp"
              type="text"
              sizing="md"
              placeholder="Lien WhatsApp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
            />
             <TextInput
              id="github"
              type="text"
              sizing="md"
              placeholder="Lien Github"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
            />
            <TextInput
              id="behance"
              type="text"
              sizing="md"
              placeholder="Lien Behance"
              name="behance"
              value={formData.behance}
              onChange={handleInputChange}
            />
             <TextInput
              id="site"
              type="text"
              sizing="md"
              placeholder="Lien Site (Portfolio/Réalisations)"
              name="site"
              value={formData.site}
              onChange={handleInputChange}
            />
            
          </div>
          <h5 className="text-xl font-bold text-gray-500 dark:text-gray-400 mt-5">
            Références / Services
          </h5>
          <form className="flex flex-col gap-4 mt-5">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <TextInput
              id="ref"
              type="text"
              sizing="md"
              required
              placeholder="Nom du projet / Service"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
            <TextInput
              id="description"
              type="text"
              sizing="md"
              required
              placeholder="Description"
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleInputChange}
            />
            
          </form>
        </div>
        <br />
        <br />
        
        <div className=" mt-2 w-full md:w-1/2 h-full flex items-center justify-center ">
          <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[280px]">
            <div className="h-[22px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[15px] top-[45px] rounded-s-lg"></div>
            <div className="h-[34px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[15px] top-[67px] rounded-s-lg"></div>
            <div className="h-[34px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[15px] top-[97px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[15px] top-[88px] rounded-e-lg"></div>
            <div className="rounded-[2rem] w-[250px] h-[470px] bg-white dark:bg-gray-800 overflow-y-scroll scrollbar-hide items-center mx-auto">
              <Preview formData={formData} logoUrl={logoUrl}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
