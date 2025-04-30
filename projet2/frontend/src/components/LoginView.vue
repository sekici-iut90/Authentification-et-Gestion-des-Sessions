<template>
    <div>
      <h2>Connexion</h2>
      <form @submit.prevent="loginUser">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import auth from '../service/auth.js';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async loginUser() {
        const user = {
          email: this.email,
          password: this.password
        };
        
        try {
          await auth.login(user);
          console.log('ok')
          this.$router.push('/home');
          console.log('on est dans home')
        } catch (error) {
          this.errorMessage = 'Échec de la connexion, veuillez vérifier vos identifiants';
        }
      }
    }

  };
  </script>
<style scoped>
@import '../assets/LoginView.css';
</style>