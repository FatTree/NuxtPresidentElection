<script setup lang="ts">
import type { ProfileModel, TicketGeneratedModel } from '~/models/data/ElectionModel';
import { TYPE } from '~/assets/js/enum';
import debounce from 'lodash/debounce';
import { useClear } from '#imports';

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
        <Area 
            :id="id" 
            :type="TYPE.CITY" 
            :code="code" 
            :list="cityList" 
            :isPending="isCityListPending" />
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
        <button @click="clearDebounce">clear</button>
    </div>
</template>

<style scoped lang="scss">
    .AreaGroup {
        border: 1px solid blueviolet;
        display: flex;
    }
</style>
