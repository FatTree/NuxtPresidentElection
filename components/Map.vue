<script lang="ts" setup>
import { useArea } from '#imports';
import { TYPE } from '~/assets/js/enum';
import type { MapViewModel } from '~/models/view/ViewModel';
type Props = {
    id: string;
}

const props = withDefaults(defineProps<Props>(), {
    id: '1f7d9f4f6bfe06fdaf4db7df2ed4d60c',
});

// store
const overallStore = useOverall();
const {
    OA_prv_code,
    OA_city_code,
    OA_area_code,
} = storeToRefs(overallStore);

const areaStore = useArea();
const {
    vliList,
} = storeToRefs(areaStore);
const { getArea } = areaStore;

const profileStore = useProfile();
const { getProfile } = profileStore;

const ticketStore = useTicket();
const { getTicket } = ticketStore;

const mapStore = useMap();
const {
    mapList,
} = storeToRefs(mapStore);
const {
    getMapTicketList
} = mapStore;

const clickMap = async(city: MapViewModel) => {
    console.log(city);
    // ticket
    // 0. set Codes
    OA_prv_code.value = city.prv_code;
    OA_city_code.value = city.city_code;
    OA_area_code.value = city.area_code;
    try {
        // 1. get DList
        await getArea(TYPE.DISC);
        // 2. clear VLi List | Selected
        vliList.value = [];
        // 3. get Profile/Ticket
        await getProfile(TYPE.CITY);
        await getTicket(TYPE.CITY);
    } catch (error) {
        console.log(error);
    }
}

onMounted(async () => {
    await getMapTicketList();
});

</script>

<template>
    <div class="map">
        <h1>Map</h1>
        <svg viewBox="0 0 510 700" xmlns="http://www.w3.org/2000/svg">
            <g 
                v-for="(city, index) in mapList" 
                :key="index" 
                v-html="city.path" 
                @click="clickMap(city)">
            </g>
        </svg>
    </div>
</template>
<style scoped lang="scss">
    .map {
        border: 1px solid blueviolet
    }
</style>