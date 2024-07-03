<script setup lang="ts">
import type { ProfileModel, TicketGeneratedModel } from '~/models/data/ElectionModel';

const areaStore = useArea();
const {
    distList,
    vliList,
} = storeToRefs(areaStore);
const profileStore = useProfile();
const {
    currentProfile
} = storeToRefs(profileStore);

const ticketStore = useTicket();
const {
    currentTicketList
} = storeToRefs(ticketStore);

const clear = () => {
    console.log('clear');
    distList.value = [];
    vliList.value = [];
    currentProfile.value = {} as ProfileModel;
    currentTicketList.value = [] as TicketGeneratedModel[];
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
