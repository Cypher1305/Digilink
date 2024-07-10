const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db'); // Assurez-vous que le chemin est correct
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/Login', async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const userQuery = await pool.query(
      'SELECT * FROM "DI_LINK"."TB_USER" WHERE EMAIL_USER = $1',
      [email]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = userQuery.rows[0];
    const hashedPassword = user.mot_de_passe;
    const match = await bcrypt.compare(motDePasse, hashedPassword);

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString();

    await pool.query(
      'UPDATE "DI_LINK"."TB_USER" SET TWO_FACTOR_CODE = $1 WHERE EMAIL_USER = $2',
      [twoFactorCode, email]
    );

    const mailOptions = {
      from:'"DIGILINK" <'+ process.env.EMAIL_USER +'>',
      to: email,
      subject: 'Code d\'accès',
      html: `
        <h2 style="font-weight:300;">Votre code d'accès est:<strong> ${twoFactorCode} </strong></h2>
        <p style="color: red;">
          <strong>Attention !</strong> Ne partagez jamais votre code d'accès avec qui que ce soit !
        </p>`

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending 2FA code:', error);
        return res.status(500).send({ message: 'Error sending 2FA code' });
      } else {
        console.log('2FA code sent:', info.response);
        return res.status(200).send({ twoFactorRequired: true });
      }
    });

  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/Verify2FA', async (req, res) => {
  const { email, code } = req.body;

  try {
    const userQuery = await pool.query(
      'SELECT * FROM "DI_LINK"."TB_USER" WHERE EMAIL_USER = $1 AND TWO_FACTOR_CODE = $2',
      [email, code]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).send({ message: 'Invalid 2FA code' });
    }

    await pool.query(
      'UPDATE "DI_LINK"."TB_USER" SET TWO_FACTOR_CODE = NULL WHERE EMAIL_USER = $1',
      [email]
    );

    return res.status(200).send({ success: true, message: 'Authentication successful' });

  } catch (err) {
    console.error('Error during 2FA verification:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/SignIn', async (req, res) => {
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
    console.error('Error during sign up:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint pour récupérer les informations de l'utilisateur connecté
app.get('/userinfo', async (req, res) => {
  const userEmail = req.query.email;

  try {
    const userQuery = await pool.query(
      'SELECT NOM_USER, NUMERO_USER, EMAIL_USER FROM "DI_LINK"."TB_USER" WHERE EMAIL_USER = $1',
      [userEmail]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userInfo = userQuery.rows[0];
    res.status(200).json(userInfo);

  } catch (err) {
    console.error('Error fetching user info:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.get('/test', (req, res) => {
  res.status(200).send('API is working');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});