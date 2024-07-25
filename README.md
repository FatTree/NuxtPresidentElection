# TheF2E前端精神時光屋：台灣總統選舉開票地圖

## Overall
[總統選舉開票地圖](https://fattree.github.io/NuxtPresidentElection)

這是 2023年TheF2E前端精神時光屋的UI作品，我用`NUXT3`, `VUE3`將其實作出來；style除了chart及map以外，其他是純手刻。

## 心得：
其實這個專案最讓我煩心的是政府的API，找不到文件，硬著頭皮一個個去試，好難懂XD(還被我抓到蟲)
第二是要將後端吐給我的資料轉成前端要的格式，以前都覺得自己對於`array`, `obj`方法還算懂，不過經此一事才發現我太天真了，所以花了點時間將`object`, `array`的一些方法再用力的K一遍

## Reference
2023年TheF2E前端精神時光屋：[台灣總統選舉開票地圖](https://2023.thef2e.com/users/12061579704041679276?week=2)

## UI
**原始UI Figma**
https://www.figma.com/design/Caoi6yMxwbeKMneS5tsCt6/2020%E7%B8%BD%E7%B5%B1%E9%81%B8%E8%88%89%E5%8D%B3%E6%99%82%E9%96%8B%E7%A5%A8%E5%9C%B0%E5%9C%96?node-id=66-3067&t=uBQB9Unvt3qiR1Tk-0

**Supplement**
因為我有稍作一點修改及補充，所以也將supplemental UI補上：
RWD
ColorTable
Font system


## 專案內容
**使用技術**
* **前端框架**：VUE3, NUXT3
* **Other**：TypeScript, Pinia, VueRouter,
* **外掛**：I18n, chart.js, lodash
* **Unit test**：ViTest
* **Style**：SCSS, RWD
* **API**: OFetch
* **CICD**: git action -> git page

**Main Components：**
* NavBar
* Overall
* Profile
* Tickets
* Area
* Map

**網站系統：**
* 錯誤處理系統
* API攔截
* Data Model, formatter
* Debounce & Throttle
* Loading

專案架構：


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
