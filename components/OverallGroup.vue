<script lang="ts" setup>
import { getTicketData } from '~/services';
// props
type Props = {
    id: string,
    type: string,
    code: string
}
const props = withDefaults(defineProps<Props>(), {
    id: '',
    type: '',
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
            <Profile :profile="NationProfile" :isPending="isNationProfilePending" />
        </div>
        <div>
            <h2>Ranking</h2>
            <div v-for="(item, index) in nationalTicketList" :key="index">
                <Ticket 
                    :ticketList="item"
                    :isPending="isNationTicketPending" />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .OverallGroup {
        border: 1px solid blueviolet
    }
    
</style>