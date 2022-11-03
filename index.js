import { createApp } from 'vue';
import { options } from './Api.js';
createApp({
  data() {
    return {
      message: null,
      songs: [],
      title: '',
      artist: '',
      track: '',
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

    const croppedResponce = (await data.length) > 4 ? data.slice(0, 5) : data;
    const modifiedResponce = croppedResponce.map((it) => {
      return {
        artist: it.artist.name,
        title: it.title_short,
        track: it.preview,
      };
    });
    this.songs = modifiedResponce;

    this.artist = modifiedResponce[0].artist;
    this.title = modifiedResponce[0].title;
    this.track = modifiedResponce[0].track;
  },
}).mount('#app');
