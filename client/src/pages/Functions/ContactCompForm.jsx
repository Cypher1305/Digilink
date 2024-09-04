import React, { useState } from 'react';
import axios from 'axios';

const ContactCompForm = ({ companyId }) => {
  const [formData, setFormData] = useState({
    objet: '',
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
    ...formData,
    entrepriseId: companyId // Assurez-vous que companyId est bien défini
  };
    try {
      await axios.post(`http://localhost:5000/contact`, dataToSend);
      alert('Message envoyé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error.message);
      if (error.response) {
        console.error('Détails de l\'erreur:', error.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-1 p-4 border rounded-lg bg-white py-9">
      <h3 className="text-xl font-semibold text-yellow-500 mb-4">Contactez l'entreprise</h3>
      <div>
        <select
          name="objet"
          value={formData.objet}
          onChange={handleChange}
          required
          className="w-full mt-2 p-2 border rounded-lg"
        >
          <option value="" disabled>En quoi pouvons-nous vous aider?</option>
          <option value="Demande de devis">Demande de devis</option>
          <option value="Prise de rendez-vous">Prise de rendez-vous</option>
          <option value="Demande d'informations">Demande d'informations</option>
          <option value="Demande d'emploi">Demande d'emploi</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Nom complet"
          className="w-full mt-2 p-2 border rounded-lg"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="email"
          className="w-full mt-2 p-2 border rounded-lg"
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Numéro de téléphone"
          className="w-full mt-2 p-2 border rounded-lg"
        />
      </div>
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Laissez-nous un message"
          className="w-full h-[200px] mt-2 p-2 border rounded-lg"
        />
      </div>
      <p>Vous aurez une réponse par mail dans les 24 prochaines heures! <br />Merci de nous avoir contacté!</p>
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded-lg">
        Envoyer
      </button>
    </form>
  );
};

export default ContactCompForm;
