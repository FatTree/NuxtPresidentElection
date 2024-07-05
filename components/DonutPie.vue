<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend);

// 父元件傳來的值
const props = defineProps({
    // 圖表屬性
    // 當前可設置：bar、bubble、doughnut、pie、line、polar-area、radar、scatter
    chartType: {
        type:[String],
        default: 'pie'
    },
    data: {
        type: [Array],
        default: () => []
    },
    // data未設定backgrong時的預設值
    defaultBackground:{
        type:[String],
        default: '#E46651'
    },
    borderColor:{
        type:[String],
        default: ''
    },
    // 圖表的options設置
    chartOptions:{
        type:[Object],
        default:()=>{}
    }
})

// composables
const {getLabels, getBackground, getData} = useChartData();

// 圖標資料設置
const chartData = ref({});

chartData.value = {
    labels: getLabels(props.data)? getLabels(props.data) : [],
    datasets:[
        {
            backgroundColor: getBackground(props.data, props.defaultBackground),
            borderColor: props.borderColor ? props.borderColor : 'transparent',
            data: getData(props.data),
        }
    ]
}

watch(chartData, (v) => {
    console.log('chamge~~~!!@@', v);
    Object.assign(chartData, props.data);
}, {immediate: true, deep: true})
// 預設的options
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false
})

// 父元件如果有設定options，將新得更新至當前的options內
if(props.chartOptions){
    Object.assign(chartOptions, props.chartOptions);
}
</script>

<template>
    <div class="pie">
        <Doughnut 
            :data="chartData"
            :options="chartOptions" />
    </div>
</template>

