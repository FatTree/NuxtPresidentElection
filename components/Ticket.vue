<script setup lang="ts">
import type { TicketGeneratedModel } from '~/models/data/ElectionModel';

type Props = {
  ticketList: TicketGeneratedModel,
  isPending: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    ticketList: () => ({} as TicketGeneratedModel),
    isPending: true,
});
</script>

<template>
  <div class="Ticket">
    <h1 :style="{ color: `#${ticketList.party_color}`}">Ticket <label v-if="ticketList.is_victor.trim() === '*'"> - Selected</label></h1>
    <div v-show="isPending">~~~~~Loading~~~~~</div>
    <p>{{ ticketList.cand_no }}. {{ ticketList.party_name }}</p>
    <p>{{ ticketList.cand_name }} / {{ ticketList.vice_name }}</p>
    <p>得票率: {{ ticketList.ticket_percent }} %</p>
    <p>得票數: {{ ticketList.ticket_num }} 票</p>
  </div>
</template>

<style scoped lang="scss">
  .Ticket {
        border: 1px solid blueviolet
    }
</style>
