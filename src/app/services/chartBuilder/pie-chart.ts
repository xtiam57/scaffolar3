export const PIE_CHART = {
  chart: {
    type: 'pie'
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    squareSymbol: false,
    symbolHeight: 12,
    symbolWidth: 40,
    symbolRadius: 0,
    itemMarginBottom: 3,
    labelFormatter: function () {
      return `${this.name}: <strong>${this.y}</strong> (${Math.round(this.percentage * 100) / 100}%)`;
    },
    itemStyle: {
      fontFamily: 'Open Sans, Helvetica',
      fontWeight: 'normal'
    }
  },
  plotOptions: {
    pie: {
      shadow: false,
      size: '100%',
      showInLegend: true,
      center: ['50%', '50%'],
      dataLabels: {
        enabled: false,
        distance: -35,
        allowOverlap: true,
        formatter: function () {
          return `<strong>${this.y}</strong><br> (${Math.round(this.percentage * 100) / 100}%)`;
        },
        style: {
          fontWeight: 'normal',
          color: '#fff',
          textShadow: false,
          textOutline: false
        }
      }
    }
  },
  resize: true,
  series: [
    {
      name: 'Downloads',
      data: [
        {
          name: 'Firefox',
          y: 20
        },
        {
          name: 'IE',
          y: 20
        },
        {
          name: 'Chrome',
          y: 30
        },
        {
          name: 'Safari',
          y: 14.67
        },
        {
          name: 'Opera',
          y: 13.91
        },
        {
          name: 'Proprietary',
          y: 5
        }
      ]
    }
  ],
  exporting: {
    enabled: true
  }
};
