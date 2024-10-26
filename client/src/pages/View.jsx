/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import user from "../assets/user.png";
import log from "../assets/kyconsultingci_logo.jpg";
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
import "./HomePage.css";

function Preview({ formData, logoUrl, userUrl }) {
  const socialNetworks = [
    { name: "LinkedIn", icon: Lin, url: formData.linkedin },
    { name: "Twitter", icon: twit, url: formData.twitter },
    { name: "Facebook", icon: fb, url: formData.facebook },
    { name: "Instagram", icon: ins, url: formData.instagram },
    { name: "WhatsApp", icon: wha, url: formData.whatsapp },
    { name: "Youtube", icon: youtube, url: formData.youtube },
    { name: "Github", icon: git, url: formData.github },
    { name: "Site", icon: site, url: formData.site },
    { name: "Pinterest", icon: pint, url: formData.pinterest },
    { name: "Behance", icon: beh, url: formData.behance },
  ];

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[280px]">
        <div className="h-[22px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[15px] top-[45px] rounded-s-lg"></div>
        <div className="h-[34px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[15px] top-[67px] rounded-s-lg"></div>
        <div className="h-[34px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[15px] top-[97px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[15px] top-[88px] rounded-e-lg"></div>
        <div className="rounded-[2rem] w-[250px] h-[470px] bg-white dark:bg-gray-800 overflow-y-scroll scrollbar-hide">
          <div className="flex flex-col items-center justify-center mt-5 space-y-3">
            <img
              className="rounded-full w-[54px] h-[54px]"
              src={userUrl || user}
              alt="Profil"
            />
            <h3 className="font-bold">
              {formData.firstName || "Bény"} {formData.lastName || "Yao"}
            </h3>
            <h3 className="uppercase text-sm">
              {formData.fonction || "Webmaster"}
            </h3>
            <h6 className="font-light text-[12px]">
              {formData.phone1 || "+225 07 07 07 07 07"}{" "}
              {formData.phone2 && ` | ${formData.phone2}`}
            </h6>
            <button className="hey">Enregistrer le contact</button>
            <h6 className="font-light text-green-600 text-[10px]">
              Réseaux sociaux
            </h6>
            <div className="flex flex-wrap items-center justify-center space-x-1 mx-auto">
              {socialNetworks.map(
                (network) =>
                  network.url && (
                    <div
                      className="flex flex-col items-center mx-2 my-2"
                      key={network.name}
                    >
                      <img
                        className="w-[50px] h-[50px] border rounded py-1 px-1"
                        src={network.icon}
                        alt={`${network.name} icon`}
                      />
                      <span className="text-gray-700 text-[8px]">
                        {network.name}
                      </span>
                    </div>
                  )
              )}
            </div>
            <h6 className="font-light text-green-600 text-[10px]">
              Informations de l'entreprise
            </h6>
            <div className="flex flex-col">
              <div className="flex flex-row items-center space-x-2">
                <img
                  className="w-[34px] h-[34px] border rounded py-1 px-1"
                  src={logoUrl || log}
                  alt="logo entreprise"
                />
                <h3>{formData.companyName || "KY's CONSULTING"}</h3>
              </div>
              <h3 className="text-[12px]">
                {formData.companyDescription || "Prestation de services"}
              </h3>
            </div>
            <button className="hey">Voir l'entreprise</button>
            <h3 className="text-[11px] text-gray-300">@DIGILINK.CI</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function View() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    fonction: "",
    email: "",
    phone1: "",
    phone2: "",
    companyName: "",
    companyDescription: "",
    idcomp:"",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
    youtube: "",
    github: "",
    site: "",
    pinterest: "",
    behance: "",
  });

  const [userUrl, setUserUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSave = (e) => {
    e.preventDefault();
    navigate("/Details", { state: { formData, logoUrl, userUrl } });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="mon_block w-full md:w-1/2 h-full overflow-y-auto p-5">
        <h5 className="text-xl font-bold text-gray-500 dark:text-gray-400 mt-5">
          Information personnelle
        </h5>
        <form className="flex flex-col gap-4 mt-5" onSubmit={handleSave}>
          <input type="file" accept="image/*" onChange={handleUserFileChange} />
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
            name="fonction"
            value={formData.fonction}
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

          <h5 className="text-xl font-bold text-gray-500 dark:text-gray-400 mt-5">
            Information de l'entreprise
          </h5>
          <TextInput
            id="nom_entreprise"
            type="text"
            sizing="md"
            placeholder="Nom de l'entreprise"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
          />
          <TextInput
            id="description_entreprise"
            type="text"
            sizing="md"
            placeholder="Description de l'entreprise"
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleInputChange}
          />
          <div className="flex gap-4">
            <TextInput
              id="ident"
              type="text"
              sizing="md"
              required
              className="flex-1"
              name="idcomp"
              value={formData.idcomp}
              onChange={handleInputChange}
              placeholder="ID de l'entreprise"
            />
            <TextInput
              id="poste"
              type="text"
              sizing="md"
              required
              placeholder="Votre poste"
              className="flex-1"
              name="poste"
              value={formData.poste}
              onChange={handleInputChange}
            />
          </div>
          <input type="file" accept="image/*" onChange={handleLogoFileChange} />

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
            id="whatsapp"
            type="text"
            sizing="md"
            placeholder="Lien WhatsApp"
            name="whatsapp"
            value={formData.whatsapp}
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
            id="github"
            type="text"
            sizing="md"
            placeholder="Lien GitHub"
            name="github"
            value={formData.github}
            onChange={handleInputChange}
          />
          <TextInput
            id="site"
            type="text"
            sizing="md"
            placeholder="Lien site"
            name="site"
            value={formData.site}
            onChange={handleInputChange}
          />
          <TextInput
            id="pinterest"
            type="text"
            sizing="md"
            placeholder="Lien Pinterest"
            name="pinterest"
            value={formData.pinterest}
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

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mt-4"
          >
            Aperçu
          </button>
        </form>
      </div>
      <div className="aperçu w-full md:w-1/2 h-full bg-gray-100 p-5">
        <Preview formData={formData} logoUrl={logoUrl} userUrl={userUrl} />
      </div>
    </div>
  );
}

export default View;
