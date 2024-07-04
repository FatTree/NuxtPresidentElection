<script setup lang="ts">
import { TYPE } from "~/assets/js/enum";
import type { AreaModel } from '~/models/data/ElectionModel';

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

// composables
const { 
    setSelectedCity,
    setSelectedDist,
    setSelectedVli,
} = useSelectArea();

const selectedArea: Ref<AreaModel> = ref({} as AreaModel);

watch( selectedArea, async() => {
    const {...params} = selectedArea.value;
    
    switch (props.type) {
        case TYPE.CITY:
            setSelectedCity(params.prv_code, params.city_code,params.area_code);
            break;
            
        case TYPE.DISC:
            setSelectedDist(params.dept_code);
            break;

        case TYPE.VLI:
            setSelectedVli(params.li_code);
            break;

        default:
            break;
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
