<script lang="ts" setup>
import { interpolateMagma } from 'd3';
import debounce from 'lodash/debounce';
import type { PartyColorModel } from '~/models/data/ElectionModel';

const overallStore = useOverall();
const {
    OAColorTable
} = storeToRefs(overallStore);
const {
    getColor
} = overallStore;

const colorList: Ref<PartyColorModel[]> = ref([]);
const colorName = ref('');
const name = ref('');
const colorWhiteList = ref([
    { 
        name: "$white", 
        color: "#ffffff" 
    },
    { 
        name: "$white-light", 
        color: "#f5f5f5" 
    },
    { 
        name: "$white-dark", 
        color: "#BFBFBF" 
    },
    { 
        name: "$white-darker", 
        color: "#737373" 
    }
]);
const colorBlackList = ref([
    { 
        name: "$black", 
        color: "#000000" 
    },
    { 
        name: "$black-light", 
        color: "#E6E6E6" 
    }
]);
const colorBlueList = ref([
    { 
        name: "$blue", 
        color: "#262E49" 
    },
    { 
        name: "$blue-light", 
        color: "#525982" 
    },
    { 
        name: "$blue-dark", 
        color: "#171C2C" 
    },
]);

const colorBlueBtnList = ref([
    {
        name: "$blue-button-normal",
        color:"",
        var: "$blue"
    },
    {
        name: "$blue-button-hover",
        color:"",
        var: "$blue-light"
    },
    {
        name: "$blue-button-click",
        color:"",
        var: "$blue-dark"
    },
    {
        name: "$blue-button-disabled",
        color:"",
        var: "$white-dark"
    },
]);

const partyColorList = computed(() => {
    const _list = colorList.value;
    return _list.map( (e) => {
        return { color: `#${e.color_code}`, name: `${e.party_code}. ${e.party_name}`}
    });
});

onBeforeMount( async() => {
    await getColor();
    colorList.value = OAColorTable.value;
});

definePageMeta({
    layout: false,
});


</script>

<template>
<div class="UI">
    <div class="Nav">
        <h1>UI supplement</h1>
    </div>
    <div class="RWD content">
        <h3 class="title">RWD System</h3>
        max-width: 1600px
        <div class="RWD__pad">
            pad: @media(max-width: 1100px)
            <div class="RWD__mob">
                mobile: width @media(max-width:768px)
                <div class="RWD__mob__min">
                    min-width: 375px
                </div>
            </div>
        </div>
    </div>
    <div class="fontSystem content">
        <h3 class="title">Font System</h3>
        <div class="fontGroup">
            <div class="textList">
                <div class="text">
                    <h2 class="text__title">Title</h2>
                    <p class="title-l word">title-l</p>
                    <p class="title-m word">title-m</p>
                </div>
                <div class="text">
                    <h2 class="text__title">text</h2>
                    <p class="text-l word">text-l</p>
                    <p class="text-m word">text-m</p>
                    <p class="text-s word">text-s</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="colorTable content">
        <h3 class="title">Color System</h3>
        <div class="colorGroup">
            <Color title="White" :colorList="colorWhiteList" />
            <Color title="Black" :colorList="colorBlackList" />
            <Color title="Blue" :colorList="colorBlueList" />
            
        </div>
        <div class="colorGroup">
            <Color title="Party Color Table" :colorList="partyColorList" />
        </div>
    </div>
    
</div>
</template>
<style lang="scss" scoped>
.Nav {
    padding: 1em;
    background-color: $blue;
    color: $white;
}

.content {
    > .title {
        font-size: 1.5em;
        font-weight: 600;
        border-bottom: 1px solid black;
        padding: 1em 0 .5em;
    }
    margin-bottom: 2em;
    padding: 1em;
}
.RWD {
    display: block;

    &__mob {
        width:768px;
        background-color: $white-dark;

        &__min {
            background-color: $white-darker;
            width:375px;
        }
    }

    &__pad {
        width: 1100px;
        background-color: $blue-light;

        &__min {
            width: 769px;
        }
    } 
}
.colorTable {
    > .colorGroup {
        > .colorList {
            display: flex;
            flex-wrap: wrap;
            max-height: 30em;
            overflow-y: scroll;

            > .colorItem {
                width: 8em;
                cursor: pointer;
                margin: 0 2em 1em 0;

                > p {
                    height: 3em;
                }
        
                > .colorBox {
                    /* width: 5em; */
                    height: 3em;
                    border-radius: 1em;
                    margin-top: 0.5em;
                }
            }
        }
    }
}

.fontSystem {
    >.fontGroup {
        > .textList {
            display: flex;
            > .text {
                &:last-of-type {
                    margin-left: 2em;
                }
                .text__title {
                    font-size: 1.2em;
                    margin: .5em 0;
                }
                > .word {
                    margin-bottom: .5em;
                }
                > .text-blod { @include text-blod; }
                > .title-l { @include title-l; }
                > .title-m { @include title-m; }
                > .text { @include text; }
                > .text-l { @include text-l; }
                > .text-m { @include text-m; }
                > .text-s { @include text-s; }
            }
        }
    } 
}
</style>
