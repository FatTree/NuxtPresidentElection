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

const areaStore = useArea();
const {
    getArea,
} = areaStore;

const profileStore = useProfile();
const {
    getProfile
} = profileStore;

const ticketStore = useTicket();
const {
    getTicket
} = ticketStore;

const electionStore = useElectionStore();
const { electionList } = storeToRefs(electionStore);

const { clear } = useClear();


onBeforeMount( async() => {
    setIdTypeCode(id, TYPE.CITY, code);
    OAId.value = id;
    clear();
    try {
        await getArea(TYPE.CITY);
        await getProfile(TYPE.CITY);
        await getTicket(TYPE.CITY);
        
    } catch (error) {
        console.log(error)
    }
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
        &__area {
            flex-grow: 1;
            padding: 16px;
        }
        &__content {
            display: flex;
            justify-content: space-between;
        }
    }
</style>