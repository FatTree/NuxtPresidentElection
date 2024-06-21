<script lang="ts" setup>const route = useRoute();
const id: string = route.params.id;
const type: string = route.params.type;
const code: string = route.params.code;

</script>
<template lang="">
    <div>
        <p>id: {{ id }}</p>
        <p>type: {{ type }}</p>
        <p>code: {{ code }}</p>
    </div>
</template>

<style lang="scss" scoped>
    
</style>