<script setup lang="ts">
import type { TicketGeneratedModel } from '~/models/data/ElectionModel';

type Props = {
  ticketList: TicketGeneratedModel[],
  isPending: boolean,
  isOverall?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
    ticketList: () => ([]),
    isPending: true,
    isOverall: false,
});

const areaName = ref('');
const color = ref('#EEE');
const bgColor = ref('#EEEEEE80');
const handleColor = () => {
  color.value = `#${props.ticketList[0].party_color}`;
  bgColor.value = `#${props.ticketList[0].party_color}30`;
}

watch( () => props.ticketList, (list) => {
  if(list.length > 0) {
    handleColor();
    areaName.value = list[0].area_name;
  } 
});

const label = ref(props.ticketList.map(e => {
  return {
    label: e.party_name,
    backgroundColor: '#' + e.party_color,
    data: e.ticket_percent,
  }
}));

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
  <div v-show="ticketList.length!==0" class="Ticket" >
    <Loader v-show="isPending" size="5em" border="10px"/>
    <div v-show="!isPending" class="ticketContent" :class="isOverall? '' : 'ticketBox'">
      <DonutPie
          v-if="isOverall"
          :chartType="'doughnut'"
          :data="allData" />
      <div class="Ticket__bottom">
        <p class="title" v-if="!isOverall">{{ areaName }}</p>
        <div class="candGroup" v-for="(item, i) in ticketList" :key="i">
          <div class="number">
            <div class="number__round" :style="{ backgroundColor: `#${item.party_color}`}">{{ item.cand_no }}</div>
          </div>
          <div class="name">
            <p class="name__partyName">{{ item.party_name }}</p>
            <p class="name__cand">{{ item.cand_name }} | {{ item.vice_name }}</p>
          </div>
          <div class="vote" :style="{ borderLeft: `2px solid #${item.party_color}` }">
            <p class="vote__percent">{{ item.ticket_percent }} %</p>
            <p class="vote__num">{{ item.ticket_num.toLocaleString('en') }} {{ $t('UI.ticket') }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <Transition>
    </Transition> -->
  </div>
</template>

<style scoped lang="scss">
/* .v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
} */
.Ticket {
  width: 280px;
  
  @include pad {
    width: auto;
    margin-top: 0;
  }

  @include mobile {
    margin-top: 3em;
    width: auto;
    display: flex;
  }
  
  .ticketContent {
    @include mobile {
        display: flex;
    }
    &.ticketBox {
      background-color: v-bind(bgColor);
      border: 3px solid v-bind(color);;
      width: calc(100% - 2em);
      min-height: 183px;
      border-radius: 1rem;
      padding: 1rem;
      
  
      @include pad {
        /* width: 280px; */
        min-width: 280px;
        &:not(:first-child) {
          margin-top: 0;
          margin-left: 1em;
        }
      }

      @include mobile {
        min-width: 250px;
        min-height: 165px;
      }
  
      > .Ticket__bottom {
        margin-top: 0;
  
        > .title {
          @include title-l;
          margin-bottom: 1em;
        }
      }
    }

  }

  &__bottom {
    margin-top: 2em;

    @include mobile {
      margin-top: 0;
      margin-left: 1em;
    }
    
    > .candGroup {
      display: flex;

      &:not(:last-child) {
        margin-bottom: 1em;
        @include mobile {
          margin-bottom: .5em;
        }
      }

      > .number {
        >.number__round {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          color: $white;
          text-align: center;
          line-height: 24px;
        }
      }
  
      > .name {
        margin-left: .5em;
        margin-right: .5em;
        width: 7em;

        @include mobile {
          width: 6em;
          padding-right: .5em;
        }

        >.name__partyName {
          @include title-m;
        }
        >.name__cand {
          @include text-s;
          margin-top: .3em;
        }
      }
  
      > .vote {
        padding-left: 1em;
        
        > .vote__percent {
          @include title-m;
        }
        > .vote__num {
          @include text-m;
        }
      }
    }
  }
  
}
</style>
