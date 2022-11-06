export default {
  name: 'Player',
  props: ['artist', 'title', 'track'],
  data() {
    return {
      currentAudio: '',
    };
  },
  created() {
    this.$watch(
      () => this.track,
      () => {
        this.currentAudio = new Audio(this.track);
        this.currentAudio.play();
      }
    );
  },
  unmounted() {
    // this.currentAudio.pla
  },
  methods: {},
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
        >
          <svg
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
      <p>0:40</p>
      <p>4:20</p>
    </div>
    <div class="mt-1">
      <div class="h-1 bg-grey-dark rounded-full">
        <div
          class="
            w-1/5
            h-1
            bg-red-light
            rounded-full
            relative
            bg-red-500
          "
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
