<script setup lang="ts">
import { TYPE } from '~/assets/js/enum';
import type { AreaModel } from '~/models/data/ElectionModel';
import { useArea } from '~/stores/useArea'

type Props = {
    id: string;
    type: string;
    code: string;
    list: AreaModel[];
    isPending: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    id: '4d83db17c1707e3defae5dc4d4e9c800',
    type: 'C',
    code: '00_000_00_000_0000',
    list: () => ([]),
    isPending: false,
});

const overallStore = useOverall();
const {
    OA_area_code,
    OA_city_code,
    OA_dept_code,
    OA_li_code,
    OA_prv_code,
} = storeToRefs(overallStore);

const areaStore = useArea();
const {
    vliList,
} = storeToRefs(areaStore);
const {
    getArea
} = areaStore;

const profileStore = useProfile();
const {
    getProfile
} = profileStore;

const ticketStore = useTicket();
const {
    getTicket
} = ticketStore;

const selectedArea: Ref<AreaModel> = ref({} as AreaModel);

watch( selectedArea, async() => {
    const {...params} = selectedArea.value;
    console.log('watch~~~~');
    
    try {
        switch (props.type) {
            case TYPE.CITY:
                // 0. set Codes
                OA_prv_code.value = params.prv_code;
                OA_city_code.value = params.city_code;
                OA_area_code.value = params.area_code;
                // 1. get DList
                await getArea(TYPE.DISC);
                // 2. clear VLi List | Selected
                vliList.value = [];
                // 3. get Profile/Ticket
                await getProfile(TYPE.CITY);
                await getTicket(TYPE.CITY);
                break;
                
            case TYPE.DISC:
                // 0. set Codes
                OA_dept_code.value = params.dept_code;
                // 1. get VliList
                await getArea(TYPE.VLI);
                // 2. get Profileget Profile/Ticket
                await getProfile(TYPE.DISC);
                await getTicket(TYPE.DISC);
                break;
            case TYPE.VLI:
                // 0. set Codes
                OA_li_code.value = params.li_code;
                // 1. get Profile/Ticket
                await getProfile(TYPE.VLI);
                await getTicket(TYPE.VLI);
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
});


</script>

<template>
    <div class="Area">
        <h1>Area: {{ type }}</h1>
        <div v-show="isPending">loading...</div>
        <!-- BUG: No default value neither PINIA -->
        <select v-model="selectedArea">
            <option 
                v-for="(item, i) in list"
                :key="i" 
                :selected="i===0"
                :value="item">
                {{ item.area_name }}: {{ item.prv_code }}-{{  item.city_code }}-{{ item.area_code }}-{{ item.dept_code }}-{{ item.li_code }}
            </option>
        </select>
    </div>
</template>

<style scoped lang="scss">
    .Area {
        border: 1px solid blueviolet
    }
</style>
