<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-breadcrumbs divider="/">
        <v-breadcrumbs-item>
          <router-link to="/">トップ</router-link>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item>
          meetup.title
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-flex>
    <v-flex xs8 offset-xs2 mb-3>
      <v-card>
        <v-toolbar color="secondary">
          <v-toolbar-title>meetup.title</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-textarea label="質問をここに書いてね"></v-textarea>
          <v-btn color="primary" large>送信する</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs8 offset-xs2 mb-3>
      <question-card
        :question="sampleData"
        @send-message="sendComment"
        >
      </question-card>
    </v-flex>
  </v-layout>
</template>

<script>
import QuestionCard from '~/components/QuestionCard'

const sampleData = {
  id: "question-1",
  owner: {
    name: "質問をした人",
    photoURL: ""
  },
  body: "fetch メソッドは、ページがレンダリングされる前に、データをストアに入れるために使われます。コンポーネントのデータをセットしないという点を除いては asyncData メソッドとよく似ています。",
  createdAt: "2018/9/2 18:00",
  updatedAt: "2018/9/2 18:00",
  comments: [
    {
      id: "comment-1-1",
      owner: {
        name: "コメントをした人",
        photoURL: ""
      },
      body: "ヘッダーはそのままでサイドバーの項目だけページ毎に変えたいときも1つのレイアウトcomponentでまかなえました",
      createdAt: "2018/9/2 18:00",
      updatedAt: "2018/9/2 18:00"
    }
  ]
}

console.log(sampleData.owner.name)

export default {
  components: {
    QuestionCard
  },
  data () {
    return {
      sampleData: sampleData
    }
  },
  methods: {
    sendComment (commentBody) {
      console.log(commentBody)
    }
  }
}
</script>
