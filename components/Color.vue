<script setup lang="ts">
import type { colorTicketModel } from '~/models/view/ViewModel';
import debounce from 'lodash/debounce';

type Props = {
    title: string,
    colorList: colorTicketModel[],
    
}
const props = withDefaults(defineProps<Props>(), {
    title: 'red',
    colorList: () => ([]),
});

const hex2rgb = (hex: string) => {
    const rgbChar = ['r', 'g', 'b'];

    const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (normal) {
        return normal.slice(1).reduce((a, e, i) => { 
            a[rgbChar[i]] = parseInt(e, 16); 
            return a;
        }, {});
    }

    const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (shorthand) { 
        return shorthand.slice(1).reduce((a, e, i) => { 
            a[rgbChar[i]] = 0x11 * parseInt(e, 16); 
            return a;
        }, {});
    }

    return null;
}
const colorName = ref('');

type colorTicketRGBModel = colorTicketModel & {
    rgbCode: string,
}
const list: Ref<colorTicketRGBModel[]> = ref([]);
const listInit: Ref<colorTicketRGBModel[]> = ref([]);

const filterColor = () => {
    if(colorName.value.trim() === '') {
        list.value = listInit.value;
        return;
    }
    const _value = colorName.value;
    list.value = list.value.filter( (e) => {
        return e.color.indexOf(_value) !== -1 || e.name.indexOf(_value) !== -1
    });
}
const filterColorDebounce = debounce(filterColor, 500, { leading: true, trailing: true });

const copyVal = (_val: string) => {
    navigator.clipboard.writeText(_val);
}
const copyValDebounce = debounce(copyVal, 1000, { leading: true, trailing: true });

watch(colorName, filterColorDebounce);

watch( () => props.colorList, (_L) => {
    if(_L.length > 0) {
        if(_L.length === 0 || !_L.length) return;
        
        const _list =  props.colorList.map(item => {
            const _color = item.color;
            const _rgb = hex2rgb(item.color);
            let _res = '';
            if (!_rgb ) {
                console.log(`Invalid color code: ${_color}`);
            } else {
                _res = `rgb(${_rgb.r}, ${_rgb.g}, ${_rgb.b})`;
            }
            return { ...item, rgbCode: _res}
        });
        list.value = _list;
        listInit.value = _list;
    } 
}, {immediate: true});

</script>
<template>
    <div class="color">
        <h2 class="title">{{ title }}</h2>
        <input type="text" v-model="colorName" placeholder="party number/name" />
        <div class="colorList">
            <div class="colorGroup" 
                v-for="(item, i) in list" :key="i">
                <div class="colorTicket"
                    @click="copyValDebounce(`${item.name}`)"
                    :style="{backgroundColor: `${item.color}`}">
                </div>
                <div class="colorContent">
                    <p class="colorName"
                        @click="copyValDebounce(`${item.name}`)">
                        {{ item.name }}</p>
                    <p class="colorCode"
                        @click="copyValDebounce(`${item.color}`)">
                        {{ item.color }}</p>
                    <p class="colorCode"
                        @click="copyValDebounce(`${item.rgbCode}`)">
                        {{ item.rgbCode }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.color {
    > .title {
        font-size: 1em;
        font-weight: 500;
        margin: 1em 0 .5em;
    }
    > .colorList {
        display: flex;
        flex-wrap: wrap;
        max-height: 450px;
        overflow: scroll;
        margin-top: 1em;

        > .colorGroup {
            max-width: 160px;
            margin: 0 1em 2em 0;

            >.colorTicket {
                width: 160px;
                height: 56px;
                gap: 0px;
                border: 1px solid #E9EBF8;
                border-radius: 12px;
                cursor: pointer;
            }
            >.colorContent {
                >.colorName {
                    font-family: Inter;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 1.3em;
                    text-align: left;
                    color: #000000;
                    cursor: pointer;
                }
                > .colorCode {
                    font-size: 10px;
                    font-weight: 400;
                    line-height: 16px;
                    text-align: left;
                    color: #8E98A8;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>