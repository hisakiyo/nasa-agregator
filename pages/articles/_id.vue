<template>
  <div class="py-20 w-full">
    <section class="relative text-center px-10 mt-20">
      <router-link to="/news/" class="absolute font-bold float-left -mt-16">&lt; Retour</router-link>
      <h1 class="text-2xl tracking-tight font-extrabold sm:text-4xl text-white">{{ article.title }}</h1>
      <p class="mt-2 max-w-3xl mx-auto text-lg">Publié le {{ new Date(article.date).toLocaleDateString() }}</p>
    </section>

    <p class="px-10 py-10">{{ article.description }}</p>

    <img class="m-auto px-" :src="article.image">
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: '',
    }
  },
  async fetch() {
    const id = this.$route.params.id;
    const res = await this.$axios.get('/api/news/' + id + '/')
    this.article = res.data
  },
  head() {
    return {
      title: 'Actualités',
    }
  },
}
</script>

