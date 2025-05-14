# PROJET JWT-TOKEN

EKICI Sugdenaz - MERAT Leslie

## À la racine du projet 
```
npm install
```

## Initialisation du projet 

Si le fichier package.json n'est pas là il faut l'initialiser dans el backend et le frontend :
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
Et pour le frontend les dépendances production:
```
npm install axios
npm install core-js
npm install vue
npm install vue-router
```
et les dépendance de développement :
```
npm install --save-dev @babel/core
npm install --save-dev @babel/eslint-parser
npm install --save-dev @vue/cli-plugin-babel
npm install --save-dev @vue/cli-plugin-eslint
npm install --save-dev @vue/cli-service
npm install --save-dev eslint
npm install --save-dev eslint-plugin-vue
npm install --save-dev launch-editor-middleware

```

## Pour Nodejs
Attention il faut utiliser la version 18, une version supérieur fait crasher l'application !!
Pour changer de version faire, il faut le faire danc le dossier backend et frontend :

D'abord installer node 18 :
```dotenv
nvm install 18
```
puis faire ça :
```dotenv
nvm use 18
```

## Pour lancer le projet 
Dans le backend, après avoir crée le fichier .env faire 
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
