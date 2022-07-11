import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext.js";
import ReactECharts from 'echarts-for-react'; 

function TempChart () {
  const { 
    futureHours,
  } = useContext(WeatherContext);

  console.log(futureHours);

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
        dimensions: ["conditions", "date", "datetime", "datetimeEpoch", "dew", "feelslike", "humidity", "icon", "precip", "precipprob", "preciptype", "pressure", "severerisk", "snow", "snowdepth", "solarenergy", "solarradiation", "source", "stations", "temp", "time", "uvindex", "visibility", "winddir", "windgust", "windspeed"],
        encode: {
          x: "datetime", 
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
      { futureHours && (
        <ReactECharts option={options} />
      )}
    </div>
  )
}

export default TempChart
