# 🍅Pomodoro Studio（番茄鐘）

以 Vue 3 + Vite + Pinia 打造的番茄鐘網頁版，具備專注/短休/長休模式、倒數最後 10 秒滴答聲、開始/暫停/完成音效、自動開始下一段等功能。

## 功能特色
- 專注（Focus）/ 短休（Short Break）/ 長休（Long Break）模式切換
- 可選自動開始下一段
- 開始/暫停/完成音效（`public/audio/*.mp3`）
- 倒數最後 10 秒每秒播放 `tick.mp3`
- 設定持久化（localStorage）
- 深色玻璃擬物 UI 與動畫

## 使用技術
- Vite + Vue 3
- Pinia（狀態管理）
- Vue Router（路由）
- HTML5 Audio（音效播放）


## 安裝與啟動

### 1) 下載並安裝套件
```sh
git clone https://github.com/wafflefrank/_Pomodoro.git
cd _Pomodoro
npm install
```

### 2) 開發模式啟動（預設 http://localhost:5173）
```sh
npm run dev
```

### 3) 建置產物（`dist/`）
```sh
npm run build
```

### 4) 本地預覽產物
```sh
npm run preview
```

## 使用說明
- 上方分頁切換模式（Focus / Short Break / Long Break）
- 中央為計時圓盤，下方為播放/暫停/重設控制列
- 右上角齒輪為設定，可調整：
  - 各模式時間（分鐘）
  - 幾輪專注後進入長休
  - 自動開始下一段
  - 是否啟用音效

## 音效放置與命名
將以下檔案放在 `public/audio` 目錄：
- `alert-work.mp3`：開始播放（Play）
- `alert-short-break.mp3`：暫停播放（Pause）
- `alert-long-break.mp3`：完成時播放一次（Complete）
- `tick.mp3`：倒數最後 10 秒，每秒播放一次

若需更換音效，覆蓋同名檔案即可。

## 狀態管理（Pinia）
- `stores/settings.js`：保存使用者設定（各模式分鐘數、是否自動開始、是否開啟音效），並以 localStorage 持久化。
- `stores/timer.js`：計時流程控制（start/pause/reset/complete/tick）。
  - start/pause：透過 `utils/mp3Audio.js` 播放對應音效
  - complete：播放完成音效並依規則切換模式（專注完成 → 計數 → 規則滿足轉長休，否則短休；休息結束 → 回到專注）
  - 倒數 10 秒：每秒播放 `tick.mp3`

## 授權
MIT
