<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="news"
      :search="search"
      :loading="loading"
      class="elevation-1"
    >
      <template #top>
            <v-toolbar flat>
              <v-toolbar-title>News</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="mr-3"
              ></v-text-field>
              <v-dialog v-model="dialog" persistent max-width="500px">
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="newNews()"
                    >New news</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span v-if="editedIndex == -1" class="headline">New news</span>
                    <span v-else class="headline">Edit news</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form" lazy-validation @submit.prevent="create">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                        type="text"
                        required
                        :disabled="editedIndex != -1"
                        @keyup.enter="onEnter"
                      ></v-text-field>
                      <v-textarea
                        v-model="editedItem.description"
                        label="Description"
                        type="text"
                        required
                        :rows="10"
                      ></v-textarea>
                      <v-text-field
                        v-model="editedItem.image"
                        label="URL Image"
                        type="text"
                        required
                        @keyup.enter="onEnter"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="dialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      type="submit"
                      @click="createNews()"
                    >
                      <span v-if="editedIndex == -1">Create</span>
                      <span v-else>Update</span>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small @click="editNews(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteNews(item)">mdi-delete</v-icon>
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
      news: [],
      loading: true,
      dialog: false,
      search: '',
      editedIndex: -1,
      editedItem: {},
      headers: [
        {
          text: 'ID',
          align:' d-none',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Title',
          value: 'title',
        },
        {
          text: 'Description',
          value: 'description',
        },
        {
          text: 'Date',
          value: 'date',
        },
        {
          text: 'Author',
          value: 'author_id',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
        },
      ],
    }
  },
  head() {
    return {
      title: 'News',
    }
  },
  mounted() {
    this.getNews()
  },
  methods: {
    async getNews() {
      try {
        const response = await axios.get('/api/news')
        this.news = response.data
        this.loading = false
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    async deleteNews(item) {
      try {
        await axios.delete(`/api/news/${item.id}`)
        this.getNews()
      } catch (e) {
        console.log(e)
      }
    },
    async createNews() {
      if(this.editedIndex === -1) {
        try {
          await axios.post('/api/news', this.editedItem)
          this.dialog = false
          this.editedItem = {}
          this.editedIndex = -1
          this.getNews()
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await axios.put(`/api/news/${this.editedItem.id}`, this.editedItem)
          this.dialog = false
          this.editedItem = {}
          this.editedIndex = -1
          this.getNews()
        } catch (e) {
          console.log(e)
        }
      }
    },
    editNews(item) {
      this.editedIndex = this.news.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    newNews() {
      this.dialog = true
      this.editedItem = {}
      this.editedIndex = -1
    },
  },
}
</script>
<style>
.truncate {
  max-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>