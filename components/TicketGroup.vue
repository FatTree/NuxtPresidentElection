<script lang="ts" setup>
import { useTicket } from '#imports';
import { TYPE } from '~/assets/js/enum';

// store
const ticketStore = useTicket();
const {
    isCurrentTicketPending,
    currentTicketList,
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
            :ticketList="currentTicketList"
            :isPending="isCurrentTicketPending" />
    </div>
</template>
<style lang="scss" scoped>
    .TicketGroup {
        border: 1px solid blueviolet
    }
</style>