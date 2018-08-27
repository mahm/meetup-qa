<template>
  <v-layout row wrap>
    <v-flex xs6>
      <v-card>
        <router-link to="/meetups/example">
          <v-card-media height="200px" src="https://jp.vuejs.org/images/logo.png"></v-card-media>
        </router-link>
        <v-card-title class="headline">Vue.js勉強会</v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  fetch ({ store }) {
    return store.dispatch('layout/setHeader', true)
  }
}
</script>
