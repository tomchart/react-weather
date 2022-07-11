import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext.js";
import ReactECharts from 'echarts-for-react'; 

function PrecipChart () {
  const { 
    futureHourDatetimes,
    futureHourPrecip,
  } = useContext(WeatherContext);

  const options = {
    grid: { show: false },
    color: ['#6E85B7'],
    xAxis: {
      name: 'Time',
      nameLocation: 'center',
      nameTextStyle: {
        padding: [12, 0, 0, 0]
      },
      type: 'category',
      data: futureHourDatetimes,
    },
    yAxis: {
      show: false,
      type: 'value',
      name: 'Precipitation (%)',
      nameTextStyle: {
        padding: [6, 0, 0, 0]
      },
      interval: 1,
      axisLine: {
        show: false,
      },
    },
    series: [
      {
        data: futureHourPrecip,
        symbol: 'circle',
        symbolSize: 8,
        type: 'bar',
        barCategoryGap: '0%',
        areaStyle: {
          color: '#6E85B7',
        },
        label: {
          show: true,
          formatter: '{@score}',
          textBorderWidth: 0,
          color: '#FFFFFF',
          position: 'top'
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <div className="w-1/2">
      { futureHourDatetimes && futureHourPrecip && (
        <ReactECharts option={options} />
      )}
    </div>
  )
}

export default PrecipChart
