import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./HomePage.css";

function Carte() {
  return (
    <>
      <div className="w-full h-5 mt-5">
        <h1 className="light pb-4 float-left">Gestion des pages</h1>
        <Link to="/View" className="signup-buttons float-right mt-5 pb-2">
        + Ajout
        </Link>
      </div>
      <div className="mt-5 py-9">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  Nom de la Carte
                </th>
                <th scope="col" class="px-6 py-3">
                  Date de création
                </th>
                <th scope="col" class="px-6 py-3">
                  Usage
                </th>
                <th scope="col" class="px-6 py-3">
                  Statut
                </th>
                <th scope="col" class="px-6 py-3">
                  Visiteurs
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ma carte
                </th>
                <td class="px-6 py-4">05/06/2024</td>
                <td class="px-6 py-4">Réseaux sociaux</td>
                <td class="px-6 py-4">Actif</td>
                <td class="px-6 py-4">1200</td>
                <td class="flex items-center px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Modifier
                  </a>
                  <a
                    href="#"
                    class="font-medium text-orange-400 dark:text-red-500 hover:underline ms-3"
                  >
                    Bloquer
                  </a>
                  <a
                    href="#"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Supprimer
                  </a>
                </td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ma carte
                </th>
                <td class="px-6 py-4">05/06/2024</td>
                <td class="px-6 py-4">Carte de visite</td>
                <td class="px-6 py-4">Actif</td>
                <td class="px-6 py-4">150</td>
                <td class="flex items-center px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Modifier
                  </a>
                  <a
                    href="#"
                    class="font-medium text-orange-400 dark:text-red-500 hover:underline ms-3"
                  >
                    Bloquer
                  </a>
                  <a
                    href="#"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Supprimer
                  </a>
                </td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ma carte
                </th>
                <td class="px-6 py-4">05/06/2024</td>
                <td class="px-6 py-4">Présentation</td>
                <td class="px-6 py-4">Bloqué</td>
                <td class="px-6 py-4">20</td>
                <td class="flex items-center px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Modifier
                  </a>
                  <a
                    href="#"
                    class="font-medium text-orange-400 dark:text-red-500 hover:underline ms-3"
                  >
                    Bloquer
                  </a>
                  <a
                    href="#"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Supprimer
                  </a>
                </td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ma carte
                </th>
                <td class="px-6 py-4">05/06/2024</td>
                <td class="px-6 py-4">Portfolio</td>
                <td class="px-6 py-4">Actif</td>
                <td class="px-6 py-4">45</td>
                <td class="flex items-center px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Modifier
                  </a>
                  <a
                    href="#"
                    class="font-medium text-orange-400 dark:text-red-500 hover:underline ms-3"
                  >
                    Bloquer
                  </a>
                  <a
                    href="#"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Supprimer
                  </a>
                </td>
              </tr>

              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ma carte
                </th>
                <td class="px-6 py-4">05/06/2024</td>
                <td class="px-6 py-4">Réseaux sociaux</td>
                <td class="px-6 py-4">Actif</td>
                <td class="px-6 py-4">1200</td>
                <td class="flex items-center px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Modifier
                  </a>
                  <a
                    href="#"
                    class="font-medium text-orange-400 dark:text-red-500 hover:underline ms-3"
                  >
                    Bloquer
                  </a>
                  <a
                    href="#"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Supprimer
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div />
      </div>
    </>
  );
}
export default Carte;
