import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext.js";
import ReactECharts from 'echarts-for-react'; 

function WeatherChart () {
  const { 
    futureHourDatetimes,
    futureHourTemps,
  } = useContext(WeatherContext);

  const options = {
    grid: { show: false },
    color: ['#ffd500'],
    xAxis: {
      name: 'Time',
      nameLocation: 'center',
      nameTextStyle: {
        padding: [12, 0, 0, 0]
      },
      type: 'category',
      data: futureHourDatetimes,
      boundaryGap: false,
    },
    yAxis: {
      show: false,
      type: 'value',
      name: 'Temperature (C°)',
      nameTextStyle: {
        padding: [6, 0, 0, 0]
      },
      min: (value) => {
        return Math.round(value.min) - 2;
      },
      interval: 1,
      axisLine: {
        show: false,
      },
    },
    series: [
      {
        data: futureHourTemps,
        symbol: 'circle',
        symbolSize: 8,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#ffab00',
        },
        label: {
          show: true,
          formatter: '{@score}',
          textBorderWidth: 0,
          color: '#FFFFFF',
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <div className="w-1/2">
      { futureHourDatetimes && futureHourTemps && (
        <ReactECharts option={options} />
      )}
    </div>
  )
}

export default WeatherChart
