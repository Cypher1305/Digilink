import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import "./HomePage.css";

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numero, setNumero] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [agree, setAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirect, setRedirect] = useState(false); // State pour gérer la redirection


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!agree) {
      setErrorMessage("Vous devez accepter les termes et conditions.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/SignIn', {
        nom,
        prenom,
        numero,
        email,
        motDePasse: password,
        entreprise
      });

      setSuccessMessage("Inscription réussie!");
      setErrorMessage('');
      // Réinitialiser les champs de saisie
      setEmail('');
      setPassword('');
      setNom('');
      setPrenom('');
      setNumero('');
      setEntreprise('');
      setAgree(false);

      // Activer la redirection vers la page de connexion
      setRedirect(true);

    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erreur lors de l\'inscription.');
      setSuccessMessage('');
    }
  };
  // Si redirect est true, naviguer vers la page de connexion
  if (redirect) {
    return <Navigate to="/Login" />;
  }

  return (
    <>
      <div className="container mt-5 h-full mx-auto px-auto py-1">
        <h1 className="container mt-5 text-center">
          Déjà un compte? <Link to="/Login">Connectez-vous</Link>
        </h1>

        <form className="flex max-w-md flex-col mx-auto gap-4 py-8" onSubmit={handleSubmit}>
          <div>
            <TextInput
              id="email1"
              type="email"
              icon={HiMail}
              placeholder="name@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextInput
              id="password1"
              type="password"
              required
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="flex gap-14 mx-auto">
              <TextInput
                id="nom"
                type="text"
                sizing="md"
                required
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <TextInput
                id="prenom"
                type="text"
                sizing="md"
                required
                placeholder="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex gap-14 mx-auto">
              <TextInput
                id="numero"
                type="text"
                sizing="md"
                required
                placeholder="Numéro de téléphone"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
              <TextInput
                id="entreprise"
                type="text"
                sizing="md"
                required
                placeholder="Entreprise"
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link
                to="#"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <Button type="submit">S'inscrire</Button>
        </form>
      </div>
    </>
  );
}

export default SignInPage;
