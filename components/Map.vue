<script lang="ts" setup>
import { useArea } from '#imports';
import type { MapViewModel } from '~/models/view/ViewModel';
type Props = {
    id: string;
}

const props = withDefaults(defineProps<Props>(), {
    id: '1f7d9f4f6bfe06fdaf4db7df2ed4d60c',
});

// store
const areaStore = useArea();
const {
    cityList,
} = storeToRefs(areaStore);

const mapStore = useMap();
const {
    mapList,
} = storeToRefs(mapStore);
const {
    getMapTicketList
} = mapStore;

const clickMap = (city: string) => {
    console.log('ClickMap!!', city);
    
}


// export type MapViewModel = {
//     name: string[],
//     path: string,
//     fill: string,
// }
// MapViewModel + TicketGeneratedModel
onMounted(async () => {
    await getMapTicketList()
    console.log(mapList.value);

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
                @click="clickMap(city.name[0])">
            </g>
        </svg>
    </div>
</template>
<style scoped lang="scss">
    .map {
        border: 1px solid blueviolet
    }
</style>