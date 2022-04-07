<template>
  <div>
    <p>{{ $t("welcome") }}</p>
    <v-btn @click="test()">Test</v-btn>
    <p>{{ testContent }}</p>
  </div>

</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      testContent: '',
    }
  },
  head() {
    return {
      title: 'A propos',
    }
  },
  methods: {
    async test() {
      await axios
          .get('/api/news')
          .then((getResponse) => {
            this.testContent = getResponse.data
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e)
          })
    }
  },
}
</script>