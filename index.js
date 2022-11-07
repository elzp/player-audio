import { createApp } from 'vue';
import Player from './Player.js';
import { options } from './api.js';
createApp({
  components: { Player },
  data() {
    return {
      message: null,
      songs: [],
      title: '',
      artist: '',
      track: '',
      numberOfCurrentTrack: 0,
      maxnumberOfTracks: 5,
      loaded: false,
      loadingInterval: null,
    };
  },
  methods: {
    setTrack(direction) {
      switch (direction) {
        case 'left':
          if (this.numberOfCurrentTrack === 0) {
            this.numberOfCurrentTrack = this.maxnumberOfTracks - 1;
          } else {
            this.numberOfCurrentTrack--;
          }
          this.updateCurrentSong(this.numberOfCurrentTrack);
          break;
        case 'right':
          if (this.numberOfCurrentTrack === this.maxnumberOfTracks - 1) {
            this.numberOfCurrentTrack = 0;
          } else {
            this.numberOfCurrentTrack++;
          }
          this.updateCurrentSong(this.numberOfCurrentTrack);
          break;
        default:
          break;
      }
    },
    updateCurrentSong(number) {
      this.artist = this.songs[number].artist;
      this.title = this.songs[number].title;
      this.track = this.songs[number].track;
    },
  },
async mounted() {
    this.loadingInterval = setInterval(() => {
      fetch(
        'https://deezerdevs-deezer.p.rapidapi.com/search?q=rihanna',
        options
      )
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          const croppedResponce = (await (data.data.length >
            this.maxnumberOfTracks - 1))
            ? data.data.slice(0, this.maxnumberOfTracks)
            : data.data;
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
          this.loaded = true;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error('There was an error!', error);
        });
    }, 2500);

    this.$watch(
      () => this.loaded,
      () => {
        clearInterval(this.loadingInterval);
      }
    );
  },
  template: ` 
  <div class="w-full">
    <div class="h-2 bg-red-light"></div>
    <div class="flex items-center justify-center h-screen bg-red-lightest">
      <Player :artist="artist" :title="title" :track="track" @change="setTrack"/>
    </div>
  </div>`,
}).mount('#app');
