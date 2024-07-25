<script setup lang="ts">

// store
const OAStore = useOverall();

const { 
    getColor
} = OAStore;

const openUIKit = () => {
  window.open("/uiKit");
}

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
      <div class="header__UI" @click="openUIKit">UI Kit</div>
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
  max-width: 1600px;
  @include mobile {
    min-width: 375px;
  }

  > .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    min-width: none;
    min-width: calc(375px - 2em);

    > .header__i18n {
      border-radius: 1em;
      margin-left: 1em;
    }

    > .header__UI {
      border-radius: 1em;
      border: 1px solid $white;
      margin-left: 1em;
      background-color: #262E49;
      color: $white;
      padding: .5em;
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
      min-width: calc(375px - 2em);
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
