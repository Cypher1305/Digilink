/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {encodeCompanyName}from "./urlTransformers"
const Company = ({ ID, NAME, CATEGORY, PHONE, ADDRESS, IMAGE_URL}) => {
  const encodedName = encodeCompanyName(NAME);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <img
        src={IMAGE_URL || '/path/to/default-image.jpg'}
        alt={NAME || 'Image non disponible'}
        className="w-full h-40 object-cover rounded-t-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-yellow-500 mb-2">{NAME || 'Nom non disponible'}</h3>
      <p className="text-gray-600">Catégorie: {CATEGORY || 'Non spécifiée'}</p>
      <p className="text-gray-600">Téléphone: {PHONE || 'Non spécifié'}</p>
      <p className="text-gray-600">Adresse: {ADDRESS || 'Non spécifiée'}</p>
      <Link to={`/digilink/${encodedName}`} className="text-yellow-500 underline">Voir plus</Link>
    </div>
  );
};
export default Company;