/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// components/PopupForm.jsx
import React, { useState } from 'react';

const PopupForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
        <h2 className="text-m font-bold mb-4 text-yellow-500">Nous serions ravis de vous contacter!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Nom Complet"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Numéro de Téléphone"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
          <div className="flex flex-col justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              OUI
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-300 hover:text-red-600 transition-colors duration-300"
            >
              NON
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
