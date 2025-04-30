const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
require('dotenv').config();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     description: Crée un nouvel utilisateur avec un nom d'utilisateur, un email et un mot de passe.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utilisateur créé
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: john_doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *       400:
 *         description: Erreur de validation ou email déjà utilisé.
 *       500:
 *         description: Erreur serveur interne.
 */

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    const user = await User.create({
      username,
      email,
      password: password,
    });
    const { password: _, ...userSansMotDePasse } = user.toJSON();

    res.status(201).json({ message: 'Utilisateur créé', user: userSansMotDePasse });
  } catch (err) {
    console.error('Erreur lors de la création utilisateur :', err);
    res.status(500).json({ error: 'Erreur serveur, impossible de créer l’utilisateur' });
  }
});


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     description: Retourne une liste de tous les utilisateurs enregistrés (sans mot de passe).
 *     tags:
 *       - Utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: john_doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *       500:
 *         description: Erreur serveur interne.
 */

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email'],
    });
    res.json(users);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Permet à un utilisateur de se connecter en utilisant son email et son mot de passe. Si l'utilisateur est authentifié avec succès, un token JWT est renvoyé.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Connexion réussie, JWT retourné.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Connexion réussie
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: Utilisateur non trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utilisateur non trouvé
 *       401:
 *         description: Mot de passe incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mot de passe incorrect
 *       500:
 *         description: Erreur serveur interne.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Une erreur est survenue lors de la connexion
 *                 error:
 *                   type: string
 *                   example: Erreur de connexion à la base de données
 */


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Email:", email);
    console.log("Password:", password);
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      console.log("Mot de passe validé:", validPassword);
  
      if (!validPassword) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }
      await User.update({ date_derniere_connexion: new Date() }, { where: { id: user.id } });
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ message: 'Connexion réussie', token });
    } catch (err) {
      console.error('Erreur login-user:', err);
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion', error: err.message });
    }
  });
  
/**
 * Route protégée qui nécessite un token valide
 */
router.get('/home', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Bienvenue sur la page sécurisée' });
});

module.exports = router;
