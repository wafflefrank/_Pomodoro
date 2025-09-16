import { defineStore } from 'pinia'

export const useSettings = defineStore('settings', {
  state: () => ({
    focusMin: 25,
    shortBreakMin: 5,
    longBreakMin: 15,
    cyclesUntilLong: 4,
    autoStartNext: true,
    sound: true
  }),
  actions: {
    load() {
      const raw = localStorage.getItem('pomodoro-settings')
      if (raw) {
        Object.assign(this, JSON.parse(raw))
      }
    },
    persist() {
      localStorage.setItem('pomodoro-settings', JSON.stringify(this.$state))
    }
  }
})
