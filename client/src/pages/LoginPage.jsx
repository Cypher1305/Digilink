import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import { Checkbox, Label, TextInput, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import "./HomePage.css";
import { useAuth } from '../hooks/useAuth';


function LoginPage({ setIsAuthenticated }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/Login', {
        email,
        motDePasse: password
      });
      if (response.data.twoFactorRequired) {
        setTwoFactorRequired(true);
        setSuccessMessage('Nous vous avons envoyé un code d\'authentification. Veuillez vérifier votre email.');
        setErrorMessage('');
      } else {
        login(email);
        setIsAuthenticated(true); // Met à jour l'état d'authentification dans App.js
        setSuccessMessage(response.data.message);
        setErrorMessage('');
        setRedirect(true);
      }
    } catch (error) {
      setErrorMessage('Erreur d\'authentification. Veuillez vérifier vos identifiants.');
      setSuccessMessage('');
      setEmail('');
      setPassword('');
    }
  };

  const handleTwoFactorSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/Verify2FA', {
        email,
        code: twoFactorCode
      });
      if (response.data.success) {
        login(email);
        setIsAuthenticated(true); // Met à jour l'état d'authentification dans App.js
        setSuccessMessage('Authentification réussie.');
        setErrorMessage('');
        setRedirect(true);
      } else {
        setErrorMessage('Code incorrect. Veuillez réessayer.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Erreur de vérification du code.');
      setSuccessMessage('');
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-5 h-full mx-auto px-auto py-1 items-center">
      <h1 className="container mt-5 text-center">Pas de compte? <Link to="/SignIn">Inscrivez-vous</Link></h1>
      {twoFactorRequired ? (
        
        <form className="flex max-w-md flex-col mx-auto gap-4 py-8" onSubmit={handleTwoFactorSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="twoFactorCode" value="Code 2FA" />
            </div>
            <TextInput
              id="twoFactorCode"
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <Button type='submit'>Vérifier le code</Button>
        </form>
      ) : (
        <form className="flex max-w-md flex-col mx-auto gap-4 py-8" onSubmit={handleLoginSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              icon={HiMail}
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Mot de passe" />
            </div>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Rester connecté(e)</Label>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <Button type='submit'>Se connecter</Button>
        </form>
      )}
    </div>
  );
}

export default LoginPage;
