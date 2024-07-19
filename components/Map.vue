<script lang="ts" setup>
import debounce from 'lodash/debounce';

import type { MapViewModel } from '~/models/view/ViewModel';
type Props = {
    id: string;
}

const props = withDefaults(defineProps<Props>(), {
    id: '1f7d9f4f6bfe06fdaf4db7df2ed4d60c',
});

// composables
const { setSelectedCity } = useSelectArea();

// store
const mapStore = useMap();
const {
    mapList,
} = storeToRefs(mapStore);
const {
    getMapTicketList
} = mapStore;

const areaStore = useArea();
const {
    selectedArea,
} = storeToRefs(areaStore);

const clickMap = async(city: MapViewModel) => {
    selectedArea.value = city;
    setSelectedCity(city.prv_code, city.city_code,city.area_code);
}

const clickMapDebounce = debounce(clickMap, 1000, { leading: true, trailing: true });

onMounted(async () => {
    try {
        await getMapTicketList();
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="map">
        <svg viewBox="0 0 510 700" xmlns="http://www.w3.org/2000/svg">
            <g 
                v-for="(city, index) in mapList" 
                :key="index" 
                v-html="city.path" 
                @click="clickMapDebounce(city)">
            </g>
        </svg>
    </div>
</template>
<style scoped lang="scss">
    .map {
        width: 35%;
        @include pad {
            width: 90%;
            padding: 3em 0;
            margin: 0 auto;
        }
        > svg > g {
            cursor: pointer;
        }
    }
</style>