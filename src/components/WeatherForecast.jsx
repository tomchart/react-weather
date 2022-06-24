import { useContext, useMemo } from "react";
import { WeatherContext } from "../context/WeatherContext.js";
import ReactECharts from 'echarts-for-react'; 
import { differenceInDays, differenceInHours } from 'date-fns';

function WeatherForecast () {
  const { 
    results,
  } = useContext(WeatherContext);

  function filterFutureHours(dayObject) {
    var currentDateTime = new Date(results.days[0].datetime + ' ' + results.currentConditions.datetime);
    var dayObjectDate = new Date(dayObject.datetime);
    var dayDifference = differenceInDays(currentDateTime, dayObjectDate);

    var futureHours = [];
    if (dayDifference <= 1 && dayDifference >= 0) {
      dayObject.hours.map(hourObject => {
        var hourObjectDatetime = new Date(dayObject.datetime + ' ' + hourObject.datetime);
        var hourDifference = differenceInHours(currentDateTime, hourObjectDatetime);
        
        // if less than a day in the future and hour like HH % 3 = 0 then store for display to user
        if (hourDifference <= 24 && hourObject.datetime.substring(0, 2) % 3 === 0) {
          futureHours.push(hourObject);
        };
      });
    };
    return futureHours;
  }

  function stripFutureHourObjects() {
    var futureHourObjectArrays = [];
    results.days.map(day => {
      // pass all dayObjects received to filterFutureHours
      futureHourObjectArrays.push(filterFutureHours(day));
    });
    // flatten array of objects returned by filterFutureHours
    var futureHourObjects = [].concat(...futureHourObjectArrays);
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
