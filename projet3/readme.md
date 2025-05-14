
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
npm install cors
npm install dotenv
npm install ejs
npm install express
npm install helmet
npm install mongoose
npm install morgan
npm install socket.io
```
Et pour les dépendances de développement :
```
npm install --save-dev nodemon
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
À la racine du projet faire :
```
npm start
```
