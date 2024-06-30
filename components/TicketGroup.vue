<script lang="ts" setup>
import { useTicket } from '#imports';

// store
const ticketStore = useTicket();
const {
    cityTicketList,
    distTicketList,
    vliTicketList
} = storeToRefs(ticketStore);
const {
    isCityTicketPending,
    isDistTicketPending,
    isVliTicketPending,
} = ticketStore;


</script>
<template>
    <div class="TicketGroup">
        <h1>TicketGroup</h1>
        <Ticket
            v-for="(city, i) in cityTicketList" :key="i"
            :ticketList="city"
            :isPending="isCityTicketPending" />
        <Ticket
            v-for="(dist, i) in distTicketList" :key="i"
            :ticketList="dist"
            :isPending="isDistTicketPending" />
        <Ticket
            v-for="(vli, i) in vliTicketList" :key="i"
            :ticketList="vli"
            :isPending="isVliTicketPending" />
    </div>
</template>
<style lang="scss" scoped>
    .TicketGroup {
        border: 1px solid blueviolet
    }
</style>