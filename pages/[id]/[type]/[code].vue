<script lang="ts" setup>const route = useRoute();
import { TYPE } from '~/assets/js/enum';
import { useOverall } from '~/stores/useOverall';
import { useTicket } from '~/stores/useTicket';
import { useElectionStore } from '#imports';
import { useClear } from '#imports';



// router
const id: string = route.params.id as string;
const type: string = route.params.type as string;
const code: string = route.params.code as string;

// store
const OAStore = useOverall();
const {
    OAId,
} = storeToRefs(OAStore);
const { 
    setIdTypeCode
} = OAStore;

const electionStore = useElectionStore();

const { clear } = useClear();


onBeforeMount( async() => {
    setIdTypeCode(id, TYPE.CITY, code);
    OAId.value = id;
    clear();
});
</script>
<template>
    <div class="page">
        <div class="page__area">
            <AreaGroup :id="id" :type="type" :code="code" />
        </div>
        <div class="page__content">
            <OverallGroup :id="id" :code="code" />
            <Map :id="id" />
            <TicketGroup />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .page {
        &__content {
            margin-top: 2rem;
            display: flex;
            justify-content: space-between;

            @include pad {
                display: block;
            }
        }
    }
</style>