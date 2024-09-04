import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCompanies, getReviews } from "./Functions/CompanyService";
import { getLinksForCompany } from "./Functions/CompanyService";
import { decodeCompanyName } from "./Functions/urlTransformers";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ContactCompForm from "./Functions/ContactCompForm";
import ReviewForm from "./Functions/ReviewForm";
import ReviewsList from "./Functions/ReviewsList";

// Composant pour la carte
const MapComponent = ({ position }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "200px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data © <a href="https://www.openstreetmap.org/copyright"></a>'
      />
      <Marker position={position}>
        <Popup>{`Position: ${position[0]}, ${position[1]}`}</Popup>
      </Marker>
    </MapContainer>
  );
};

const OpeningHours = ({ hours, PHONE, ADDRESS, EMAIL }) => {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getLinksForCompany();
        setLinks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLinks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mb-8 p-4 border rounded-lg shadow-lg bg-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
      <div className="w-full md:w-1/2">
        <h3 className="text-xl font-semibold text-yellow-500 mb-4">
          Horaires d'ouverture :
        </h3>
        <ul className="space-y-2">
          {daysOfWeek.map((day) => (
            <li
              key={day}
              className={`flex justify-between items-center p-2 rounded-lg ${
                day === today
                  ? "bg-yellow-100 border border-yellow-500"
                  : "bg-gray-50"
              }`}
            >
              <Link
                to={`/rendezvous/${day.toLowerCase()}`}
                className={`flex-1 text-lg ${
                  day === today ? "font-bold text-yellow-600" : "text-gray-700"
                }`}
              >
                <strong>{day}:</strong> {hours[day]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-1/2">
        <h3 className="text-xl font-semibold text-yellow-500 mb-4">
          Contacts de l'entreprise:
        </h3>
        <p className="text-gray-600 mb-4">
          <strong>Téléphone:</strong> {PHONE || "Non disponible"}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Adresse:</strong> {ADDRESS || "Non disponible"}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Email:</strong> {EMAIL || "Non disponible"}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Liens :</strong>
        </p>
        <ul className="space-y-2">
          {links.length > 0 ? (
            links.map((link) => (
              <li key={link.link_type} className="text-gray-600">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {link.link_type}
                </a>
              </li>
            ))
          ) : (
            <li className="text-gray-600">Aucun lien disponible</li>
          )}
        </ul>
      </div>
    </div>
  );
};

// Composant pour la page de l'entreprise
const CompanyPage = () => {
  const { companyName } = useParams();
  const decodedName = decodeCompanyName(companyName);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companies = await getCompanies(); // Utilisez getCompanies pour obtenir la liste des entreprises
        const foundCompany = companies.find((c) => {
          if (!c.NAME || !decodedName) {
            console.warn("Missing NAME or decodedName:", c.NAME, decodedName);
            return false;
          }
          return c.NAME.toLowerCase() === decodedName.toLowerCase();
        });

        if (!foundCompany) {
          console.warn("No company found with the name:", decodedName);
        }

        setCompany(foundCompany);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'entreprise:", error);
      }
    };

    fetchCompany();
  }, [decodedName]);

  if (!company) return <div>Entreprise non trouvée</div>;

  const position = [company.LATITUDE, company.LONGITUDE];

  return (
    <div className="container mx-auto px-4 py-8 mt-5">
      <h1 className="text-4xl font-bold text-yellow-500 mb-8">
        {company.NAME}
      </h1>
      <img
        src={company.IMAGE_URL}
        alt={company.NAME}
        className="w-full h-80 object-cover rounded-lg mb-8"
      />
      <div className="space-y-4 mt-8 p-4 border rounded-lg bg-white py-9 ">
        <h2 className="text-xl font-semibold text-yellow-500 mb-4">A propos</h2>
        <p className="text-justify">{company.DESCRIPTION}</p>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex-1">
            <ReviewsList companyId={company.ID_COMP} />
          </div>
          <div className="flex-1 mt-1">
            <ReviewForm companyId={company.ID_COMP} />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex-1 mt-8">
            <ContactCompForm companyId={company.ID_COMP} />
          </div>
        </div>
      </div>

      <div className="mt-2"></div>
      <OpeningHours
        hours={company.OPENING_HOURS}
        PHONE={company.PHONE}
        ADDRESS={company.ADDRESS}
        EMAIL={company.EMAIL_COMP}
      />

      {/* Ajouter le composant de la carte */}
      <MapComponent position={position} />

      <Link to="/Annuaire" className="text-yellow-500 underline mb-2">
        Retour à la liste
      </Link>
    </div>
  );
};

export default CompanyPage;
