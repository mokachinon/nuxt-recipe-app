<template>
  <header class="navbar bg-light">
    <div class="container-fluid">
      <nuxt-link tag="a" class="navbar-brand text-brand" to="/">
        <img src="/images/logo (2).png" alt="Logo" width="44" height="44" class="d-inline-block align-text-center" />
        Food Recipes
      </nuxt-link>
      <!-- brand navbar -->

      <!-- navbar list -->
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <nuxt-link to="/" tag="a" class="nav-link" aria-current="page">Home</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/add" tag="a" class="nav-link">Add Recipes</nuxt-link>
        </li>
        <li class="nav-item" v-if="!$store.getters.isAuth">
          <nuxt-link to="/user/login" tag="a" class="nav-link">Login</nuxt-link>
        </li>
        <li class="nav-item" v-if="$store.getters.isAuth">
          <nuxt-link to="/user" class="nav-link">{{
            $store.state.userData.username
          }}</nuxt-link>
        </li>
        <li class="nav-item" v-if="$store.getters.isAuth">
          <a class="nav-link" @click.prevent="logout">Logout</a>
        </li>
      </ul>
      <!-- nb list -->

      <!-- brand navbar -->
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')

      this.$router.push('/user/login')
    }
  }
}
</script>

<style>
header {
  margin-bottom: 20px;
}

a:hover {
  cursor: pointer;
}

.text-brand {
  font-family: 'Satisfy', cursive;
}
</style>
