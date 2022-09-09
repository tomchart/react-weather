import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext.js";
import ReactECharts from 'echarts-for-react'; 

function PrecipChart () {
  const { 
    futureHours,
  } = useContext(WeatherContext);

  const options = {
    grid: { show: false },
    color: ['#6E85B7'],
    xAxis: {
      name: 'Time',
      nameLocation: 'center',
      formatter: '{@time}',
      nameTextStyle: {
        padding: [12, 0, 0, 0]
      },
      type: 'category',
    },
    yAxis: {
      show: false,
      type: 'value',
      interval: 1,
      axisLine: {
        show: false,
      },
    },
    dataset: {
      source: futureHours
    },
    series: [
      {
        encode: {
          x: "time", 
          y: "precipProb",
        },
        symbol: 'circle',
        symbolSize: 8,
        type: 'bar',
        barCategoryGap: '0%',
        areaStyle: {
          color: '#6E85B7',
        },
        label: {
          show: true,
          formatter: '{@precipProb}%',
          textBorderWidth: 0,
          color: '#FFFFFF',
          position: 'top'
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let value = params[0].value;
        return `${value.datetime}<br />Precipitation: ${value.precip}mm<br />Probability: ${value.precipProb}%<br />`;
      }
    },
  };

  return (
    <div className="w-1/2">
      { futureHours && (
        <ReactECharts option={options} />
      )}
    </div>
  )
}

export default PrecipChart
