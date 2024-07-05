type _ChartData = {
    label: string,
    backgroundColor: string,
    data: [],
};


export const useChartData = () => {

    const getLabels = (chartData: _ChartData[])=> {
        const labels: string[] = chartData.map((v) => v.label);
        return labels;
    };
    

    const getBackground = (chartData: _ChartData[], defaultBackground: string) => {
        const background = chartData.map((v) => v.backgroundColor !== undefined ? v.backgroundColor : defaultBackground);
        return background;
    };

    const getData = (chartData: _ChartData[]) => {
        const data = chartData.map((v) => v.data);
        return data;
    };

    return {
        getLabels,
        getBackground,
        getData
    };
}