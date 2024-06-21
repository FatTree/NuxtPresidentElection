<script setup lang="ts">
  const { data, pending, error, refresh, clear } = await useAsyncData(
    'mountains',
    () => $fetch('https://db.cec.gov.tw/static/elections/list/ELC_P0.json')
  );
  const list = data.value[0].theme_items
  console.log(list);
  
</script>

<template>
  <div class="navBar">
    <div v-if="pending">loading...</div>
    <nuxt-link 
      v-for="i in list" 
      :to="{
        name: 'id-type-code',
        params: {
          id: i.theme_id,
          type: i.data_level,
          code: `${i.prv_code}_${i.city_code}_${i.area_code}_${i.dept_code}_${i.li_code}` 
        }
      }">
      {{ $t("UI.session", { session: i.session }) }} | </nuxt-link>
  </div>
</template>

<style scoped>
.navBar {
  background-color: pink;
}
</style>
