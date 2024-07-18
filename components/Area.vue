<script setup lang="ts">
import { TYPE } from "~/assets/js/enum";
import type { AreaModel } from '~/models/data/ElectionModel';
import debounce from 'lodash/debounce';

type Props = {
    id: string;
    type: string;
    code: string;
    list: AreaModel[];
    isPending: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    id: '4d83db17c1707e3defae5dc4d4e9c800',
    type: 'C',
    code: '00_000_00_000_0000',
    list: () => ([]),
    isPending: false,
});

// composables
const { 
    setSelectedCity,
    setSelectedDist,
    setSelectedVli,
} = useSelectArea();


const disabled: Ref<boolean> = ref(false);
const selected = ref('please select...');
const selectedArea: Ref<AreaModel> = ref({});

watch( 
    () => props.list,
    (list) => {
        if(props.type === TYPE.CITY && list.length > 0) {
            selectedArea.value = list[0];
        }
    }
);

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
    const _options = _select.querySelector('div.select__options');
    const _bg = _select.querySelector('div.bg');
    
    _options.classList.toggle('none');
    _select.classList.toggle('select--selected');
    _bg.classList.toggle('none');
}

const clickOption = (v: string) => {
    selected.value = v.area_name;
    selectedArea.value = v;
}

const clickBP = (ev: Event) => {
    const _bg: EventTarget = ev.currentTarget!;
    const _options = _bg.parentNode.childNodes[1];
    
    ev.stopPropagation()
    _bg.classList.toggle('none');
    _options.classList.toggle('none');
}

watch( selectedArea, async() => {
    const {...params} = selectedArea.value;
    
    switch (props.type) {
        case TYPE.CITY:
            setSelectedCity(selectedArea.value, params.prv_code, params.city_code,params.area_code);
            break;
            
        case TYPE.DISC:
            setSelectedDist(selectedArea.value, params.dept_code);
            break;

        case TYPE.VLI:
            setSelectedVli(selectedArea.value, params.li_code);
            break;

        default:
            break;
    }
});
</script>

<template>
    <div class="Area">
        <!-- <p>{{ selected }}</p>
        <div class="select" 
            @click="clickSelect($event)"
            :class="list.length ? '' : 'disabled'">
            <div v-show="!isPending" class="selected">{{ list ? selectedArea.area_name : '--' }}</div>        
            <div class="select__options none">
                <div class="options__option" 
                    v-for="item in list" 
                    @click="clickOption(item)"
                    :value="item">
                    {{ item.area_name }}
                </div>
            </div>
            <div class="bg none" @click="clickBP($event)"></div>
        </div> -->
        <div v-show="isPending">loading...</div>
        <!-- BUG: No default value neither PINIA -->
        <select @change="cooldownArea" :disabled="disabled" v-model="selectedArea">
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
.select {
    border: 1px solid $white-button-hover;
    border-radius: 8px;
    background-color: $white;
    cursor: pointer;
    height: 35px;
    min-width: 9em;
    position: relative;

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

    &::after {
        position: absolute;
        content: '';
        width: 24px;
        height: 24px;
        /* background-image: url(@/assets/png/chevron-right-solid.svg); */
        /* background-repeat: no-repeat;
        background-position: center; */
        background-size: 16px;
        rotate: 90deg;
        right: 0.4em;
        top: 0.4em;
    }

    &.disabled {
        background-color: $white-button-hover;
        cursor: not-allowed;

        > .selected {
            color: $white-dark;
        }

        &::after {
            opacity: 10%;
        }
    }

    > select {
        display: none;
    }

    > .selected {
        position: absolute;
        top: 0;
        left: 0;
        padding: .2em .5em;
    }

    > .none {
        display: none;
    }
    > .select__options {
        border: 1px solid $blue;
        background-color: $white;
        border-radius: 8px;
        position: absolute;
        top: 40px;
        width: 100%;
        overflow-y: scroll;
        z-index: 10;
        max-height: calc(100vh - 300px);

        .options__option {
            padding: .3em;

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
    }
}
</style>
