// src/pages/Annuaire.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCompanies } from './Functions/CompanyService'; // Importez le service API
import { encodeCompanyName} from './Functions/urlTransformers.js';
import Company from './Functions/Company.jsx';


const Annuaire = () => {
  
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des entreprises:', error);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company => {
    const companyName = company.NAME ? company.NAME.toLowerCase() : '';
    const companyCategory = company.CATEGORY ? company.CATEGORY.toLowerCase() : '';
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return companyName.includes(lowerCaseSearchTerm) || companyCategory.includes(lowerCaseSearchTerm);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-yellow-500 text-center mb-1 p-5">Pages Jaunes</h1>
      <input
        type="text"
        placeholder="Rechercher une entreprise ou une catégorie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 rounded-full border-2 border-yellow-500 mb-5 outline-none focus:border-yellow-600"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map(company => {
          if (!company.ID || !company.NAME) {
            console.warn('Entreprise invalide:', company); // Alerte si des propriétés sont manquantes
            return null;
          }
          return (
            <Company key={company.ID} {...company} />
          );
        })}
      </div>
    </div>
  );
};

export default Annuaire;