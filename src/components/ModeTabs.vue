<script setup>
import { computed } from 'vue'
import { useTimer, MODES } from '../stores/timer'

const t = useTimer()
const tabs = [
  { key: MODES.FOCUS, label: 'Focus' },
  { key: MODES.SHORT, label: 'Short Break' },
  { key: MODES.LONG, label: 'Long Break' }
]
const active = computed(() => t.mode)
const select = (k) => t.switchMode(k)
</script>

<template>
  <div class="tabbar">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="tab"
      :class="{ active: active === tab.key }"
      @click="select(tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
