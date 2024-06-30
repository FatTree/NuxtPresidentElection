<script lang="ts" setup>const route = useRoute();
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
    isCityListPending,
    isDistListPending,
    isVliListPending,
} = storeToRefs(areaStore);

// store
const profileStore = useProfile();
const {
    NationProfile,
    isNationProfilePending,
} = storeToRefs(profileStore);
const {
    getProfile
} = profileStore;

onBeforeMount( async() => {
    setIdTypeCode(id, "C", code);
    // OACode.value = code;
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
        <!-- put into next level -->
            <template #city>
                <Area :id="id" :type="TYPE.CITY" :code="code" :list="cityList" :isPending="isCityListPending" />
            </template>
            <template #dist>
                <Area :id="id" :type="TYPE.DISC" :code="code" :list="distList" :isPending="isDistListPending" />
            </template>
            <template #vli>
                <Area :id="id" :type="TYPE.VLI" :code="code" :list="vliList" :isPending="isVliListPending" />
            </template>
        </AreaGroup>
        <OverallGroup :id="id" :type="type" :code="code" />
        <Map></Map>
        <!-- <TicketGroup></TicketGroup> -->
    </div>
</template>

<style lang="scss" scoped>
    
</style>