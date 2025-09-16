<template>
  <div>
    <div class="row-split">
      <span></span>
      <button class="icon-gear" @click="open = !open" aria-label="Settings"></button>
    </div>

    <Transition name="fade-slide">
      <div v-if="open" class="list" style="margin-top: 12px">
        <div class="row-split">
          <label>Focus</label>
          <div style="flex: 1; display: flex; align-items: center; gap: 10px">
            <input type="range" min="5" max="120" v-model.number="s.focusMin" />
            <span class="chip">{{ s.focusMin.toString().padStart(2, '0') }}:00</span>
          </div>
        </div>
        <div class="row-split">
          <label>Short Break</label>
          <div style="flex: 1; display: flex; align-items: center; gap: 10px">
            <input type="range" min="1" max="60" v-model.number="s.shortBreakMin" />
            <span class="chip">{{ s.shortBreakMin.toString().padStart(2, '0') }}:00</span>
          </div>
        </div>
        <div class="row-split">
          <label>Long Break</label>
          <div style="flex: 1; display: flex; align-items: center; gap: 10px">
            <input type="range" min="5" max="90" v-model.number="s.longBreakMin" />
            <span class="chip">{{ s.longBreakMin.toString().padStart(2, '0') }}:00</span>
          </div>
        </div>
        <div class="row-split">
          <label>Rounds</label>
          <div style="flex: 1; display: flex; align-items: center; gap: 10px">
            <input type="range" min="2" max="10" v-model.number="s.cyclesUntilLong" />
            <span class="chip">{{ s.cyclesUntilLong }}</span>
          </div>
        </div>
        <div class="row-split switch">
          <label>自動開始下一段</label>
          <input type="checkbox" v-model="s.autoStartNext" />
        </div>
        <div class="row-split switch">
          <label>結束提示音</label>
          <input type="checkbox" v-model="s.sound" />
        </div>
        <div class="row-split">
          <span></span>
          <button class="btn" @click="apply">套用</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { useSettings } from '../stores/settings'
import { useTimer } from '../stores/timer'

export default {
  name: 'SettingsDrawer',
  setup() {
    const s = useSettings()
    const t = useTimer()
    s.load()
    return { s, t }
  },
  data() {
    return { open: false }
  },
  watch: {
    s: {
      handler() {
        this.s.persist()
      },
      deep: true
    }
  },
  methods: {
    minMax(v, min, max) {
      return Math.min(max, Math.max(min, Number(v) || 0))
    },
    apply() {
      this.t.reset()
      this.open = false
    }
  }
}
</script>
