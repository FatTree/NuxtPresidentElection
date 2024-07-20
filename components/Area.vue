<script setup lang="ts">
import { TYPE } from "~/assets/js/enum";
import type { AreaModel } from '~/models/data/ElectionModel';
import debounce from 'lodash/debounce';
import RightIcon from '~/components/Icons/RightIcon.vue';

type Props = {
    id: string;
    type: string;
    code: string;
    list: AreaModel[];
    isPending: boolean;
    selectedName: string;
}
const props = withDefaults(defineProps<Props>(), {
    id: '4d83db17c1707e3defae5dc4d4e9c800',
    type: 'C',
    code: '00_000_00_000_0000',
    list: () => ([]),
    isPending: false,
    selectedName: '--'
});

// composables
const { 
    setSelectedCity,
    setSelectedDist,
    setSelectedVli,
} = useSelectArea();

const areaStore = useArea();
const {
    selectedArea,
    selectedCity,
    selectedDist,
    selectedVli,
} = storeToRefs(areaStore);


const disabled: Ref<boolean> = ref(false);
const selected = ref('please select...');
const selectedA: Ref<AreaModel> = ref({} as AreaModel);

// const selectedName = computed(() => {
//     if (props.type === TYPE.CITY) {
//         return selectedCity.value;
//     } else if (props.type === TYPE.DIST) {
//         return selectedDist.value;
//     } else if (props.type === TYPE.VLI) {
//         return selectedVli.value;
//     }
//     return '';
// })

// watch( 
//     () => props.list,
//     (list) => {
//         if(props.type === TYPE.CITY && list.length > 0) {
//             selectedA.value = list[0];
//         }
//     }
// );

const cooldownArea = () => {
    disabled.value = true;
    setTimeout(function () {
        disabled.value = false;
    }, 1000);
}
// debounce(cooldownArea, 1000, { leading: true, trailing: true });

const clickSelect = (ev:Event) => {
    if (!props.list.length) return;
    const _select = ev.currentTarget;
    if (_select !== null) {
        const _options = _select.querySelector('div.select__options');
        const _bg = _select.querySelector('div.bg');
        _options.classList.toggle('none');
        _select.classList.toggle('select--selected');
        _bg.classList.toggle('none');
    }
}

const clickOption = (v: AreaModel) => {
    selectedA.value = v;
    if (props.type === TYPE.CITY) {
        selectedCity.value = v;
    } else if (props.type === TYPE.DISC) {
        selectedDist.value = v;
    } else if (props.type === TYPE.VLI) {
        selectedVli.value = v;
    }
}

const clickBP = (ev: Event) => {
    const _bg: EventTarget = ev.currentTarget!;
    const _options = _bg.parentNode.childNodes[1];
    const _select = document.querySelector('.select--selected');
    
    ev.stopPropagation()
    _bg.classList.toggle('none');
    _options.classList.toggle('none');
    if (_select) _select.classList.toggle('select--selected');
}

watch( selectedA, async() => {
    const {...params} = selectedA.value;
    selectedArea.value = selectedA.value;
    switch (props.type) {
        case TYPE.CITY:
            setSelectedCity(params.prv_code, params.city_code,params.area_code);
            break;
            
        case TYPE.DISC:
            setSelectedDist(params.dept_code);
            break;

        case TYPE.VLI:
            setSelectedVli(params.li_code);
            break;

        default:
            break;
    }
});
</script>

<template>
    <div class="Area">
        <div class="select" 
            @click="clickSelect($event)"
            :class="list.length ? '' : 'disabled'">
            <div class="selected">
                <label>{{ selectedName ? selectedName : '--' }}</label>
                <Loader v-show="isPending" size="1em" border="5px" />
                <RightIcon size="18" color="black" />
            </div>        
            <div class="select__options none">
                <div class="options__option" 
                    v-for="item in list" 
                    @click="clickOption(item)"
                    :value="item">
                    {{ item.area_name }}
                </div>
            </div>
            <div class="bg none" @click="clickBP($event)"></div>
        </div>
        <!-- BUG: No default value neither PINIA -->
        <select @change="cooldownArea" :disabled="disabled" v-model="selectedA">
            <option selected value="">--</option>
            <option 
                v-for="(item, i) in list"
                :key="i" 
                :value="item">
                {{ item.area_name }}: {{ item.prv_code }}-{{  item.city_code }}-{{ item.area_code }}-{{ item.dept_code }}-{{ item.li_code }}
            </option>
        </select>
    </div>
</template>

<style scoped lang="scss">
.Area {
    position: relative;
    width: 100%;

    > select {
        display: none;
    }
}
.select {
    border: 1px solid $white-button-hover;
    border-radius: 8px;
    background-color: $white;
    cursor: pointer;
    height: 35px;
    min-width: 9em;
    /* position: relative; */

    &:not(:last-child) {
        margin-right: 1em;
    }
    
    @include mobile {
        &:first-child {
            margin-right: 0;
        }
    }

    &--selected {
        border: 1px solid $blue;
    }

    &.disabled {
        background-color: $white-button-hover;
        cursor: not-allowed;

        > .selected {
            color: $white-dark;

            > svg {
                fill: $white-dark;
            }
        }

        &::after {
            opacity: 10%;
        }
    }

    > .selected {
        /* position: absolute;
        top: 0;
        left: 0; */
        display: flex;
        justify-content: space-between;
        padding: .5em;
        > svg {
            rotate: 90deg;
        }
    }

    > .none {
        display: none;
    }
    > .select__options {
        border: 1px solid $blue;
        background-color: $white;
        border-radius: 8px;
        position: absolute;
        top: 2.5em;
        width: calc(100% - 1em);
        overflow-y: scroll;
        z-index: 10;
        max-height: calc(100vh - 300px);

        @include pad {
            width: 100%;
        }

        .options__option {
            padding: .3em;
            @include pad {
                width: auto;
            }
            @include mobile {
                padding: .5em;
                width: auto;
            }

            &:hover {
                background-color: $white-button-hover;
            }
        }
    }
    > .bg {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: $white;
        opacity: 0;
        z-index: 5;
    }
}
</style>
