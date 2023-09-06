import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'line'>['data'] = {
    labels: [ '2017', '2018', '2019', '2020', '2021', '2022', '2023' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Courses' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Instructors' },
      // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Courses' }
    ]
  };

  public barChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: false,
  };

  constructor() {
  }
}
