import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./HomePage.css"; // Ensure you have a CSS file for styles
import imageFlottante from "../assets/logo pfe.png"; // Adjust the path to your image
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
("use client");
import { Carousel } from "flowbite-react";
import { Card } from "flowbite-react";
import pslide from "../assets/Cit.jpg";
import mCard from "../assets/cardtest.jpg";
import mCards from "../assets/cardtes.jpg";
import mCads from "../assets/cardte.jpg";

function HomePage() {
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      direction: "vertical",
      speed: 800,
      loop: true,
      mousewheel: true,
      // Add other Swiper options as needed
    });

    return () => {
      if (swiper && swiper.destroy) {
        swiper.destroy();
      }
    };
  }, []);

  return (
    <div className="container mt-5 h-full mx-auto px-auto w-auto">
      <section id="accueil" className="swiper-container mb-8">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="home-container">
              <div className="text-content">
                <div className="mon_flex">
                  <h1 className="light">Expérimentez</h1>
                  <h1 className="bold">des solutions qui transforment !</h1>
                </div>
                <a className="signup-button" href="/Login">Commencez !</a>
              </div>
              <div className="image-content">
                <img
                  src={imageFlottante}
                  alt="Example"
                  className="floating-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="swiper-container mb-60" id="solutions">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <h2 className="lights">Nos solutions</h2>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel leftControl="<<" rightControl=">>" className="h-full w-full object-cover">
                <img  src={pslide} alt="..." />
                <img src={mCard} alt="..." />
                <img src={mCards} alt="..." />
                <img src={mCads} alt="..." />
                <img
                  src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                  alt="..."
                />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <section className="swiper-container" id="tarifs">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <Card className="max-w-sm">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                FORFAIT MENSUEL
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">$</span>
                <span className="text-5xl font-extrabold tracking-tight">
                  2
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  /mois
                </span>
              </div>
              <ul className="my-7 space-y-5">
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    3 cartes virtuelles
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    Lien dans la bio
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    Support client
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    Contact téléphonique mis à jour
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    Numérisation de carte de visite
                  </span>
                </li>
              </ul>
              <button className="dark:focus:ring-cyan-900 rounded-lg bg-green-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:bg-cyan-600 dark:hover:bg-cyan-700">
                Souscrire
              </button>
            </Card>

            <Card className="max-w-sm">
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                FORFAIT ANNUEL
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">$</span>
                <span className="text-5xl font-extrabold tracking-tight">
                  35
                </span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  /ans
                </span>
              </div>
              <ul className="my-7 space-y-5">
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    5 cartes virtuelles
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    Lien dans la bio
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    Support client
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    Contact téléphonique mis à jour
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    Numérisation de carte de visite
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-green-400 dark:text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                    2 comptes Digilink
                  </span>
                </li>
              </ul>
              <button className="dark:focus:ring-cyan-900 rounded-lg bg-green-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:bg-cyan-600 dark:hover:bg-cyan-700">
                Souscrire
              </button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
