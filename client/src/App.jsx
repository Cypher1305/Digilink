/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import Carte from "./pages/Carte.jsx";
import Compte from "./pages/Compte.jsx";
import Abonnement from "./pages/Abonnement.jsx";
import View from "./pages/View.jsx";
import Annuaire from "./pages/Annuaire.jsx";
import FAQ from "./pages/FAQ.jsx"; // Correct the import path
import Exports from "./pages/Exports.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";
import { getCompanies } from "./pages/Functions/CompanyService";
import DetailsPage from "./pages/DetailsPage.jsx";
import BientotDisponible from "./pages/BientotDisponible.jsx";
import CartePage from './pages/CartePage.jsx';
import MesContacts from "./pages/MesContacts.jsx";
import EditCartePage from "./pages/EditCartePage.jsx"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Annuaire" element={<Annuaire companies={companies} />} />
        <Route
          path="/digilink/:companyName"
          element={<CompanyPage companies={companies} />}
        />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Exports" element={<Exports />} />
        <Route path="/View" element={<View />} />
        <Route path="/Details" element={<DetailsPage />} />
        <Route path="/carte/:pageName" element={<CartePage />} />
        <Route path="/Bientot" element={<BientotDisponible />} />
        <Route path="/GestionCarte" element={<Carte />} />
        <Route path="/GestionCompte" element={<Compte />} />
        <Route path="/Contacts" element={<MesContacts />} />
        <Route path="/Abonne" element={<Abonnement />} />
        <Route path="/edit-carte" element={<EditCartePage />} /> 
        <Route
          path="/Login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/SignIn" element={<SignInPage />} />

        {isAuthenticated ? (
          <>
            <Route path="/GestionCarte" element={<Carte />} />
            <Route path="/GestionCompte" element={<Compte />} />
            
          </>
        ) : (
          <Route path="*" element={<Navigate to="/Login" />} />
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
