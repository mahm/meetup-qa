<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class='elevation-12'>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Meetup QAにようこそ</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-btn block color="primary" dark>Googleアカウントでログインする</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  fetch ({ store }) {
    return store.dispatch('layout/setHeader', false)
  }
}
</script>
