<script setup lang="ts">
import type { ProfileModel, TicketGeneratedModel } from '~/models/data/ElectionModel';
import { TYPE } from '~/assets/js/enum';
import debounce from 'lodash/debounce';
import { useClear } from '#imports';
import RotateIcon from '~/components/Icons/RotateIcon.vue';

type Props = {
    id: string;
    code: string;
}
const props = withDefaults(defineProps<Props>(), {
    id: '4d83db17c1707e3defae5dc4d4e9c800',
    code: '00_000_00_000_0000',
});

// stores
const areaStore = useArea();
const {
    cityList,
    distList,
    vliList,
    isCityListPending,
    isDistListPending,
    isVliListPending,
} = storeToRefs(areaStore);

const { clear } = useClear();

const clearDebounce = debounce(clear, 1000, { leading: true, trailing: true });

</script>

<template>
    <div class="AreaGroup">
        <div class="box">
            <Area 
                :id="id" 
                :type="TYPE.CITY" 
                :code="code" 
                :list="cityList" 
                :isPending="isCityListPending" />
            <div class="box__buttom">
                <Area 
                    :id="id" 
                    :type="TYPE.DISC" 
                    :code="code" 
                    :list="distList" 
                    :isPending="isDistListPending" />
                <Area 
                    :id="id" 
                    :type="TYPE.VLI" 
                    :code="code" 
                    :list="vliList" 
                    :isPending="isVliListPending" />
            </div>
        </div>
        <div class="clear" @click="clearDebounce">
            <label>{{ $t('UI.btnClear') }}</label>
            <RotateIcon size="18" color="#fff" />
        </div>
        <!-- <div class="clear" @click="clearDebounce">
            <label>clear</label>
        </div> -->
    </div>
</template>

<style scoped lang="scss">
    .AreaGroup {
        display: flex;
        > .box { 
            display: flex;

            > .box__buttom { 
                display: flex;
            }
        }

        > .clear {
            display: flex;
            padding: .7em;
            border-radius: 8px;
            background-color: $blue-button-normal;
            > label {
                color: $white;
                @include text-m;
            }

            > svg {
                margin-left: .5em;
            }

            @include mobile {
                display: block;
                width: 2em;
                text-align: center;
                > label {
                    display: none;
                }

                > svg {
                    margin-left: 0;
                }
            }

            &:hover {
                background-color: $blue-button-hover;
            }

            &:active {
                background-color: $blue-button-click;
            }

            &:disabled {
                background-color: $blue-button-disabled;
                color: $white-darker;
            }
        }
        
        @include mobile {
            > .box { 
                display: block;

                > .box__buttom { 
                    display: flex;
                }
            }
        }

        
    }
</style>
