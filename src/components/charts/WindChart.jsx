import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext.js";
import ReactECharts from 'echarts-for-react'; 

function WindChart () {
  const { 
    futureHours,
  } = useContext(WeatherContext);

  // from https://stackoverflow.com/a/25867068/17973844 - thanks Matt Frear!
  function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }

  const options = {
    grid: { show: false },
    color: ['#a6adba'],
    xAxis: {
      name: 'Time',
      nameLocation: 'center',
      axisLabel: {
        formatter: function (value) {
          return value.substring(11, value.length - 3)
        },
      },
      nameTextStyle: {
        padding: [12, 0, 0, 0]
      },
      type: 'category',
      boundaryGap: false,
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
        symbol: 'arrow',
        symbolRotate: (value) => {
          return -value.winddir;
        },
        dimensions: ["cloudcover", "conditions", "date", "datetime", "datetimeEpoch", "dew", "feelslike", "humidity", "icon", "precip", "precipprob", "preciptype", "pressure", "severerisk", "snow", "snowdepth", "solarenergy", "solarradiation", "source", "stations", "temp", "time", "uvindex", "visibility", "winddir", "windgust", "windspeed"],
        encode: {
          x: "datetime", 
          y: "windspeed",
        },
        symbolSize: 16,
        type: 'line',
        lineStyle: {
          color: '#4b5563',
        },
        label: {
          show: true,
          formatter: '{@windspeed}',
          textBorderWidth: 0,
          color: '#FFFFFF',
          position: 'top'
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        return `${params[0].value.datetime}<br />Wind speed: ${params[0].value.windspeed}mph<br />Wind direction: ${params[0].value.winddir}° ${degToCompass(params[0].value.winddir)}`;
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

export default WindChart
