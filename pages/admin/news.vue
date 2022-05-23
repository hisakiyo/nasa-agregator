<template>
  <div>
  </div>
</template>
<script>
// import axios from 'axios'

export default {
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      testContent: '',
    }
  },
  head() {
    return {
      title: 'News',
    }
  },
  methods: {},
}
</script>