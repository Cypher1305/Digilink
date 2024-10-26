/* eslint-disable no-unused-vars */
// components/EditCartePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const isLocal = window.location.hostname === 'localhost';
const API_URL = isLocal ? 'http://localhost:5000' : 'http://192.168.1.152:5000';

const EditCartePage = () => {
  const { pageName } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone1: '',
    phone2: '',
    fonction: '',
    companyname: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
    whatsapp: '',
    youtube: '',
    github: '',
    site: '',
    pinterest: '',
    behance: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/details/${pageName}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails:", error.message);
      }
    };

    fetchData();
  }, [pageName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/details/${pageName}`, formData);
      alert("Les informations ont été modifiées avec succès !");
      navigate(`/carte/${pageName}`); // Redirige vers la page principale après l'édition
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Modifier les informations</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          value={formData.firstname}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          value={formData.lastname}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="phone1"
          placeholder="Téléphone 1"
          value={formData.phone1}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="phone2"
          placeholder="Téléphone 2"
          value={formData.phone2}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="fonction"
          placeholder="Fonction"
          value={formData.fonction}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="companyname"
          placeholder="Nom de l'entreprise"
          value={formData.companyname}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        {/* Réseaux sociaux */}
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn"
          value={formData.linkedin}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="twitter"
          placeholder="Twitter"
          value={formData.twitter}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="facebook"
          placeholder="Facebook"
          value={formData.facebook}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram"
          value={formData.instagram}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp"
          value={formData.whatsapp}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="youtube"
          placeholder="YouTube"
          value={formData.youtube}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub"
          value={formData.github}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="site"
          placeholder="Site Web"
          value={formData.site}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="pinterest"
          placeholder="Pinterest"
          value={formData.pinterest}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="behance"
          placeholder="Behance"
          value={formData.behance}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default EditCartePage;
