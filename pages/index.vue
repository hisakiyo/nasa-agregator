<template>
  <div>
    <div class="home-header">
      <Mars />
      <div class="absolute md:bottom-24 md:right-12 w-full m-auto w-1/3">
        <h1 class="uppercase text-4xl font-semibold">{{ $t("explore") }}</h1>
        <p class="text-lg">{{ $t("explore_text") }}</p>
      </div>
    </div>

    <div class="home-latest-posts-container">
      <LatestPosts />
    </div>

    <div class="home-iss-explore-container">
      <ISSExplorerHome />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t("home")
    }
  },
}
</script>

