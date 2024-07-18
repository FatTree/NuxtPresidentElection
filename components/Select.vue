<script lang="ts" setup>
type Props = {
    optionList: Array<string>,
}
const props = withDefaults(defineProps<Props>(), {
    optionList: () => (['aaa', 'ddd', 'dsaf']),
});

const selected = ref('please select...');
const selectedArea: Ref<AreaModel> = ref(props.optionList[0]);

const clickSelect = () => {
    if (!props.optionList.length) return;
    const options = document.getElementsByClassName('select__options')[0];
    const selects = document.getElementsByClassName('select')[0];
    options.classList.toggle('none');
    selects.classList.toggle('select--selected');
}

const clickOption = (v: string) => {
    selected.value = v.area_name;
    selectedArea.value = v;
}

watch( selectedArea, async() => {
    const {...params} = selectedArea.value;
    selected.value = params.area_name;
    
    switch (props.type) {
        case TYPE.CITY:
            setSelectedCity(params.prv_code, params.city_code, params.area_code);
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
<div class="select" 
    @click="clickSelect"
    :class="optionList.length ? '' : 'disabled'">
    <div class="selected">{{ selected }}</div>
    <div class="select__options none">
        <div class="options__option" 
            @click="clickOption(t)"
            v-for="t in optionList" 
            :value="t">{{ t.area_name }}</div>
    </div>
    <!-- <select v-model="selected">
        <option value="0">Select car:</option>
        <option v-for="t in optionList" :value="t">{{ t }}</option>
    </select> -->
</div>
</template>


<style lang="scss" scoped>
.select {
    border: 1px solid $white-button-hover;
    border-radius: 8px;
    background-color: $white;
    cursor: pointer;
    height: 36px;
    position: relative;

    &~.disabled {
        background-color: $white-dark;
        cursor: not-allowed;
    }

    &--selected {
        border: 1px solid $blue;
    }

    &::after {
        position: absolute;
        content: '';
        width: 24px;
        height: 24px;
        /* background-image: url(/_nuxt/assets/png/right-arrow.png); */
        /* background-repeat: no-repeat;
        background-position: center; */
        background-size: 16px;
        rotate: 90deg;
        right: 0.4em;
        top: 0.4em;
    }

    > select {
        display: none;
    }

    > .selected {
        position: absolute;
        top: 0;
        left: 0;
        padding: .3em;
    }

    > .select__options.none {
        display: none;
    }
    > .select__options {
        border: 1px solid $blue;
        background-color: $white;
        border-radius: 8px;
        position: absolute;
        top: 40px;
        width: 100%;
        overflow: hidden;

        .options__option {
            padding: .3em;

            &:hover {
                background-color: $white-button-hover;
            }
        }
    }
}

</style>