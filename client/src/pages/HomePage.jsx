import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./HomePage.css"; // Ensure you have a CSS file for styles
import imageFlottante from "../assets/logo pfe.png"; // Adjust the path to your image
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
("use client");
import { Carousel } from "flowbite-react";
import { Card } from "flowbite-react";
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
                <img src={mCard} alt="..." />
                <img src={mCards} alt="..." />
                <img src={mCads} alt="..." />
                <img src={mCads} alt="..." />
                <img src={mCads} alt="..." />
                <img src={mCads} alt="..." />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}

export default HomePage;
