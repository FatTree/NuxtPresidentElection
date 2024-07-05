<script lang="ts" setup>
// props
type Props = {
    id: string,
    code: string
}
const props = withDefaults(defineProps<Props>(), {
    id: '',
    code: ''
});

// store
const profileStore = useProfile();
const {
    NationProfile,
    isNationProfilePending,
} = storeToRefs(profileStore);
const { 
    getProfile 
} = profileStore;

const ticketStore = useTicket();
const {
    nationalTicketList,
    isNationTicketPending,

} = storeToRefs(ticketStore);
const {
    getTicket
} = ticketStore;

const allData = ref([
    {
        label: '投票率',
        backgroundColor: '#41B883',
        data: NationProfile.value.vote_to_elect,
    },
    {
        label: '未投票率',
        backgroundColor: '#E46651',
        data: 100 - NationProfile.value.vote_to_elect,
    }
]);


onBeforeMount( async() => {
    try {
        // Profile:
        isNationProfilePending.value = true;
        await getProfile('N');
    
        // Ticket:
        await getTicket('N');
    } catch (error) {
        console.log(error)
    }
});
</script>
<template lang="">
    <div class="OverallGroup">
        <h1>OverallGroup</h1>
        <div>
            <Profile :profile="NationProfile" :isPending="isNationProfilePending">
                <template #pie>
                    <DonutPie
                        :chartType="'doughnut'"
                        :data="allData" />
                </template>
            </Profile>
        </div>
        <div>
            <h2>Ranking</h2>
            <Ticket 
                :ticketList="nationalTicketList"
                :isPending="isNationTicketPending" />
        </div>
    </div>
</template>
<style scoped lang="scss">
    .OverallGroup {
        border: 1px solid blueviolet
    }
    
</style>