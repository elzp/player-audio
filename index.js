import { createApp } from 'vue';
import { options } from './Api.js';
createApp({
  data() {
    return {
      message: null,
      };
  },
  methods: {
    setTrack() {
      console.log(this.message);
    },
  },
  async mounted() {
    const response = await fetch(
      'https://deezerdevs-deezer.p.rapidapi.com/search?q=rihanna',
      options
    ); //.catch((err) => console.error(err));
    const { data } = await response.json();

    console.log(data)
  },
}).mount('#app');
