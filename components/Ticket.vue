<script setup lang="ts">
import type { TicketGeneratedModel } from '~/models/data/ElectionModel';

type Props = {
  ticketList: TicketGeneratedModel[],
  isPending: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    ticketList: () => ([]),
    isPending: true,
});


</script>

<template>
  <div class="Ticket">
    <div v-show="isPending">~~~~~Loading~~~~~</div>
    <div v-for="(item, i) in ticketList" :key="i">
      <h1 v-if="i === 0">Ticket- {{ item.area_name }}</h1>
      <p :style="{ color: `#${item.party_color}`}">{{ item.cand_no }}. {{ item.party_name }}
        <label v-if="item.is_victor.trim() === '*'"> - Selected</label>
      </p>
      <p>{{ item.cand_name }} / {{ item.vice_name }}</p>
      <p>得票率: {{ item.ticket_percent }} %</p>
      <p>得票數: {{ item.ticket_num }} 票</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .Ticket {
        border: 1px solid blueviolet
    }
</style>
