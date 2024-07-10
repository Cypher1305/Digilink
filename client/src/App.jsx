import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx"; // Chemin relatif pour le composant de l'en-tête
import Footer from "./components/Footer.jsx"; // Chemin relatif pour le composant du pied de page
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import Carte from "./pages/Carte.jsx";
import Compte from "./pages/Compte.jsx";
import Abonnement from "./pages/Abonnement.jsx";
import View from "./pages/View.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/SignIn" element={<SignInPage />} />
        {isAuthenticated ? (
          <>
            <Route path="/GestionCarte" element={<Carte />} />
            <Route path="/GestionCompte" element={<Compte />} />
            <Route path="/Abonne" element={<Abonnement />} />
            <Route path="/View" element={<View />} />
          </>
        ) : (
          <>
            {/* Redirect to login if user is not authenticated */}
            <Route path="*" element={<Navigate to="/Login" />} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;