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
    <div class="navBar__container">
      <nuxt-link 
        class="navLink"
        v-for="i in list" 
        :to="{
          name: 'id-type-code',
          params: {
            id: i.theme_id,
            type: i.data_level,
            code: `${i.prv_code}_${i.city_code}_${i.area_code}_${i.dept_code}_${i.li_code}` 
          }
        }">
        {{ $t("UI.session", { session: i.session }) }}</nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navBar {
  overflow: hidden;
  height: 50px;
  padding-top: 4rem;
  /* position: fixed;
  top: 6rem; */
  
  &__container {
    display: flex;
    overflow-y: scroll;
    padding-bottom: 17px;
  }
}
.navLink {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: $white-dark;
  text-decoration: none;
  padding: 10px 0 15px;
  margin-right: 1em;
  border-bottom: 4px solid transparent;
  box-sizing: border-box;
  white-space: nowrap;
  letter-spacing: .05em;
  
  @include mobile {
    font-size: 16px;
    font-weight: 700;
  }

  &:hover {
    color: $blue;
    border-bottom: 4px solid $white-button-hover;
  }
  &.router-link-active {
    color: $black;
    border-bottom: 4px solid $blue-button-click;
  }
}
</style>
