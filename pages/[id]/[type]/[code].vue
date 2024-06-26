<script lang="ts" setup>const route = useRoute();
import { getAreaList } from '~/services'
import { TYPE } from '~/assets/js/enum';
import { useOverall } from '~/stores/useOverall';

// router
const id: string = route.params.id as string;
const type: string = route.params.type as string;
const code: string = route.params.code as string;

// data
const list: Ref<[]> = ref([]);

// store
const OAStore = useOverall();
const {
    OAId,
    OAType,
    OACode
} = storeToRefs(OAStore);

const { 
    setIdTypeCode
} = OAStore;

const areaStore = useArea();
const {
    getArea,
} = areaStore;
const {
    cityList,
    distList,
    vliList,
} = storeToRefs(areaStore);

onMounted( async() => {
    setIdTypeCode(id, "C", code);
    OAId.value = id;
    try {
        await getArea('C');
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
        <AreaGroup>
            <template #city>
                <Area :id="id" :type="TYPE.CITY" :code="code" :list="cityList" />
            </template>
            <template #dist>
                <Area :id="id" :type="TYPE.DISC" :code="code" :list="distList" />
            </template>
            <template #vli>
                <Area :id="id" :type="TYPE.VLI" :code="code" :list="vliList" />
            </template>
        </AreaGroup>
        <OverallGroup></OverallGroup>
        <Map></Map>
        <TicketGroup></TicketGroup>
    </div>
</template>

<style lang="scss" scoped>
    
</style>