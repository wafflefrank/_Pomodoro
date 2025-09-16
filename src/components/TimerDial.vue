<template>
  <div class="timer-wrap">
    <div class="timer-circle">
      <svg viewBox="0 0 100 100" style="transform: rotate(-90deg)">
        <!-- 細灰色外框（軌道） -->
        <circle
          :r="radius"
          cx="50"
          cy="50"
          :stroke-width="trackWidth"
          stroke="rgba(203, 213, 225, 0.35)"
          fill="none"
        />
        <!-- 進度圓弧（圓角端點） -->
        <circle
          :r="radius"
          cx="50"
          cy="50"
          :stroke-width="progressWidth"
          :stroke="progressColor"
          stroke-linecap="round"
          fill="none"
          :style="{
            strokeDasharray: `${circumference}`,
            strokeDashoffset: `${dashOffset}`
          }"
        />
      </svg>
      <div class="timer-core" style="inset: 0; border: none; background: transparent">
        <div class="time">{{ mmss }}</div>
        <div class="mode">
          {{
            timerStore.mode === 'focus'
              ? '專注中'
              : timerStore.mode === 'short'
                ? '短休息'
                : '長休息'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useTimer } from '../stores/timer'

export default {
  name: 'TimerDial',

  computed: {
    // 會產生 this.timerStore（useTimer -> timerStore）
    ...mapStores(useTimer),

    mmss() {
      const secs = Math.max(0, this.timerStore.remaining || this.timerStore.totalSeconds)
      const m = String(Math.floor(secs / 60)).padStart(2, '0')
      const s = String(secs % 60).padStart(2, '0')
      return `${m}:${s}`
    },

    circumference() {
      return 2 * Math.PI * this.radius
    },
    dashOffset() {
      const p = Math.max(0, Math.min(1, this.timerStore.progress || 0))
      return this.circumference * (1 - p)
    },
    progressColor() {
      return getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#ef4444'
    }
  },

  data() {
    return {
      radius: 42, // 與 viewBox 相對應
      trackWidth: 2, // 軌道寬度
      progressWidth: 4 // 進度寬度
    }
  }
}
</script>
