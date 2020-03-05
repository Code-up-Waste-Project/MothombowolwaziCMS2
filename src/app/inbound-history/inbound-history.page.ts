import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart} from 'chart.js';

@Component({
  selector: 'app-inbound-history',
  templateUrl: './inbound-history.page.html',
  styleUrls: ['./inbound-history.page.scss'],
})
export class InboundHistoryPage implements OnInit {
  @ViewChild('barChart', {static: false}) barChart; 

  colorArray: any;
  bars: any;
  constructor() { }
  ionViewDidEnter() {
    this.createLineChart();
  }

  ngOnInit() {
  }


  //creating a chart
  createLineChart() {
    Chart.defaults.global.defaultFontSize = 15;
    Chart.defaults.global.defaultFontFamily = 'Roboto';
    this.bars= new Chart(this.barChart.nativeElement, {
   
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Material Sold',
          data: ['Jan', 'Jan', 'Jan', 'Jan', 'Jan', 
          'Jan', 'Jan', 'Jan', 'Jan','Jan',
          'Jan', 'Jan'],
          backgroundColor: '#ffd7e9', // array should have same number of elements as number of dataset
          borderColor: '#ffd7e9',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
