import { createApp } from 'vue';
import { options } from './api.js';
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
    updateCurrentSong(number) {
      this.artist = songs[number].artist;
      this.title = songs[number].title;
      this.track = songs[number].track;
    },
  },
  async mounted() {
    fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=rihanna', options)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        const croppedResponce = (await (data.data.length > 4))
          ? data.data.slice(0, 5)
          : data.data;
        console.log(croppedResponce);
        const modifiedResponce = await croppedResponce.map((it) => {
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
      })
      .catch((error) => {
        this.errorMessage = error;
        console.error('There was an error!', error);
      });
  },
}).mount('#app');
