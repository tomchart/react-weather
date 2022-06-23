import { useContext, useMemo } from "react";
import { WeatherContext } from "../context/WeatherContext.js";
import ReactECharts from 'echarts-for-react'; 

function WeatherForecast () {
  const { 
    results,
  } = useContext(WeatherContext);

  function stripFutureHourObjects() {
    var futureHourObjects = [];
    results.days.map(days => {
      console.log(days);
      // filter only hours in the future that are divisible by 3 (for fewer points on graph)
      // datetimes are a string so doing some ropey substringing but we move
      days.hours.filter(hour => hour.datetimeEpoch > results.currentConditions.datetimeEpoch && hour.datetime.substring(0, 2) % 3 === 0).map(hour => {
        futureHourObjects.push(hour);
      })
    })
    return futureHourObjects;
  }

  function stripFutureHourDatetimes() {
    var hourDatetimes = [];
    futureHours.map(hour => {
      hourDatetimes.push(hour.datetime.substring(0, hour.datetime.length - 3));
    })
    return hourDatetimes;
  }

  function stripFutureHourTemps() {
    var hourTemps = [];
    futureHours.map(hour => {
      hourTemps.push(hour.temp);
    })
    return hourTemps;
  }

  const futureHours = useMemo(stripFutureHourObjects, [results]);
  const futureHourDatetimes = useMemo(stripFutureHourDatetimes, [futureHours]);
  const futureHourTemps = useMemo(stripFutureHourTemps, [futureHours]);

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

export default WeatherForecast
