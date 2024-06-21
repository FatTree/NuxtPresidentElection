<script lang="ts" setup>const route = useRoute();
const id: string = route.params.id;
const type: string = route.params.type;
const code: string = route.params.code;

</script>
<template>
    <div>
        <p>id: {{ id }}</p>
        <p>type: {{ type }}</p>
        <p>code: {{ code }}</p>
    </div>
    <div>
        <AreaGroup></AreaGroup>
        <OverallGroup></OverallGroup>
        <Map></Map>
        <TicketGroup></TicketGroup>
    </div>
</template>

<style lang="scss" scoped>
    
</style>