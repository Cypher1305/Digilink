/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiMail } from "react-icons/hi";
import user from "../assets/user.png";
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

const isLocal = window.location.hostname === 'localhost';
const API_URL = isLocal ? 'http://localhost:5000' : 'http://192.168.1.3:5000';


function DetailsPage() {
  const { pageName: initialPageName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(location.state?.formData || {});
  const [logoUrl, setLogoUrl] = useState(location.state?.logoUrl || "");
  const [userUrl, setUserUrl] = useState(location.state?.userUrl || "");
  const [isSaved, setIsSaved] = useState(false);
  const [pageName, setPageName] = useState(initialPageName || "");

  const socialNetworks = [
    { name: "LinkedIn", icon: Lin, url: formData?.linkedin },
    { name: "Twitter", icon: twit, url: formData?.twitter },
    { name: "Facebook", icon: fb, url: formData?.facebook },
    { name: "Instagram", icon: ins, url: formData?.instagram },
    { name: "WhatsApp", icon: wha, url: formData?.whatsapp },
    { name: "Youtube", icon: youtube, url: formData?.youtube },
    { name: "Github", icon: git, url: formData?.github },
    { name: "Site", icon: site, url: formData?.site },
    { name: "Pinterest", icon: pint, url: formData?.pinterest },
    { name: "Behance", icon: beh, url: formData?.behance },
  ];

  // Fonction pour générer et télécharger le fichier VCF
  const downloadVCF = () => {
    const vcfData = `BEGIN:VCARD
VERSION:3.0
FN:${formData.firstName || "Prénom"} ${formData.lastName || "Nom"}
TEL:${formData.phone1 || "Numéro de téléphone"}
TEL:${formData.phone2 || "Numéro de téléphone"}
NOTE:${formData.fonction || "Employé(e)"} chez ${
      formData.companyName || "Une entreprise locale"
    }
END:VCARD`;

    const blob = new Blob([vcfData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.firstName || "contact"}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Fonction pour sauvegarder les détails dans la base de données
  const saveDetailsToDatabase = async () => {
  try {
    const response = await axios.post(`${API_URL}/carte/${pageName}`, {
      pageName,
      logoUrl,
      userUrl,
      ...formData,
    });

    // Vérifiez si le statut est 200 OK ou 201 Created
    if (response.status === 200 || response.status === 201) {
      alert("Détails enregistrés avec succès !");
      setIsSaved(false);
      navigate(`/carte/${pageName}`);
    } else {
      // Lance une erreur si le statut n'est pas 200 ou 201
      throw new Error(`Erreur lors de l'enregistrement : ${response.statusText}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des détails", error);
    alert(`Erreur lors de l'enregistrement des détails : ${error.message}`);
    setIsSaved(false); // Permet une nouvelle tentative en cas d'échec
  }
};


  // Déclenchement de la sauvegarde lorsque `isSaved` passe à `true`
  useEffect(() => {
    if (isSaved) {
      saveDetailsToDatabase();
    }
  }, [isSaved]);

  const handleSavePage = () => {
    if (pageName.trim() === "") {
      alert("Veuillez entrer un nom pour la page.");
      return;
    }

    // Marquer comme sauvegardé pour déclencher l'envoi à la BD
    setIsSaved(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="flex flex-col items-center justify-center space-y-3 mx-auto">
        <img
          className="rounded-full w-[100px] h-[100px]"
          src={userUrl || user}
          alt="Profil"
        />
        <h3 className="font-bold text-lg">
          {formData.firstName || "Prénom"} {formData.lastName || "Nom"}
        </h3>
        <h3 className="uppercase text-md">{formData.fonction || "Fonction"}</h3>
        <button className="hey" onClick={downloadVCF}>
          Enregistrer le contact
        </button>
        <h5 className="text-xl font-bold text-gray-500 dark:text-gray-400 mt-5">
          Réseaux sociaux
        </h5>
        <div className="flex flex-wrap items-center justify-center space-x-1 mx-auto">
          {socialNetworks.map(
            (network) =>
              network.url && (
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={network.name}
                >
                  <div className="flex flex-col items-center mx-2 my-2">
                    <img
                      className="w-[50px] h-[50px] border rounded py-1 px-1"
                      src={network.icon}
                      alt={network.name}
                    />
                    <span className="text-gray-700 text-[10px]">
                      {network.name}
                    </span>
                  </div>
                </a>
              )
          )}
        </div>

        <h5 className="text-xl font-bold text-gray-500 dark:text-gray-400 mt-5">
          Informations de l'entreprise
        </h5>
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <img
              className="w-[85px] h-[90px] border rounded py-1 px-1"
              src={logoUrl || "../assets/kyconsultingci_logo.jpg"}
              alt="Logo entreprise"
            />
            <h3 className="text-lg">
              {formData.companyName || "Nom de l'entreprise"}
            </h3>
          </div>
          <h3 className="text-md text-gray-600">
            {formData.companyDescription || "Description de l'entreprise"}
          </h3>
        </div>
        <div className="mt-5">
          <input
            type="text"
            placeholder="Nom de la page"
            value={pageName || ""}
            onChange={(e) => setPageName(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button className="hey ml-2" onClick={handleSavePage}>
            Enregistrer la page
          </button>
        </div>
        <h3 className="text-[11px] text-gray-300">@DIGILINK.CI</h3>
      </div>
    </div>
  );
}

export default DetailsPage;
