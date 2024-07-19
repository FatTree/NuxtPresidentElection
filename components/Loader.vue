<script lang="ts" setup>
type Props = {
    size: string;
    border: string;
}
const props = withDefaults(defineProps<Props>(), {
    size: "1em",
    border: "10px",
});


</script>
<template>
    <div>
        <div class="loader"></div>
    </div>
</template>

<style lang="scss">
.loader {
    border: v-bind(border) solid $white-light;
    border-top: v-bind(border) solid $blue;
    border-radius: 50%;
    width: v-bind(size);
    height: v-bind(size);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>