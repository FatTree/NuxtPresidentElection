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
        <Ticket
            v-if="cityTicketList"
            :ticketList="cityTicketList"
            :isPending="isCityTicketPending" />
        <Ticket
            v-if="distTicketList"
            :ticketList="distTicketList"
            :isPending="isDistTicketPending" />
        <Ticket
            v-if="vliTicketList"
            :ticketList="vliTicketList"
            :isPending="isVliTicketPending" />
    </div>
</template>
<style lang="scss" scoped>
    .TicketGroup {
        /* border: 1px solid blueviolet */
        @include pad {
            display: flex;
            overflow-y: scroll;
        }
    }
</style>