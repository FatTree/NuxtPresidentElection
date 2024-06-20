<script setup lang="ts"></script>

<template>
  <div>
    <h1>{{ $t("UI.name") }}</h1>
    <h2>{{ $t("UI.session") }}</h2>
    <select class="layout__nav__select" v-model="$i18n.locale">
        <option value="en">🇺🇸</option>
        <option value="ch">🇹🇼</option>
    </select>
    <div>
    <p></p>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
* {
  border: 1px solid #aaa;
}
p {
  border: 0;
}
</style>
