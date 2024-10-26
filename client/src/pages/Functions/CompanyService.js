import axios from 'axios';
const isLocal = window.location.hostname === 'localhost';
const API_URL = isLocal ? 'http://localhost:5000' : 'http://192.168.1.3:5000';


// Fonction pour récupérer les entreprises
export const getCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/companies`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des entreprises:', error);
    throw error;
  }
};

// Fonction pour récupérer les liens d'une entreprise
// src/pages/Functions/CompanyService.js
export const getLinksForCompany = async () => {
  try {
    // Remplacer API_URL par l'URL spécifique pour obtenir les liens d'une entreprise
    const response = await axios.get(`${API_URL}/companies/links`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des liens pour l'entreprise:`, error.message);
    throw new Error(`Erreur lors de la récupération des liens pour l'entreprise`);
  }
};



// Fonction pour ajouter une entreprise
export const addCompany = async (company) => {
  try {
    const response = await axios.post(`${API_URL}/companies`, company);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'entreprise:', error);
    throw error;
  }
};



export const getReviews = async (companyId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/${companyId}`); // Adjusted URL
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des avis:', error);
    throw new Error('Erreur lors de la récupération des avis');
  }
};

