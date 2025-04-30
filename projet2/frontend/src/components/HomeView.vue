<template>
  <div v-if="isAuthenticated">
    <h2>Bienvenue sur la page sécurisée !</h2>
    <button @click="logout">Se déconnecter</button>
  </div>
  <div v-else>
    <h2>Accès refusé. Vous devez être connecté.</h2>
  </div>
</template>
<script>
import auth from '../service/auth';

export default {
  data() {
    return {
      isAuthenticated: auth.isAuthenticated()
    };
  },
  methods: {
    logout() {
      auth.logout();
      this.isAuthenticated = false;
      this.$router.push('/login');
    }
  }
};
</script>
