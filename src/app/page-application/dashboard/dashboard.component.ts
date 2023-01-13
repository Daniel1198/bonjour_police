import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  highcharts = Highcharts;
  chartOptionsPie: Highcharts.Options = {
    chart: {
        type: 'pie',
        plotShadow: false
    },
    title: {
        text: 'Statistiques par nationalité',
        style: {
          fontFamily: 'sans-serif',
          fontSize: '20'
        }
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    tooltip: {
        pointFormat: '{series.name} : <b>{ point.percentage:1.f } % </b>',
    },
    plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b> : { point.percentage:1.f } %'
          }
        }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      type: 'pie',
      data: [{
          name: 'Chrome',
          y: 70.67,
          selected: true,
          sliced: true
      }, {
          name: 'Edge',
          y: 14.77
      },  {
          name: 'Firefox',
          y: 4.86
      }, {
          name: 'Safari',
          y: 2.63
      }, {
          name: 'Internet Explorer',
          y: 1.53
      },  {
          name: 'Opera',
          y: 1.40
      }, {
          name: 'Sogou Explorer',
          y: 0.84
      }, {
          name: 'QQ',
          y: 0.51
      }, {
          name: 'Other',
          y: 2.6
      }]
  }]
  };

  categories = [
    '0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-40', '40-45',
    '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'
  ];

  chartOptionsPyramid: Highcharts.Options = {
      chart: {
        type: 'bar'
    },
    title: {
        text: 'Pyramide des âges',
        style: {
          fontFamily: 'sans-serif',
          fontSize: '20'
        }
    },
    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
        }
    },
    xAxis: [{
        categories: this.categories,
        reversed: false,
        labels: {
            step: 1
        },
        accessibility: {
            description: 'Age (male)'
        }
    }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: this.categories,
        linkedTo: 0,
        labels: {
            step: 1
        },
        accessibility: {
            description: 'Age (female)'
        }
    }],
    yAxis: {
        title: {
            text: null
        },
        labels: {
            formatter: function () {
                return Math.abs(5) + '%';
            }
        },
        accessibility: {
            description: 'Percentage population',
            rangeDescription: 'Range: 0 to 5%'
        }
    },

    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                'Population: ' + Highcharts.numberFormat(Math.abs(3), 1) + '%';
        }
    },

    series: [{
        name: 'Homme',
        type: 'bar',
        data: [
            -8.98, -7.52, -6.65, -5.72, -4.85,
            -3.71, -2.76, -2.07, -1.70, -1.47,
            -1.22, -0.99, -0.81, -0.62, -0.41,
            -0.23, -0.15
        ]
    }, {
        name: 'Femme',
        type: 'bar',
        data: [
            8.84, 7.42, 6.57, 5.68, 4.83,
            3.74, 2.80, 2.14, 1.79, 1.59,
            1.34, 1.06, 0.83, 0.63, 0.43,
            0.25, 0.19
        ]
    }]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
