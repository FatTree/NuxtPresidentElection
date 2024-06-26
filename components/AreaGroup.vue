<script setup lang="ts">
const clear = () => {
    console.log('clear');
}
</script>

<template>
    <div class="AreaGroup">
        <h1>Area Group</h1>
        <slot name="city"></slot>
        <slot name="dist"></slot>
        <slot name="vli"></slot>
        <button @click="clear">clear</button>
    </div>
</template>

<style scoped lang="scss">
    .AreaGroup {
        border: 1px solid blueviolet
    }
</style>
