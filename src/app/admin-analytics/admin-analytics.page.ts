import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
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
  @ViewChild('satisfactionChart') satisfactionChart: any;
  @ViewChild('trendChart') trendChart: any;

  attendanceData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Event Attendance',
      data: [650, 590, 800, 810, 560, 550],
      backgroundColor: 'rgba(4, 74, 66, 0.2)',
      borderColor: '#044a42',
      fill: true,
    }]
  };

  eventTypeData: ChartData = {
    labels: ['Conferences', 'Workshops', 'Seminars', 'Networking', 'Other'],
    datasets: [{
      data: [30, 25, 20, 15, 10],
      backgroundColor: ['#044a42', '#0a6960', '#10887e', '#16a79c', '#1cc6ba'],
    }]
  };

  satisfactionData: ChartData = {
    labels: ['Excellent', 'Good', 'Average', 'Poor'],
    datasets: [{
      data: [45, 30, 20, 5],
      backgroundColor: ['#044a42', '#0a6960', '#10887e', '#16a79c'],
    }]
  };

  trendData: ChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Registrations',
      data: [100, 120, 150, 180],
      borderColor: '#044a42',
      tension: 0.4,
    }]
  };

  topEvents = [
    { name: 'Tech Conference 2024', rating: 4.9, attendees: 1200 },
    { name: 'Leadership Summit', rating: 4.8, attendees: 800 },
    { name: 'Digital Marketing Workshop', rating: 4.7, attendees: 500 },
  ];

  constructor() { }

  ngOnInit() { }

  ionViewDidEnter() {
    setTimeout(() => {
      this.createCharts();
    }, 150);
  }

  createCharts() {
    this.createAttendanceChart();
    this.createEventTypeChart();
    this.createSatisfactionChart();
    this.createTrendChart();
  }

  createAttendanceChart() {
    new Chart(this.attendanceChart.nativeElement, {
      type: 'line',
      data: this.attendanceData,
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Monthly Event Attendance', color: '#044a42', font: { size: 16, weight: 'bold' } },
          legend: { display: false },
        },
        scales: {
          x: {
            type: 'category',
            display: true,
          },
          y: {
            type: 'linear',
            display: true,
            beginAtZero: true
          }
        }
      }
    } as ChartConfiguration);
  }

  createEventTypeChart() {
    new Chart(this.eventTypeChart.nativeElement, {
      type: 'doughnut',
      data: this.eventTypeData,
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Event Types', color: '#044a42', font: { size: 16, weight: 'bold' } },
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

  createSatisfactionChart() {
    new Chart(this.satisfactionChart.nativeElement, {
      type: 'pie',
      data: this.satisfactionData,
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Attendee Satisfaction', color: '#044a42', font: { size: 16, weight: 'bold' } },
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

  createTrendChart() {
    new Chart(this.trendChart.nativeElement, {
      type: 'line',
      data: this.trendData,
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Registration Trend', color: '#044a42', font: { size: 16, weight: 'bold' } },
          legend: { display: false },
        },
        scales: {
          x: {
            type: 'category',
            display: true,
          },
          y: {
            type: 'linear',
            display: true,
            beginAtZero: true
          }
        }
      }
    } as ChartConfiguration);
  }
}