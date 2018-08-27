<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex text-xs-center v-if="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-flex>
        <v-flex xs12 sm8 md4 v-else>
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
import firebase from 'firebase'

export default {
  async mounted () {
    const authData = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((authData) => resolve(authData || null))
    })
    if (authData) {
      this.$store.dispatch('auth/setAuth', authData)
      this.$router.push('/')
    } else {
      this.$data.loading = false
    }
  },
  fetch ({ store }) {
    return store.dispatch('layout/setHeader', false)
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    googleSignIn () {
      this.$store.dispatch('auth/signInWithGoogle')
        .then(() => {
          console.log('sign in successful')
        })
        .catch((e) => {
          console.log(e.message)
        })
    }
  }
}
</script>
