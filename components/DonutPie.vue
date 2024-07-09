<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend);

type _Data = {
    labels: String[],
    datasets:[
        {
            backgroundColor: String[],
            borderColor: String,
            data: Number[],
        }
    ]
}

// 父元件傳來的值
const props = defineProps({
    chartType: {
        type:[String],
        default: 'doughnut',
    },
    data: {
        type: [Object],
        default: () => []
    },
    defaultBackground:{
        type:[String],
        default: '#E46651'
    },
    borderColor:{
        type:[String],
        default: ''
    },
    chartOptions:{
        type:[Object],
        default:()=>{}
    }
})

// composables
const { getLabels, getBackground, getData } = useChartData();

const ChartData = computed(() => {
    return {
        labels: getLabels(props.data)? getLabels(props.data) : [],
        datasets:[
            {
                backgroundColor: getBackground(props.data, props.defaultBackground),
                borderColor: props.borderColor ? props.borderColor : 'transparent',
                data: getData(props.data),
            }
        ]
    }
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false
})

if(props.chartOptions){
    Object.assign(chartOptions, props.chartOptions);
}
</script>

<template>
    <div class="pie">
        <Doughnut 
            :data="ChartData"
            :options="chartOptions" />
    </div>
</template>

