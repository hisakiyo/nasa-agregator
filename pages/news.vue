<template>
  <div>
    <p>{{ $t("welcome") }}</p>
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
      title: 'Actualités',
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