// Footer.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../pages/HomePage.css";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';



function Footer() {
  return (
    <>
      <footer id='footer' className="text-white py-4 w-full left-0 right-0 absolute bottom+0">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 w-full">
          <div className="">
            <p className="text-lg font-semibold">Contactez-nous :</p>
            <p>Adresse : Rue des Goyaviers, Av. Mermoz, Abidjan, Côte d'Ivoire</p>
            <p>Téléphone : +225 0123 234 257 / +225 0123 234 257</p>
            <p>Email : info@digilink.com</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-lg font-semibold mb-2">Suivez-nous :</p>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faFacebookF} /></a></li>
              <li><a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li><a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faInstagram} /></a></li>
              <li><a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}


export default Footer;
