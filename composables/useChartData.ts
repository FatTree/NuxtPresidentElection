export const useChartData = () => {
    const getLabels = (chartData) => {
        const labels = chartData.map((v) => v.label);
        return labels;
    };

    const getBackground = (chartData, defaultBackground) => {
        const background = chartData.map((v) => v.backgroundColor !== undefined ? v.backgroundColor : defaultBackground);
        return background;
    };

    const getData = (chartData) => {
        const data = chartData.map((v) => v.data);
        return data;
    };

    return {
        getLabels,
        getBackground,
        getData
    };
}