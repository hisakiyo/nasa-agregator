<template>
  <div class="bg-slate-900 py-20 w-full">
    <section class="text-center px-10">
      <h1 class="text-4xl tracking-tight font-extrabold sm:text-5xl text-white">{{ $t("latest_posts_title") }}</h1>
      <p class="mt-2 max-w-3xl mx-auto text-lg">{{ $t("latest_posts_content") }}</p>
    </section>

    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 lg:gap-4 px-10">
      <li v-for="article in articles" :key="article.id">
        <nuxt-link :to="`/articles/${article.id}/`" class="w-full h-full mt-5 mb-2 lg:mb-8 px-6 py-4 bg-slate-800 shadow-lg overflow-hidden ring-1 ring-white/10 hover:ring-white/20 cursor-pointer ring-inset">
          <h2 class="text-lg font-medium">{{ article.title }}</h2>
          <p class="text-sm text-slate-400">{{ $t("published_date") }} {{ new Date(article.date).toLocaleDateString() }}</p>
          <p class="text-sm text-slate-200 mt-2">{{article.description.substring(0, 300) }}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: '',
    }
  },
  async fetch() {
    const res = await this.$axios.get('/api/news')
    this.articles = res.data
  },
}
</script>
