export default {
  name: 'Player',
  props: ['artist', 'title', 'track'],
  data() {
    return {
      currentAudio: '',
      maxDuration: { minutes: 0, seconds: 30 },
      currentDuration: { minutes: 0, seconds: 0 },
      styleLength: '.1%',
      valueOfLength: 0.1,
      playedSecondsInterval: null,
      numberedMaxDuration: 0,
      isPaused: false,
    };
  },
  created() {
    this.numberedMaxDuration =
      60 * this.maxDuration.minutes + this.maxDuration.seconds;
  },
  mounted() {
    this.$watch(
      () => this.track,
      (next, prev) => {
        if (next !== prev) {
          this.currentAudio = new Audio(this.track);
          this.currentAudio.play();
          this.playedSecondsInterval = setInterval(() => {
            if (this.valueOfLength < this.numberedMaxDuration) {
              this.valueOfLength = Math.floor(this.valueOfLength + 1);
              this.styleLength = `${
                (this.valueOfLength * 100) / this.numberedMaxDuration
              }%`;
              if (this.currentDuration.seconds === 59) {
                this.currentDuration.seconds = 0;
                this.currentDuration.minutes = this.currentDuration.minutes + 1;
              } else {
                this.currentDuration.seconds = this.currentDuration.seconds + 1;
              }
            } else {
              clearInterval(this.playedSecondsInterval);
            }
          }, 1000);
        }
      }
    );
  },
  beforeUpdate() {
    this.$watch(
      () => this.track,
      (next, prev) => {
        if (prev !== '') {
          clearInterval(this.playedSecondsInterval);
          this.isPaused = false;
        }
      }
    );
  },
  updated() {
    this.$watch(
      () => this.currentAudio,
      (next, prev) => {
        clearInterval(this.playedSecondsInterval);
        if (prev !== '') {
          prev.pause();
          this.currentDuration.minutes = 0;
          this.currentDuration.seconds = 0;
          this.playedSecondsInterval = null;
          this.styleLength = '.1%';
          this.valueOfLength = 0.1;

          this.interval();
        }
      }
    );
  },
  methods: {
    createTwoDigits(number) {
      if (number.toString().split('').length === 1) {
        return `0${number}`;
      } else {
        return `${number}`;
      }
    },
    pause() {
      if (this.currentAudio !== '') {
        switch (this.isPaused) {
          case false:
            this.currentAudio.pause();
            clearInterval(this.playedSecondsInterval);
            this.isPaused = true;
            break;
          case true:
            this.currentAudio.play();
            this.interval();
            this.isPaused = false;
            break;
          default:
            this.currentAudio.pause();
            clearInterval(this.playedSecondsInterval);
            this.isPaused = true;
            break;
        }
      }
    },

    interval() {
      this.playedSecondsInterval = setInterval(() => {
        if (this.valueOfLength < this.numberedMaxDuration) {
          this.valueOfLength = Math.floor(this.valueOfLength + 1);
          this.styleLength = `${
            (this.valueOfLength * 100) / this.numberedMaxDuration
          }%`;

          if (this.currentDuration.seconds === 59) {
            this.currentDuration.seconds = 0;
            this.currentDuration.minutes = this.currentDuration.minutes + 1;
          } else {
            this.currentDuration.seconds = this.currentDuration.seconds + 1;
          }
        } else {
          clearInterval(this.playedSecondsInterval);
        }
      }, 1000);
    },
  },
  template: `<div
  class="bg-white shadow-lg rounded-lg"
  style="width: 45rem !important"
>
  <div class="flex">
    <div class="w-full p-8">
      <div class="flex justify-between">
        <div>
          <h3 class="text-2xl text-grey-darkest font-medium">
            {{title}}
          </h3>
          <p class="text-sm text-grey mt-1">{{artist}}</p>
        </div>
      </div>
      <div class="flex justify-evenly items-center mt-8">
        <div class="text-grey-darker" @click="$emit('change','left')">
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
          </svg>
        </div>
        <div
          class="
            text-white
            bg-red-500
            p-8
            rounded-full
            bg-red-light
            shadow-lg
          "
          @click="pause"
        > 
          <svg v-if="isPaused"
          class="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20" fill="currentColor">
	          <polygon  points="5,0 5,20 20,10" fill="white" />
          </svg>
          <svg v-if="!isPaused"
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
          </svg>
        </div>
        <div class="text-grey-darker" @click="$emit('change','right')">
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div class="mx-8 py-4">
    <div class="flex justify-between text-sm text-grey-darker">
      <p>{{createTwoDigits(currentDuration.minutes)}}:{{createTwoDigits(currentDuration.seconds)}}</p>
      <p>{{createTwoDigits(maxDuration.minutes)}}:{{createTwoDigits(maxDuration.seconds)}}</p>
    </div>
    <div class="mt-1">
      <div class="h-1 bg-grey-dark rounded-full">
        <div
          class="
            
            h-1
            bg-red-light
            rounded-full
            relative
            bg-red-500
          "
          :style="{ 'width': styleLength }"
        >
          <span
            class="
              w-4
              h-4
              bg-red
              absolute
              pin-r pin-b
              -mb-1
              rounded-full
              shadow
            "
          ></span>
        </div>
      </div>
    </div>
  </div>
</div>`,
};
