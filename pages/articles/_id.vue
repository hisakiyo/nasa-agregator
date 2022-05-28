<template>
  <div class="py-20 w-full">
    <section class="relative text-center px-10 mt-20">
      <router-link to="/news/" class="absolute font-bold float-left -mt-16">&lt; {{ $t("back") }}</router-link>
      <h1 class="text-2xl tracking-tight font-extrabold sm:text-4xl text-white">{{ article.title }}</h1>
      <p class="mt-2 max-w-3xl mx-auto text-lg">{{ $t("published_date") }} {{ new Date(article.date).toLocaleDateString() }}</p>
    </section>

    <p class="w-[900px] m-auto py-10">{{ article.description }}</p>

    <img class="m-auto px-" :src="article.image">

    <div class="w-[750px] m-auto mt-16">
      <ul>
        <h1 class="text-slate-400 text-2xl pb-2 border-b border-slate-400 mb-2">{{ $t("comments_title") }}</h1>
        <p class="text-slate-700 mb-6">{{ $t("comments_text") }}</p>
        <li v-for="comment in comments" :key="comment.id">
          <div v-if="comment.isValidated" class="border-red-300 border rounded-lg py-2 px-4 mb-4">
            <p class="inline-block font-bold">{{ comment.author_username }}</p> - <p class="inline-block">{{ new Date(comment.date).toLocaleDateString() }}</p>
            <p>{{ comment.text }}</p>
          </div>
        </li>
      </ul>

      <p class="border-b pb-2 border-slate-500 text-xl mt-10 text-slate-500 mb-4">{{ $t("comments_send") }}</p>
      <v-form ref="form" lazy-validation @submit.prevent="add">
        <input v-model="comment.author_username" v-bind:placeholder="$t('comments_pseudo')" type="text" required class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <input v-model="comment.author_email" v-bind:placeholder="$t('comments_mail')" type="text" required class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <textarea v-model="comment.text" v-bind:placeholder="$t('comments_comment')" type="text" required class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </v-form>
      <button type="submit" @click="addComment()" class="text-white bg-red-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-700 dark:focus:ring-red-800">{{ $t("comments_send_button") }}</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      article: '',
      comments: '',
      comment : {},
    }
  },
  async fetch() {
    const id = this.$route.params.id;
    const res = await this.$axios.get('/api/news/' + id + '/')
    this.article = res.data
  },
  head() {
    return {
      title: this.article.title,
    }
  },
  mounted() {
    this.getComments()
  },
  methods: {
    async getComments() {
      try {
        const response = await axios.get('/api/comments/news/' + this.$route.params.id)
        this.comments = response.data
      } catch (e) {
        console.log(e)
      }
    },
    async addComment() {
      try {
        this.comment.date = new Date();
        this.comment.news_id = this.article.id;
        this.comment.isValidated = false;
        await axios.post('/api/comments', this.comment)
        this.comment = {}
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

