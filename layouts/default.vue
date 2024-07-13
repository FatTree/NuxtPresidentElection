<script setup lang="ts">

// store
const OAStore = useOverall();

const { 
    getColor
} = OAStore;

onBeforeMount(async () => {
  try {
    await getColor();
  } catch (error) {
    console.log(error);
  }
})

</script>

<template>
  <div class="layout">
    <div class="layout__header">
      <h1>{{ $t("UI.name") }}</h1>
      <select class="layout__nav__select" v-model="$i18n.locale">
          <option value="en">🇺🇸</option>
          <option value="ch">🇹🇼</option>
      </select>
    </div>
    <NavBar />
    <slot></slot>
  </div>
</template>

<style lang="scss">
.layout {
  &__header {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding: 10px;
    background-color: var(--color-primary);
    /* color: white; */

    h1 {
      margin: 0;
    }
  }
}
</style>
