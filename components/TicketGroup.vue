<script lang="ts" setup>
import { useTicket } from '#imports';

// store
const ticketStore = useTicket();
const {
    isCityTicketPending,
    isDistTicketPending,
    isVliTicketPending,
    cityTicketList,
    distTicketList,
    vliTicketList
} = storeToRefs(ticketStore);

const profileStore = useProfile();
const {
    isCurrentProfilePending,
    currentProfile,
} = storeToRefs(profileStore);

</script>
<template>
    <div class="TicketGroup">
        <h1>TicketGroup</h1>
        <Profile 
            :profile="currentProfile" 
            :isPending="isCurrentProfilePending" />
        <Ticket
            :ticketList="cityTicketList"
            :isPending="isCityTicketPending" />
        <Ticket
            :ticketList="distTicketList"
            :isPending="isDistTicketPending" />
        <Ticket
            :ticketList="vliTicketList"
            :isPending="isVliTicketPending" />
    </div>
</template>
<style lang="scss" scoped>
    .TicketGroup {
        border: 1px solid blueviolet
    }
</style>