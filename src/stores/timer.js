import { defineStore } from 'pinia'
import { useSettings } from './settings'
import mp3AudioManager from '../utils/mp3Audio'

const MODES = { FOCUS: 'focus', SHORT: 'short', LONG: 'long' }

export const useTimer = defineStore('timer', {
  state: () => ({
    mode: MODES.FOCUS,
    endAt: 0, // 結束的時間戳 (ms)
    remaining: 0, // 剩餘秒數
    running: false,
    cycleCount: 0, // 完成的專注次數
    progress: 0 // 0~1 進度，用於環形動畫
  }),
  getters: {
    totalSeconds(state) {
      const s = useSettings()
      if (state.mode === MODES.FOCUS) return s.focusMin * 60
      if (state.mode === MODES.SHORT) return s.shortBreakMin * 60
      return s.longBreakMin * 60
    },
    deg(state) {
      return `${Math.max(0, Math.min(1, state.progress)) * 360}deg`
    }
  },
  actions: {
    tick() {
      if (!this.running) return
      const now = performance.now()
      const remainMs = Math.max(0, this.endAt - now)
      this.remaining = Math.ceil(remainMs / 1000)
      this.progress = 1 - remainMs / (this.totalSeconds * 1000)

      // 播放倒數滴答聲（剩餘10秒時）
      const settings = useSettings()
      if (settings.sound && this.remaining <= 10 && this.remaining > 0) {
        mp3AudioManager.startTickSound(this.remaining)
      }

      if (remainMs <= 0) {
        this.complete()
        return
      }
      requestAnimationFrame(this.tick)
    },
    start() {
      if (this.running) return
      if (this.remaining <= 0) {
        this.remaining = this.totalSeconds
      }
      this.endAt = performance.now() + this.remaining * 1000
      this.running = true
      this.tick()
    },
    pause() {
      if (!this.running) return
      this.running = false
      const now = performance.now()
      this.remaining = Math.max(0, Math.ceil((this.endAt - now) / 1000))
    },
    reset(toMode = null) {
      if (toMode) this.mode = toMode
      this.running = false
      this.remaining = this.totalSeconds
      this.progress = 0
    },
    switchMode(next) {
      this.reset(next)
    },
    complete() {
      this.running = false
      this.remaining = 0
      this.progress = 1

      // 流程：focus 完成 → cycleCount++ → 判斷 long break
      if (this.mode === MODES.FOCUS) {
        this.cycleCount += 1
        const s = useSettings()
        const goLong = this.cycleCount % s.cyclesUntilLong === 0
        this.mode = goLong ? MODES.LONG : MODES.SHORT
      } else {
        this.mode = MODES.FOCUS
      }

      // 播放完成音效
      const s = useSettings()
      if (s.sound) {
        mp3AudioManager.playCompleteSound()
      }

      // 自動開始下一段
      if (s.autoStartNext) {
        this.reset()
        this.start()
      }
    }
  }
})

export { MODES }
