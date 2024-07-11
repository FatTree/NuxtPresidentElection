<script setup lang="ts">
import type { ElectionModel } from '~/models/data/ElectionModel';
import { useElectionStore } from '#imports';

const isPending: Ref<boolean> = ref(true);
const list: Ref<ElectionModel[]> = ref([]);

const electionStore = useElectionStore();
const { electionList } = storeToRefs(electionStore);
const { getElectionList } = electionStore;
const router = useRouter();
const route=useRoute();

onMounted(async () => {
  try {
    await getElectionList();
    list.value = electionList.value;
  } catch (error) {
    console.log(error)
  } finally {
    isPending.value = false;
  }

  const path = computed(() =>route.path);
  if (path.value === '/' && list.value.length !== 0) {
    router.push({ 
      name: 'id-type-code', 
      params: {
        id: list.value[0].theme_id,
        type: list.value[0].data_level,
        code: `${list.value[0].prv_code}_${list.value[0].city_code}_${list.value[0].area_code}_${list.value[0].dept_code}_${list.value[0].li_code}` 
      } 
    })
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
