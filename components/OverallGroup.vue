<script lang="ts" setup>
import RightIcon from '~/components/Icons/RightIcon';
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
    areaName
} = storeToRefs(areaStore);

const isOpen: Ref<boolean> = ref(true);
const collapseOverall = () => {
    isOpen.value =!isOpen.value;
    localStorage.setItem('isOpen', isOpen.value);
}

onMounted(() => {
    const _isOpen = localStorage.getItem('isOpen');
    if (_isOpen !== null) {
        isOpen.value = (_isOpen===('true'||'false'));
    }
}),

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
    <div class="OverallGroup" :class="isOpen ? '' : 'collapse'">
        <h1 class="OverallGroup__title" :class="isOpen ? '' : 'collapseSVG'" @click="collapseOverall()">
            <label>{{ $t('overall.overall') }}</label>
            <RightIcon size="20" color="black" />
        </h1>
        <div class="OverallGroup__content" :class="isOpen ? '' : 'collapse'">
            <h1 class="title">{{ areaName ? areaName : '全國' }}</h1>
            <div class="content">
                <Profile :profile="currentProfile" :isPending="isCurrentProfilePending" />
                <Ticket 
                    :isOverall="true" 
                    :ticketList="currentTicketList"
                    :isPending="isCurrentTicketPending" />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .none {
        display: none;
    }
    .OverallGroup {
        background: $white;
        padding: 20px;
        border-radius: 1rem;
        width: 280px;
        height: 100%;

        @include pad {
            width: calc(100% - 40px);
            transition: height .2s ease-in;
            height: 380px;
    
            &.collapse {
                height: 1em;
            }
        }

        &__title {
            @include title-l;
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;

            @include pad {
                cursor: pointer;
            }

            > svg {
                display: none;

                @include pad {
                    display: block;
                    transition: all .2s ease-in;
                }
            }

            &.collapseSVG {
                > svg {
                    transform: rotate(90deg);
                }
            }
        }

        &__content { 
            @include pad {
                transition: height .2s ease-in;
                height: 100%;
                overflow-x: hidden;

                &.collapse {
                    height: 0;
                }
            }
            >.title {
                @include title-m;
                margin-bottom: 1rem;
            }
            >.content {
                @include pad {
                    display: flex;
                    justify-content: space-evenly;
                }
    
                @include mobile {
                    display: block;
                }

                > .Profile {
                    min-height: 232px;

                    @include pad {
                        min-height: 90px;
                    }
                }

                > .Ticket {
                    min-height: 295.5px;
                    padding-top: 2em;

                    @include pad {
                        padding-top: 0;
                        /* min-height: 90px; */
                    }
                }
            }
        }
    }
    
</style>