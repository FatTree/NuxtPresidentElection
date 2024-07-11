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

const label = ref(props.ticketList.map(e => {
  return {
    label: e.party_name,
    backgroundColor: '#' + e.party_color,
    data: e.ticket_percent,
  }
}))

const allData = computed(() => {
    return props.ticketList.map(e => {
      return {
        label: e.party_name,
        backgroundColor: '#' + e.party_color,
        data: e.ticket_percent
      }
    })
});

</script>

<template>
  <div class="Ticket">
    <div v-show="isPending">~~~~~Loading~~~~~</div>
    <h1>Ticket- {{ ticketList[0]?.area_name }}</h1>
    <div>
      <DonutPie
          v-if="!isPending"
          :chartType="'doughnut'"
          :data="allData" />
    </div>
    <div v-for="(item, i) in ticketList" :key="i">
      <p :style="{ color: `#${item.party_color}`}">{{ item.cand_no }}. {{ item.party_name }}
        <label v-if="item.is_victor.trim() === '*'"> - Selected</label>
      </p>
      <p>{{ item.cand_name }} / {{ item.vice_name }}</p>
      <p>{{ $t('ticket.ticketPercent') }}: {{ item.ticket_percent }} %</p>
      <p>{{ $t('ticket.ticket_num') }}: {{ item.ticket_num.toLocaleString('en') }} {{ $t('UI.ticket') }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .Ticket {
        border: 1px solid blueviolet
    }
</style>
