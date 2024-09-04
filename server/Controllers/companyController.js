const pool = require('../db');
const nodemailer = require('nodemailer');
require('dotenv').config();



// Récupérer toutes les entreprises
const getAllCompanies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "DI_LINK"."TB_COMPANIES"');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la récupération des entreprises');
  }
};


const getLinksForCompany = async (req, res) => {
  try {
    // Requête pour obtenir les liens associés à l'entreprise
    const result = await pool.query(
      `SELECT link_type, url
   FROM "DI_LINK"."TB_LINK"
   JOIN "DI_LINK"."TB_COMPANIES" c ON "TB_LINK".COMPANY_ID = c."ID_COMP"`,
    ); res.json(result.rows);
  } catch (err) {
    console.error('Error fetching links for company:', err.message);
    res.status(500).send('Erreur lors de la récupération des liens pour l\'entreprise');
  }
};


// Ajouter une nouvelle entreprise
const addCompany = async (req, res) => {
  const { name, category, phone, address, imageUrl, latitude, longitude, idComp } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO "DI_LINK"."TB_COMPANIES" ("NAME", "CATEGORY", "PHONE", "ADDRESS", "IMAGE_URL", "LATITUDE", "LONGITUDE", "ID_COMP")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, category, phone, address, imageUrl, latitude, longitude, idComp]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de l\'ajout de l\'entreprise');
  }
};


// Fonction pour gérer l'envoi du formulaire de contact
const ContactCompForm = async (req, res) => {
  const { objet, fullName, email, phone, message, entrepriseId } = req.body;

  // Validation des données du formulaire
  if (!objet || !fullName || !email || !message || !entrepriseId) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }

  try {
    // Récupérer l'email de l'entreprise à partir de la base de données
    const entrepriseQuery = await pool.query(
      'SELECT "EMAIL_COMP" FROM "DI_LINK"."TB_COMPANIES" WHERE "ID_COMP" = $1',
      [entrepriseId]
    );

    if (entrepriseQuery.rows.length === 0) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }

    const emailEntreprise = entrepriseQuery.rows[0].EMAIL_COMP;

    // Configurer les options de l'email
    const mailOptions = {
      from: `"DIGILINK" <${process.env.EMAIL_USER}>`,
      to:  emailEntreprise,
      subject: `Nouvelle demande: ${objet}`,
      html: `
        <h3>Vous avez reçu une nouvelle demande de contact</h3>
        <p><strong>Nom:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
      }
    });

    // Envoyer l'email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
      } else {
        console.log('Email envoyé:', info.response);
        return res.status(200).json({ message: 'Message envoyé avec succès' });
      }
    });

  } catch (err) {
    console.error('Erreur lors de l\'envoi du message:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};



// Récupérer les avis d'une entreprise
const getReviewsByCompanyId = async (companyId) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "DI_LINK"."TB_REVIEWS" WHERE "COMPANY_ID" = $1 ORDER BY "ID_REVIEW" ASC',
      [companyId]
    );
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des avis:', error);
    throw new Error('Erreur lors de la récupération des avis');
  }
};



module.exports = {
  getAllCompanies,
  getLinksForCompany,
  addCompany,
  ContactCompForm,
  getReviewsByCompanyId
};
