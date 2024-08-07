# [NUXT3] TheF2E前端精神時光屋：台灣總統選舉開票地圖
![UI](/assets/pic/LayoutFullScreen.png "UI")

**Reference**
2023年TheF2E前端精神時光屋：[台灣總統選舉開票地圖](https://2023.thef2e.com/users/12061579704055397263?week=2)

---
## Overall
**成果連結**
[總統選舉開票地圖](https://fattree.github.io/NuxtPresidentElection)

**專案簡介**
這是 2023年TheF2E前端精神時光屋的UI作品，用`NUXT3`, `VUE3`實作；style除了chart及map以外，其他是純手刻。

---
## 專案內容
**使用技術**
* **前端框架**：`VUE3`, `NUXT3`
* **Other**：`TypeScript`, `Pinia`, `VueRouter`
* **外掛**：`I18n`, `chart.js`, `lodash`
* **Unit test**：`ViTest`
* **Style**：`SCSS`, `RWD`
* **API**: `OFetch`
* **CICD**: git action -> git page

**Main Components：**
![The San Juan Mountains are beautiful!](/assets/pic/LayoutFullScreenComp.jpg "San Juan Mountains")
* NavBar
  * AreaGroup
  * Area
* Overall
  * Profile
  * Ticket
* Map
* TicketGroup
  * Ticket

**網站系統：**
* 錯誤處理系統
* API攔截器
* Data Model, formatter
* Debounce & Throttle
* Loading

---
## UI
**原始UI Figma**
[台灣總統選舉開票地圖](https://www.figma.com/design/Caoi6yMxwbeKMneS5tsCt6/2020%E7%B8%BD%E7%B5%B1%E9%81%B8%E8%88%89%E5%8D%B3%E6%99%82%E9%96%8B%E7%A5%A8%E5%9C%B0%E5%9C%96?node-id=66-3067&t=uBQB9Unvt3qiR1Tk-0)


**Supplement**
因為有稍作一點修改及補充，所以也將[supplemental UI](https://fattree.github.io/NuxtPresidentElection/uiKit)補上：
![UI](/assets/pic/LayoutUI.png "UI")
* RWD
* ColorTable
* Font system

---
## 專案架構：
```
|-- .DS_Store
|-- .gitignore
|-- README.md
|-- error.vue  --> Root Level Error
|-- nuxt.config.ts
|-- package-lock.json
|-- package.json
|-- tsconfig.json
|-- vitest.config.ts
|-- .github
|   |-- workflows
|       |-- main.yml
|       |-- test.yml
|-- .nuxt
|   |-- ...
|-- assets
|   |-- _main.scss --> 主要CSS集中點
|   |-- js --> 元件類的js(非邏輯類)
|   |   |-- enum.ts
|   |-- styles
|       |-- _color.scss
|       |-- _font.scss
|       |-- _module.scss
|       |-- _reset.scss
|-- components
|   |-- Area.vue
|   |-- AreaGroup.vue
|   |-- Color.vue
|   |-- DonutPie.vue
|   |-- Loader.vue
|   |-- Map.vue
|   |-- NavBar.vue
|   |-- OverallGroup.vue
|   |-- Profile.vue
|   |-- Ticket.vue
|   |-- TicketGroup.vue
|   |-- Icons
|       |-- InfoIcon.vue
|       |-- RightIcon.vue
|       |-- RotateIcon.vue
|-- composables
|   |-- useChartData.ts
|   |-- useClear.ts
|   |-- useSelectArea.ts
|-- layouts
|   |-- 404.vue
|   |-- default.vue
|-- locales --> i18n的語言檔
|   |-- ch.json
|   |-- en.json
|-- models --> 將常用的model定義成type
|   |-- data --> 後端資料的model
|   |   |-- ElectionModel.ts
|   |-- view --> 轉換成前端資料的model
|       |-- ViewModel.ts
|-- pages
|   |-- [...slug].vue --> Page level's error page
|   |-- hello.vue
|   |-- index.vue
|   |-- uiKit.vue --> UI Kit的頁面
|   |-- [id]
|       |-- [type]
|           |-- [code].vue --> 主要頁面
|-- plugins
|   |-- chartjs.ts
|   |-- i18n.ts
|-- public
|   |-- favicon.ico
|-- server
|   |-- tsconfig.json
|-- services --> API services
|   |-- index.ts
|-- stores
|   |-- useArea.ts
|   |-- useElectionStore.ts
|   |-- useMap.ts
|   |-- useOverall.ts
|   |-- useProfile.ts
|   |-- useTicket.ts
|-- tests
|   |-- composables
|   |   |-- useClear.test.ts
|   |-- utils
|       |-- index.test.ts
|-- utils --> 共用資料處理邏輯
    |-- index.ts
```
---
## 心得

這個專案最讓我煩心的是政府的API，找不到文件，硬著頭皮一個個去試，好難懂XD(還被我抓到蟲)
第二是要將後端吐給我的資料轉成前端要的格式；發現以前被後端寵壞了，拿到的資料都是整理好直接用。不過經此一事才發現自己在這塊沒有想像中的純熟，所以花了點時間將`object`, `array`的一些方法再用力的K一遍。


---
## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
