<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-breadcrumbs divider="/">
        <v-breadcrumbs-item>
          <router-link to="/">トップ</router-link>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item>
          {{ group.name }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-flex>
    <v-flex sm12 md8 offset-md2 mb-3>
      <v-card>
        <v-toolbar color="secondary">
          <v-toolbar-title>{{ group.name }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-textarea v-model="question.body" label="質問をここに書いてね"></v-textarea>
          <v-btn color="primary" large @click="sendQuestion">送信する</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex sm12 md8 offset-md2 mb-3 v-for="question in questions" :key="question.id">
      <question-card
        :question="question"
        @send-message="sendComment"
        >
      </question-card>
    </v-flex>
  </v-layout>
</template>

<script>
import QuestionCard from '~/components/QuestionCard'
import _ from 'lodash'

export default {
  async fetch ({ store, params }) {
    store.dispatch('questions/clear', params.id)
    store.dispatch('questions/startListener', params.id)
  },
  components: {
    QuestionCard
  },
  data () {
    return {
      question: {
        body: ''
      }
    }
  },
  methods: {
    sendComment ({ questionId, commentBody }) {
      const payload = { questionId, commentBody }
      this.$store.dispatch('questions/addComment', payload).then(() => {
        console.log(commentBody)
      })
    },
    sendQuestion (questionBody) {
      this.$store.dispatch('questions/add', this.$data.question).then(() => {
        this.$data.question.body = ''
      })
    }
  },
  computed: {
    group () {
      return this.$store.getters['groups/groupData'](this.$route.params.id)
    },
    questions () {
      return _.sortBy(this.$store.getters['questions/data'], question => question.createdAt).reverse()
    }
  }
}
</script>
