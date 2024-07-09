<script lang="ts" setup>const route = useRoute();
import { TYPE } from '~/assets/js/enum';
import { useOverall } from '~/stores/useOverall';
import { useTicket } from '~/stores/useTicket';




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

onBeforeMount( async() => {
    setIdTypeCode(id, TYPE.CITY, code);
    OAId.value = id;
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
    <div>
        <p>id: {{ id }}</p>
        <p>type: {{ type }}</p>
        <p>code: {{ code }}</p>
    </div>
    <div>
        <AreaGroup :id="id" :type="type" :code="code" />
        <OverallGroup :id="id" :code="code" />
        <Map :id="id" />
        <TicketGroup />
    </div>
</template>

<style lang="scss" scoped>
    
</style>