<template>
  <div class="w-[900px] m-auto pt-32 pb-32">
    <h1 class="text-4xl tracking-tight font-extrabold sm:text-5xl text-white pb-6 text-center">ISS Explorer</h1>
    <div class="mt-2 max-w-3xl mx-auto text-lg">
      <p>{{ $t("iss_explorer_text") }}</p>
      <img src="/iss_full.jpeg" class="py-6 w-full h-[400px] object-cover rounded-lg">
    </div>

    <div class="bg-slate-900 rounded-lg px-6 py-4 flex justify-between text-center">
      <div>
        <p class="font-bold text-lg">{{ $t('iss_length') }} :</p>
        <p>110m</p>
      </div>
      <div>
        <p class="font-bold text-lg">{{ $t('iss_width') }} :</p>
        <p>74m</p>
      </div>
      <div>
        <p class="font-bold text-lg">{{ $t('iss_height') }} :</p>
        <p>30m</p>
      </div>
      <div>
        <p class="font-bold text-lg">{{ $t('iss_weight') }} :</p>
        <p>{{ $t('iss_weight_bis') }}</p>
      </div>
      <div>
        <p class="font-bold text-lg">{{ $t('iss_speed') }} :</p>
        <p>28 000 km/h</p>
      </div>
    </div>

    <div class="text-center">
      <p class="font-bold mt-16 mb-4">{{ $t("iss_team_first") + team.number + $t("iss_team_second") }}.</p>
      <ul>
        <li v-for="name in team.people" :key="name">
          - {{ name.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      team: '',
    }
  },
  head() {
    return {
      title: 'ISS EXPLORER',
    }
  },
  mounted() {
    this.getMembers()
  },
  methods: {
    async getMembers() {
      try {
        const response = await axios.get('http://api.open-notify.org/astros.json')
        this.team = response.data
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>
