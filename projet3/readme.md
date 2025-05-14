
# PROJET Authentification OAuth2 avec Google et Chat en temps réel

EKICI Sugdenaz - MERAT Leslie

## À la racine du projet 
```
npm install
```

## Initialisation du projet 

Si le fichier package.json n'est pas là il faut l'initialiser à la racine du projet :
```
npm init --y
```
ensuite installé les dépendance pour le backend dans le dossier backend: 
```
npm install bcrypt
npm install bcryptjs
npm install cors
npm install dotenv
npm install express
npm install jsonwebtoken
npm install pg
npm install pg-hstore
npm install sequelize
npm install swagger-jsdoc
npm install swagger-ui-express
```

## Pour Nodejs
Attention il faut utiliser la version 18, une version supérieur fait crasher l'application !!
Pour changer de version faire, il faut le faire à la racine du projet :

D'abord installer node 18 :
```
nvm install 18
```
puis faire ça :
```
nvm use 18
```

## Pour lancer le projet 
```
node app.js
```

Et dans le frontend,
```dotenv
npm run serve
```


# Exemple de fichier .env
```dotenv
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=nameDB
JWT_SECRET=key_secrey
```
# Lien de notre vidéo :

https://youtu.be/Ns74JJyqnME
