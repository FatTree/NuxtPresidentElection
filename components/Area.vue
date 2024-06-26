<script setup lang="ts">
import { TYPE } from '~/assets/js/enum';
import type { AreaModel } from '~/models/data/ElectionModel';
import { useArea } from '~/stores/useArea'

type Props = {
    id: string;
    type: string;
    code: string;
    list: AreaModel[];
}
const props = withDefaults(defineProps<Props>(), {
    id: '4d83db17c1707e3defae5dc4d4e9c800',
    type: 'C',
    code: '00_000_00_000_0000',
    list: () => ([]),
});

const overallStore = useOverall();
const {
    CCode,
    DCode,
} = storeToRefs(overallStore);

const areaStore = useArea();
const {
    distList,
    vliList,
} = storeToRefs(areaStore);
const {
    getArea
} = areaStore;

const selectedArea: Ref<AreaModel | undefined> = ref();

watch( selectedArea, async() => {
    const {...params} = selectedArea.value;
    CCode.value = `${params.prv_code}_${params.city_code}_${params.area_code}_000_0000`;
    DCode.value = `${params.prv_code}_${params.city_code}_${params.area_code}_${params.dept_code}_0000`;
    try {
        switch (props.type) {
            case TYPE.CITY:
                // 1. get DList
                await getArea(TYPE.DISC);
                // 2. clear DIST Selected
                // 3. clear VLi List | Selected
                vliList.value = [];
                break;
            case TYPE.DISC:
                // 1. get VliList
                await getArea(TYPE.VLI);
                // 2. clear DSelected
                break;
            case TYPE.VLI:
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
})
</script>

<template>
    <div class="Area">
        <h1>Area: {{ type }}</h1>
        <select v-model="selectedArea">
            <option 
                v-for="(item, i) in list"
                :key="i" 
                :value="item">
                {{ item.area_name }}
            </option>
        </select>
    </div>
</template>

<style scoped lang="scss">
    .Area {
        border: 1px solid blueviolet
    }
</style>
