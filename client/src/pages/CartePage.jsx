import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
import CompanyPage from "./CompanyPage";

 

const CartePage = () => {
  const { pageName } = useParams();
  const navigate = useNavigate();
  const [data, setFormData] = useState(null); // Initialise avec null pour éviter l'affichage de l'erreur avant la récupération des données
  const [logoUrl, setLogoUrl] = useState("");
  const [userUrl, setUserUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [socialNetworks, setSocialNetworks] = useState([
    { name: "linkedin", icon: Lin, url: "" },
    { name: "twitter", icon: twit, url: "" },
    { name: "facebook", icon: fb, url: "" },
    { name: "instagram", icon: ins, url: "" },
    { name: "whatsapp", icon: wha, url: "" },
    { name: "youtube", icon: youtube, url: "" },
    { name: "github", icon: git, url: "" },
    { name: "site", icon: site, url: "" },
    { name: "pinterest", icon: pint, url: "" },
    { name: "behance", icon: beh, url: "" },
  ]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/details/${pageName}`);
        setFormData(response.data);
       setLogoUrl(response.data);
        setUserUrl(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails:", error.message);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pageName]);

  useEffect(() => {
    if (data) {
      setSocialNetworks((prevNetworks) =>
        prevNetworks.map((network) => ({
          ...network,
          url: data[network.name] || "",
        }))
      );
    }
  }, [data]);

  const downloadVCF = () => {
    const vcfData = `BEGIN:VCARD
VERSION:3.0
FN:${data.firstname || "Prénom"} ${data.lastname || "Nom"}
TEL:${data.phone1 || "Numéro de téléphone"}
TEL:${data.phone2 || "Numéro de téléphone"}
NOTE:${data.fonction || "Employé(e)"} chez ${data.companyname || "Une entreprise locale"}
END:VCARD`;

    const blob = new Blob([vcfData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.firstname || "contact"}.vcf`;
    document.body.appendChild(a); // Needed for Firefox
    a.click();
    document.body.removeChild(a); // Clean up
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!data) {
    return <p>Aucune donnée disponible pour cette page.</p>;
  }
  
   const handleCheckId = () => {
    // Naviguer vers la page de l'entreprise en utilisant l'ID_COMP
    navigate(`/digilink/${data.companyname}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="flex flex-col items-center justify-center space-y-3 mx-auto">
        <img
          className="rounded-full w-[100px] h-[100px]"
          src={data.userurl || user}
          alt="Profil"
        />
        <h3 className="font-bold text-lg">
          {data.firstname || "Prénom"} {data.lastname || "Nom"}
        </h3>
        <h3 className="uppercase text-md">
          {data.fonction || "Fonction"}
        </h3>
        <button className="hey" onClick={downloadVCF}>
          Enregistrer le contact
        </button>

        <h5 className="text-xl font-bold text-gray-500 dark:text-gray-400 mt-5">
          Réseaux sociaux
        </h5>
        <div className="flex flex-wrap items-center justify-center space-x-2 mx-auto">
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
                    <span className="text-gray-700 text-[10px] capitalize">
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
              src={data.logourl || "../assets/kyconsultingci_logo.jpg"}
              alt="Logo entreprise"
            />
            <h3 className="text-lg">
              {data.companyname || "Nom de l'entreprise"}
            </h3>
          </div>
          <h3 className="text-md text-gray-600">
            {data.companydescription || "Description de l'entreprise"}
          </h3>
        </div>
        <button className="hey" onClick={handleCheckId}>Voir l'entreprise</button>
            <h3 className="text-[11px] text-gray-300">@DIGILINK.CI</h3>
      </div>
    </div>
  );
};

export default CartePage;
