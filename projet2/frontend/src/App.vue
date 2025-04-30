<template>
  <div id="app">
    <div class="navbar">
      <ul>
        <li><router-link to="/login">Connexion</router-link></li>
        <li><router-link to="/register">Inscription</router-link></li>
      </ul>
    </div>

    <router-view></router-view>
    <div class="names">
      <p class="name">EKICI Sugdenaz</p>
      <p class="name">MERAT Leslie</p>
      <p class="name">S4B1</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {}
}
</script>
<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar {
  background-color: #2c3e50;
  padding: 10px 0;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
}

.navbar ul li {
  display: inline-block;
  margin: 0 20px;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.navbar ul li a:hover {
  color: #1abc9c;
}
.names {
  position: absolute;
  bottom: 10px;
  text-align: center;
  font-size: 22px;
  font-weight: 500;
  color: #34495e;
  width: 100%;
}

.names .name {
  margin: 5px 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.names .name:hover {
  color: #1abc9c;
}

.names .name:nth-child(odd) {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
