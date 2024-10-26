const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db"); // Assurez-vous que le chemin est correct
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const {
  getAllCompanies,
  getLinksForCompany,
  addCompany,
  ContactCompForm,
  getReviewsByCompanyId,
} = require("./Controllers/companyController");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: '*', // Remplacez '*' par les origines autorisées
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));



app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' })); // Ajustez la limite en fonction de vos besoins
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Routes API
app.get("/companies", getAllCompanies);

app.get("/companies/links", async (req, res) => {
  try {
    await getLinksForCompany(req, res);
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
});

app.post("/companies", addCompany);

// Route pour le formulaire de contact
app.post("/contact", ContactCompForm);

app.post("/Login", async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const userQuery = await pool.query(
      'SELECT * FROM "DI_LINK"."TB_USER" WHERE EMAIL_USER = $1',
      [email]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = userQuery.rows[0];
    const hashedPassword = user.mot_de_passe;
    const match = await bcrypt.compare(motDePasse, hashedPassword);

    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const twoFactorCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await pool.query(
      'UPDATE "DI_LINK"."TB_USER" SET TWO_FACTOR_CODE = $1 WHERE EMAIL_USER = $2',
      [twoFactorCode, email]
    );

    const mailOptions = {
      from: '"DIGILINK" <' + process.env.EMAIL_USER + ">",
      to: email,
      subject: "Code d'accès",
      html: `
        <h2 style="font-weight:300;">Votre code d'accès est:<strong> ${twoFactorCode} </strong></h2>
        <p style="color: red;">
          <strong>Attention !</strong> Ne partagez jamais votre code d'accès avec qui que ce soit !
        </p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending 2FA code:", error);
        return res.status(500).send({ message: "Error sending 2FA code" });
      } else {
        console.log("2FA code sent:", info.response);
        return res.status(200).send({ twoFactorRequired: true });
      }
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/Verify2FA", async (req, res) => {
  const { email, code } = req.body;

  try {
    const userQuery = await pool.query(
      'SELECT * FROM "DI_LINK"."TB_USER" WHERE EMAIL_USER = $1 AND TWO_FACTOR_CODE = $2',
      [email, code]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).send({ message: "Invalid 2FA code" });
    }

    await pool.query(
      'UPDATE "DI_LINK"."TB_USER" SET TWO_FACTOR_CODE = NULL WHERE EMAIL_USER = $1',
      [email]
    );

    return res
      .status(200)
      .send({ success: true, message: "Authentication successful" });
  } catch (err) {
    console.error("Error during 2FA verification:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/SignIn", async (req, res) => {
  const { nom, prenom, numero, email, motDePasse, entreprise } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const text = `
      INSERT INTO "DI_LINK"."TB_USER" (NOM_USER, PRENOM_USER, NUMERO_USER, EMAIL_USER, MOT_DE_PASSE, ENTREPRISE)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [nom, prenom, numero, email, hashedPassword, entreprise];

    const result = await pool.query(text, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error during sign up:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint pour récupérer les informations de l'utilisateur connecté
app.get("/userinfo", async (req, res) => {
  const userEmail = req.query.email;

  try {
    const userQuery = await pool.query(
      'SELECT NOM_USER, NUMERO_USER, EMAIL_USER FROM "DI_LINK"."TB_USER" WHERE EMAIL_USER = $1',
      [userEmail]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userInfo = userQuery.rows[0];
    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error fetching user info:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Ajouter un avis
app.post("/reviews", async (req, res) => {
  const { companyId, userEmail, rating, comment } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO "DI_LINK"."TB_REVIEWS" ("COMPANY_ID", "USER_EMAIL", "RATING", "COMMENT")
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [companyId, userEmail, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'avis:", err.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer les avis d'une entreprise
// Express route
app.get("/reviews/:companyId", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const reviews = await getReviewsByCompanyId(companyId);
    res.json(reviews);
  } catch (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des avis" });
  }
});


// Route pour le traitement du formulaire
// Route pour le traitement du formulaire
app.post("/carte/:pageName", async (req, res) => {
  try {
    const {
      lastName, firstName, fonction, email,
      phone1, phone2, companyName, companyDescription,
      linkedin, twitter, facebook, instagram, whatsapp,
      youtube, github, site, pinterest, behance,
      userUrl, logoUrl, pageName, idcomp
    } = req.body;

    const result = await pool.query(`
      INSERT INTO "DI_LINK"."TB_PAGE" (
        "lastname", "firstname", "fonction", "email",
        "phone1", "phone2", "companyname", "companydescription",
        "linkedin", "twitter", "facebook", "instagram", "whatsapp",
        "youtube", "github", "site", "pinterest", "behance",
        "userurl", "logourl", "pageName", "idcomp"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      RETURNING *;
    `, [
      lastName, firstName, fonction, email,
      phone1, phone2, companyName, companyDescription,
      linkedin, twitter, facebook, instagram, whatsapp,
      youtube, github, site, pinterest, behance,
      userUrl, logoUrl, pageName, idcomp
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erreur lors du traitement du formulaire:", err.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


// server.js (Backend)
app.get('/details/:pageName', async (req, res) => {
  const { pageName } = req.params;

  try {
    // Requête pour obtenir les détails de la page
    const result = await pool.query('SELECT * FROM "DI_LINK"."TB_PAGE" WHERE "pageName" = $1', [pageName]);
    // Vérifiez si des résultats ont été trouvés
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page non trouvée' });
    }
    // Renvoie les détails de la page
    res.json(result.rows[0]);
  } catch (err) {
    // Log des erreurs pour le développement
    console.error('Erreur lors de la récupération des détails:', err.message);
    // Réponse en cas d'erreur serveur
    res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
});


// Route pour enregistrer un contact
app.post('/contacts', async (req, res) => {
  const { fullName, phoneNumber, email, pageName } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO "DI_LINK"."TB_CLIENTS" (full_name, phone_number, email, pageName, status) 
       VALUES ($1, $2, $3, $4, 'prospect') RETURNING *`,
      [fullName, phoneNumber, email, pageName]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du contact:", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

app.get('/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "DI_LINK"."TB_CLIENTS"');
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des contacts:", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Route pour mettre à jour le statut d'un contact
app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "DI_LINK"."TB_CLIENTS" SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});



app.get("/test", (req, res) => {
  res.status(200).send("API is working");
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
