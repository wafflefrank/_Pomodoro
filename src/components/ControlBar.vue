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
import { useSettings } from '../stores/settings'
import mp3AudioManager from '../utils/mp3Audio'

export default {
  name: 'ControlBar',
  data() {
    return {
      audio: null
    }
  },
  computed: {
    ...mapStores(useTimer)
  },
  methods: {
    toggle() {
      if (this.timerStore.running) {
        this.timerStore.pause()
        // 播放暫停音效
        const settings = useSettings()
        if (settings.sound) {
          mp3AudioManager.playPauseSound()
        }
      } else {
        this.timerStore.start()
        // 播放開始音效
        const settings = useSettings()
        if (settings.sound) {
          mp3AudioManager.playStartSound()
        }
      }
    },
    reset() {
      this.timerStore.reset()
    }
  }
}
</script>
