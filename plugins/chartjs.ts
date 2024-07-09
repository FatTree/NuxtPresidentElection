import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    ArcElement,
    Filler,
    Title,
    Tooltip,
    Legend,
    type ChartData 
} from 'chart.js'
export default defineNuxtPlugin(() => {
    ChartJs.register(
        CategoryScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        RadialLinearScale,
        ArcElement,
        Filler,
        Title,
        Tooltip,
        Legend,
    )
})