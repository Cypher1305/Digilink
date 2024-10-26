/* eslint-disable no-unused-vars */
// components/MesContacts.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
const isLocal = window.location.hostname === 'localhost';
const API_URL = isLocal ? 'http://localhost:5000' : 'http://192.168.1.152:5000';

const MesContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_URL}/contacts`);
        setContacts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des contacts:", error.message);
      }
    };

    fetchContacts();
  }, []);

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await axios.put(`${API_URL}/contacts/${contactId}`, { status: newStatus });
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === contactId ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error.message);
    }
  };

  const exportToCSV = () => {
    const csvRows = [
      ['Nom Complet', 'Téléphone', 'Email', 'Page', 'Statut'],
      ...contacts.map(contact => [contact.full_name, contact.phone_number, contact.email, contact.pageName, contact.status])
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.page_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mb-2 mt-5 h-full mx-auto p-6 shadow-md rounded-lg">
      <h2 className="mt-2 text-2xl font-semibold mb-4 text-yellow-500">Mes Contacts</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className="border p-2 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={exportToCSV}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Exporter en CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nom Complet</th>
              <th className="py-3 px-6 text-left">Téléphone</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Page</th>
              <th className="py-3 px-6 text-left">Statut</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {filteredContacts.map(contact => (
              <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
                <td className="py-3 px-6 text-left">{contact.full_name}</td>
                <td className="py-3 px-6 text-left">{contact.phone_number}</td>
                <td className="py-3 px-6 text-left">{contact.email}</td>
                <td className="py-3 px-6 text-left">{contact.pageName}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      contact.status === 'client'
                        ? 'bg-green-200 text-green-700'
                        : contact.status === 'partenaire'
                        ? 'bg-purple-200 text-purple-700'
                        : 'bg-yellow-200 text-yellow-700'
                    }`}
                  >
                    {contact.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <select
                    value={contact.status}
                    onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="prospect">Prospect</option>
                    <option value="client">Client</option>
                    <option value="partenaire">Partenaire</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredContacts.length === 0 && (
          <p className="text-center py-4 text-gray-500">Aucun contact trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default MesContacts;
