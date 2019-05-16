export const COLUMNS_CHART = {
  chart: {
    type: 'column'
  },
  xAxis: {
    crosshair: true,
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    // tickAmount: 5,
    tickInterval: null,
    visible: true,
    title: {
      text: null
    }
  },
  plotOptions: {
    column: {
      pointPadding: 0.1,
      groupPadding: 0.05,
      dataLabels: {
        enabled: true,
        format: '{point.y:,.2f}',
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
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    },
    {
      name: 'Manufacturing',
      data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
    },
    {
      name: 'Sales & Distribution',
      data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    },
    {
      name: 'Project Development',
      data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    }
  ],
  exporting: {
    enabled: true
  }
};
