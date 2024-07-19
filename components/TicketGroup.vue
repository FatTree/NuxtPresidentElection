<script lang="ts" setup>
import { useTicket } from '#imports';
import InfoIcon from '~/components/Icons/InfoIcon.vue';

// store
const ticketStore = useTicket();
const {
    isCityTicketPending,
    isDistTicketPending,
    isVliTicketPending,
    cityTicketList,
    distTicketList,
    vliTicketList
} = storeToRefs(ticketStore);

const profileStore = useProfile();
const {
    isCurrentProfilePending,
    currentProfile,
} = storeToRefs(profileStore);

</script>
<template>
    <div class="TicketGroup">
        <div class="TicketGroup__default" v-if="cityTicketList.length===0">
            <div class="TicketGroup__default__hint">
                <p class="title">
                    <InfoIcon size="20" color="black" />
                    {{ $t('hint.hint') }}
                </p>
                <p class="content">{{ $t('hint.hint1') }}</p>
            </div>
            <div class="TicketGroup__default__hint">
                <p class="title">
                    <InfoIcon size="20" color="black" />
                    {{ $t('hint.hint') }}
                </p>
                <p class="content">{{ $t('hint.hint2') }}</p>
            </div>
        </div>
        <Ticket
            v-if="cityTicketList"
            :ticketList="cityTicketList"
            :isPending="isCityTicketPending" />
        <Ticket
            v-if="distTicketList"
            :ticketList="distTicketList"
            :isPending="isDistTicketPending" />
        <Ticket
            v-if="vliTicketList"
            :ticketList="vliTicketList"
            :isPending="isVliTicketPending" />
    </div>
</template>
<style lang="scss" scoped>
    .TicketGroup {
        /* border: 1px solid blueviolet */
        @include pad {
            display: flex;
            overflow-y: scroll;
        }
        &__default {
            @include pad {
                display: flex;
            }
        }

        &__default__hint {
            width: 240px;
            padding: 1em 0;
            background-color: $black-light;
            padding: 1em;
            border-radius: 1em;
            &:first-child {
                margin-bottom: 1em;
            }

            @include pad {
                &:first-child {
                    margin-bottom: 0;
                    margin-right: 1em;
                }
            }

            >.title {
                @include title-l;
                display: flex;
                > svg {
                    margin-right: .5em;
                }
            }
            >.content {
                margin-top: 1em;
                @include text-m;
            }
        }

        > .Ticket {
            &:not(:first-child) {
                margin-top: 1em;
            }
            @include pad {
                margin-top: 0 !important;
            }
        }
    }
</style>