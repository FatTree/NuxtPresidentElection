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
    currentProfile,
    isNationProfilePending,
    isCurrentProfilePending,
} = storeToRefs(profileStore);
const { 
    getProfile 
} = profileStore;

const ticketStore = useTicket();
const {
    nationalTicketList,
    isNationTicketPending,
    currentTicketList,
    isCurrentTicketPending,

} = storeToRefs(ticketStore);
const {
    getTicket
} = ticketStore;

const areaStore = useArea();
const {
    selectedArea
} = storeToRefs(areaStore);

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
        <h1 class="OverallGroup__title">{{ $t('overall.overall') }}</h1>
        <h1 class="OverallGroup__title">{{ selectedArea }}</h1>
        <div class="OverallGroup__content">
            <Profile :profile="currentProfile" :isPending="isCurrentProfilePending" />
            <Ticket 
                :isOverall="true" 
                :ticketList="currentTicketList"
                :isPending="isCurrentTicketPending" />
        </div>
    </div>
</template>
<style scoped lang="scss">
    .OverallGroup {
        /* margin-top: 2rem; */
        background: $white;
        padding: 20px;
        border-radius: 1rem;
        width: 280px;
        height: 100%;

        @include pad {
            width: calc(100% - 40px)
        }
        @include mobile {
            width: calc(100% - 40px)
        }

        &__title {
            @include title-l;
            margin-bottom: 1rem;
        }

        &__content { 
            @include pad {
                display: flex;
                justify-content: space-evenly;
            }

            @include mobile {
                display: block;
            }
        }
    }
    
</style>