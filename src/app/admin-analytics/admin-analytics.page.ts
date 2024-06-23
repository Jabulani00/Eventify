import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.page.html',
  styleUrls: ['./admin-analytics.page.scss'],
})
export class AdminAnalyticsPage implements OnInit {
  @ViewChild('attendanceChart') attendanceChart: any;
  @ViewChild('eventTypeChart') eventTypeChart: any;

  attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Event Attendance',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: '#044a42',
      borderColor: '#044a42',
    }]
  };

  eventTypeData = {
    labels: ['Conferences', 'Workshops', 'Seminars', 'Networking', 'Other'],
    datasets: [{
      data: [30, 25, 20, 15, 10],
      backgroundColor: ['#044a42', '#0a6960', '#10887e', '#16a79c', '#1cc6ba'],
    }]
  };

  constructor() { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.createAttendanceChart();
    this.createEventTypeChart();
  }

  createAttendanceChart() {
    new Chart(this.attendanceChart.nativeElement, {
      type: 'line',
      data: this.attendanceData,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Event Attendance',
            color: '#044a42',
            font: { size: 18, weight: 'bold' }
          },
          datalabels: {
            color: '#044a42',
            anchor: 'end',
            align: 'top',
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  createEventTypeChart() {
    new Chart(this.eventTypeChart.nativeElement, {
      type: 'doughnut',
      data: this.eventTypeData,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Event Types Distribution',
            color: '#044a42',
            font: { size: 18, weight: 'bold' }
          },
          datalabels: {
            color: '#ffffff',
            formatter: (value: number, ctx) => {
              const dataArr = ctx.chart.data.datasets[0].data as number[];
              const sum = dataArr.reduce((a, b) => a + b, 0);
              const percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
          }
        }
      }
    });
  }
}