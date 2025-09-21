// MP3 音效管理器
class MP3AudioManager {
  constructor() {
    this.sounds = {
      start: null,
      pause: null,
      complete: null,
      tick: null
    }
    this.init()
  }

  // 初始化音效
  init() {
    this.sounds.start = new Audio('/audio/alert-work.mp3')
    this.sounds.pause = new Audio('/audio/alert-short-break.mp3')
    this.sounds.complete = new Audio('/audio/alert-long-break.mp3')
    this.sounds.tick = new Audio('/audio/tick.mp3')

    // 設定音效屬性
    Object.values(this.sounds).forEach((audio) => {
      // eslint-disable-next-line no-param-reassign
      audio.preload = 'auto'
      // eslint-disable-next-line no-param-reassign
      audio.volume = 0.7
    })
  }

  // 播放開始音效
  playStartSound() {
    try {
      // eslint-disable-next-line no-param-reassign
      this.sounds.start.currentTime = 0
      this.sounds.start.play().catch((error) => {
        console.error('開始音效播放失敗:', error)
      })
      console.log('播放開始音效')
    } catch (error) {
      console.error('開始音效播放失敗:', error)
    }
  }

  // 播放暫停音效
  playPauseSound() {
    try {
      // eslint-disable-next-line no-param-reassign
      this.sounds.pause.currentTime = 0
      this.sounds.pause.play().catch((error) => {
        console.error('暫停音效播放失敗:', error)
      })
      console.log('播放暫停音效')
    } catch (error) {
      console.error('暫停音效播放失敗:', error)
    }
  }

  // 播放完成音效
  playCompleteSound() {
    try {
      // eslint-disable-next-line no-param-reassign
      this.sounds.complete.currentTime = 0
      this.sounds.complete.play().catch((error) => {
        console.error('完成音效播放失敗:', error)
      })
      console.log('播放完成音效')
    } catch (error) {
      console.error('完成音效播放失敗:', error)
    }
  }

  // 播放滴答聲
  playTickSound() {
    try {
      // eslint-disable-next-line no-param-reassign
      this.sounds.tick.currentTime = 0
      this.sounds.tick.play().catch((error) => {
        console.error('滴答聲播放失敗:', error)
      })
    } catch (error) {
      console.error('滴答聲播放失敗:', error)
    }
  }

  // 開始倒數滴答聲（剩餘10秒時）
  startTickSound(remainingSeconds) {
    if (remainingSeconds <= 10 && remainingSeconds > 0) {
      this.playTickSound()
    }
  }

  // 停止所有音效
  stopAllSounds() {
    Object.values(this.sounds).forEach((audio) => {
      audio.pause()
      // eslint-disable-next-line no-param-reassign
      audio.currentTime = 0
    })
  }
}

// 創建單例實例
const mp3AudioManager = new MP3AudioManager()

export default mp3AudioManager
