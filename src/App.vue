<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import ModeTabs from './components/ModeTabs.vue'
import TimerDial from './components/TimerDial.vue'
import ControlBar from './components/ControlBar.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'
</script>

<template>
  <div class="app-shell">
    <div class="glass-card">
      <div class="header">
        <div class="brand"><span class="dot"></span> Pomodoro Studio</div>
        <!-- <div class="subtitle">輕盈動畫 · 玻璃擬物 · 專注效率</div> -->
      </div>

      <div class="row mt-4">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            width: 100%;
          "
        >
          <ModeTabs />
          <SettingsDrawer />
        </div>

        <TimerDial />
        <div style="margin-top: 14px"><ControlBar /></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  transition: background 0.2s;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
// 滑出動畫特效
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease;
}
</style>
