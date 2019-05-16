export const LINES_CHART = {
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    title: {
      text: null
    }
  },
  yAxis: {
    visible: true,
    title: {
      text: 'Temperature (°C)'
    }
  },
  plotOptions: {
    line: {
      marker: {
        enabled: true,
        radius: 3,
        symbol: 'circle'
      },
      dataLabels: {
        enabled: false,
        style: {
          fontWeight: 'normal',
          textShadow: false,
          textOutline: false
        }
      }
    }
  },
  legend: {
    itemStyle: {
      fontFamily: 'Open Sans, Helvetica',
      fontWeight: 'normal'
    }
  },
  resize: true,
  series: [
    {
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    },
    {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    },
    {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    },
    {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    },
    {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }
  ],
  exporting: {
    enabled: true
  }
};
