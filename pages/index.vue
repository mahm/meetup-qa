<template>
  <v-container grid-list-md>
    <v-layout row wrap>    
      <v-flex sm6 v-for="group in groups" :key="group.id">
        <v-card>
          <router-link :to="`/meetups/${group.id}`">
            <v-card-media height="200px" :src="group.imageURL"></v-card-media>
          </router-link>
          <v-card-title class="headline">{{group.name}}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  async fetch ({ store }) {
    store.dispatch('layout/setHeader', true)
    store.dispatch('groups/clear')
    await store.dispatch('groups/fetch')
  },
  computed: {
    groups () {
      return this.$store.getters['groups/data']
    }
  }
}
</script>
