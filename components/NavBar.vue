<script setup lang="ts">
import type { ElectionModel } from '~/models/data/ElectionModel';
import { useElectionStore } from '#imports';

const isPending: Ref<boolean> = ref(true);
const list: Ref<ElectionModel[]> = ref([]);

const electionStore = useElectionStore();
const { electionList } = storeToRefs(electionStore);
const { getElectionList } = electionStore;

onMounted(async () => {
  try {
    await getElectionList();
    list.value = electionList.value;
  } catch (error) {
    console.log(error)
  } finally {
    isPending.value = false;
  }
});

</script>

<template>
  <div class="navBar">
    <div v-if="isPending">loading...</div>
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
