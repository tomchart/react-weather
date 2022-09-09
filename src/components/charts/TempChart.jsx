import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext.js";
import ReactECharts from 'echarts-for-react'; 

function TempChart () {
  const { 
    futureHours,
  } = useContext(WeatherContext);

  const options = {
    grid: { show: false },
    color: ['#ffd500'],
    xAxis: {
      name: 'Time',
      nameLocation: 'center',
      formatter: '{@time}',
      nameTextStyle: {
        padding: [12, 0, 0, 0]
      },
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      show: false,
      type: 'value',
      min: (value) => {
        return Math.round(value.min) - 2;
      },
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
          y: "temp",
        },
        symbol: 'circle',
        symbolSize: 8,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: '#ffab00',
        },
        label: {
          show: true,
          formatter: '{@temp}',
          textBorderWidth: 0,
          color: '#FFFFFF',
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let value = params[0].value;
        return `${value.datetime}<br />Temperature: ${value.temp}°<br />Feels like: ${value.feelsLike}°<br />Humidity: ${value.humidity}%<br />Pressure: ${value.pressure} hPa<br />UV Index: ${value.uvIndex}`;
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

export default TempChart
