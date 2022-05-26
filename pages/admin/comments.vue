<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="comments"
      :loading="loading">
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Comments</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template #[`item.isValidated`]="{ item }">
        <td>
          <v-icon v-if="item.isValidated" small color="green">mdi-check</v-icon>
          <v-icon v-else small color="yellow">mdi-timer-sand</v-icon>
        </td>
      </template>
      <template #[`item.actions`]="{ item }">
        <span v-if="!item.isValidated">
          <v-icon small @click="acceptComment(item)">mdi-check</v-icon>
          <v-icon small @click="deleteComment(item)">mdi-delete</v-icon>
        </span>
        <span v-else-if="item.isValidated">
          <v-icon small @click="deleteComment(item)">mdi-delete</v-icon>
        </span>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      // news_id, text, date, author_username, author_email, isValidated
      headers: [
        {
          text: 'ID',
          align:' d-none',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Author',
          value: 'author_username',
        },
        {
          text: 'Email',
          value: 'author_email',
        },
        {
          text: 'Text',
          value: 'text',
        },
        {
          text: 'Date',
          value: 'date',
        },
        {
          text: 'Etat',
          value: 'isValidated',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
        },
      ],
      comments: [],
      loading: true,
    }
  },
  head() {
    return {
      title: 'Comments',
    }
  },
  mounted() {
    this.getComments()
  },
  methods: {
    async getComments() {
      try {
        const response = await axios.get('/api/comments')
        this.comments = response.data
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async acceptComment(comment) {
      comment.isValidated = true
      try {
        await axios.put(`/api/comments/${comment.id}`, comment)
        this.getComments()
      } catch (error) {
        console.log(error)
      }
    },
    async deleteComment(comment) {
      try {
        await axios.delete(`/api/comments/${comment.id}`)
        this.getComments()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>