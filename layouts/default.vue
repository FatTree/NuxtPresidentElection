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
    <div class="header">
      <h1 class="header__title">{{ $t("UI.name") }}</h1>
      <select class="header__i18n" v-model="$i18n.locale">
          <option value="en">🇺🇸</option>
          <option value="ch">🇹🇼</option>
      </select>
    </div>
    <div class="container">
      <NavBar />
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.layout {
  background-color: $white-light;
  width: 100vw;
  @include mobile {
    min-width: 375px;
  }

  > .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    .header__i18n {
      border-radius: 1em;
      margin-left: 2em;
    }
  }

  > .container {
    padding: 2em 3em;
    /* height: calc(100vh - 65px); */

    @include pad {
      height: 100%;
    }

    @include mobile {
      padding: 1em;
      width: calc(100vw - 2em);
      
    }
  }
}
.header {
  background-color: $blue;
  display: flex;
  padding: 17px 47px;

  @include mobile {
    width: calc(100vw - 2em);
    padding: 1em;
  }

  &__title {
    color: $white;
    font-size: 32px;
    font-weight: 600;
    line-height: 120%;

    @include mobile {
        font-size: 20px;
    }
  }
}
</style>
