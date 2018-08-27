<template>
  <v-card>
    <v-card-title primary-title>
      <v-avatar size="24" color="grey lighten-4">
        <img :src="question.owner.photoURL">
      </v-avatar>
      <span>{{ question.owner.name }} さんからの質問です</span>
      <span class="caption">({{ displayDate(question.createdAt) }})</span>
    </v-card-title>
    <v-card-text>
      <p>{{ question.body }}</p>
      <v-divider mt-3></v-divider>
    </v-card-text>

    <v-card-text v-for="comment in question.comments" :key="comment.id">
      <div>
        <v-avatar size="24" color="grey lighten-4">
          <img :src="comment.owner.photoURL">
        </v-avatar>
        {{ comment.owner.name }} さん
        <span class="caption">({{ displayDate(comment.createdAt) }})</span>
      </div>
      <p>{{ comment.body }}</p>
      <v-divider mt-3></v-divider>
    </v-card-text>

    <v-card-text>
      <v-text-field
        v-model="commentBody"
        box
        append-outer-icon="mdi-send"
        label="コメントをここに書いてね"
        @click:append-outer="sendMessage"
        >
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    question: Object
  },
  data () {
    return {
      commentBody: ''
    }
  },
  methods: {
    sendMessage () {
      this.$emit('send-message', this.$data.commentBody)
      this.$data.commentBody = ''
    },
    displayDate (timestamp) {
      if (!timestamp) { return '' }
      return format(timestamp.toDate(), 'YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>
