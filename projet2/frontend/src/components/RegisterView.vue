<template>
    <div>
      <h2>Inscription</h2>
      <form @submit.prevent="registerUser">
        <input v-model="username" type="text" placeholder="Nom d'utilisateur" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import auth from '../service/auth';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async registerUser() {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password
        };
  
        try {
          const response = await auth.register(user);
          console.log((response))
          if (response.user) {
                        this.$router.push('/login');
          } else {
            this.errorMessage='erreur lors de lincription'
          }
        } catch (error) {
          this.errorMessage = 'Erreur lors de l\'inscription';
        }
      }
    }
  };
  </script>
  
