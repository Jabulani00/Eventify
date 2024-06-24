import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-history-eventify',
  templateUrl: './history-eventify.page.html',
  styleUrls: ['./history-eventify.page.scss'],
})
export class HistoryEventifyPage implements OnInit {
  @ViewChild('eventChart') eventChart: any;
  @ViewChild('userChart') userChart: any;

  eventChartConfig: ChartData = {
    labels: ['Total', 'Cancelled', 'Went Well'],
    datasets: [{
      data: [100, 10, 80],
      backgroundColor: ['#044a42', '#FF6384', '#36A2EB'],
    }]
  };

  userChartConfig: ChartData = {
    labels: ['Register', 'Active', 'Pending', 'Suspended'],
    datasets: [{
      label: 'Users',
      data: [200, 150, 30, 20],
      backgroundColor: '#044a42',
    }]
  };

  eventStats: any = {
    attendanceRecords: {
      biggest: 500,
      smallest: 10,
      virtual: 60,
      physical: 40
    },
    locations: ['New York', 'San Francisco', 'Los Angeles'],
    donations: 20000
  };

  userStats: any = {
    roles: {
      attendee: 120,
      host: 50,
      admin: 30
    }
  };

  constructor() { }

  ngOnInit() { }

  ionViewDidEnter() {
    setTimeout(() => {
      this.createCharts();
    }, 150);
  }

  createCharts() {
    this.createEventChart();
    this.createUserChart();
  }

  createEventChart() {
    new Chart(this.eventChart.nativeElement, {
      type: 'doughnut',
      data: this.eventChartConfig,
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Event Statistics', color: '#044a42', font: { size: 16, weight: 'bold' } },
          datalabels: {
            color: '#ffffff',
            formatter: (value: number, ctx: any) => {
              const dataArr = ctx.chart.data.datasets[0].data as number[];
              const sum = dataArr.reduce((a, b) => a + b, 0);
              return ((value * 100) / sum).toFixed(0) + "%";
            },
          }
        }
      }
    } as ChartConfiguration);
  }

  createUserChart() {
    new Chart(this.userChart.nativeElement, {
      type: 'bar',
      data: this.userChartConfig,
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'User Statistics', color: '#044a42', font: { size: 16, weight: 'bold' } },
          datalabels: {
            color: '#ffffff',
            align: 'end',
            anchor: 'end',
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    } as ChartConfiguration);
  }
}
