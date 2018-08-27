<template>
  <v-app>
    <template v-if="showHeader">
      <v-toolbar color="primary">
        <v-toolbar-title>
          <router-link to="/" tag="span" exact :style="{ cursor: 'pointer' }">{{ title }}</router-link>
        </v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
      <v-footer fixed app>
        <span>&copy; 2018</span>
      </v-footer>
    </template>

    <template v-else>
      <nuxt />
    </template>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Meetup QA'
      }
    },
    computed: {
      showHeader () {
        return this.$store.getters['layout/header']
      }
    }
  }
</script>
