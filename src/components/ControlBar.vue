<template>
  <div style="display: flex; gap: 12px; justify-content: center; align-items: center">
    <button
      class="btn icon glow"
      :class="timerStore.running ? 'pause' : 'play'"
      @click="toggle"
    ></button>
    <button class="btn icon ghost reset" @click="reset"></button>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useTimer } from '../stores/timer'

export default {
  name: 'ControlBar',
  computed: {
    ...mapStores(useTimer)
  },
  methods: {
    toggle() {
      if (this.timerStore.running) {
        this.timerStore.pause()
      } else {
        this.timerStore.start()
      }
    },
    reset() {
      this.timerStore.reset()
    }
  }
}
</script>
