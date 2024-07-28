import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  @ViewChild('eventModal') eventModal!: IonModal;

  currentYear: number = 2024;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  events: any[] = [
    {
      date: '2024-03-15',
      name: 'Tech Conference 2024',
      location: 'San Francisco Convention Center',
      type: 'Physical',
      info: 'Annual tech conference showcasing the latest innovations',
      speaker: {
        name: 'Jane Doe',
        bio: 'Renowned tech expert with 20 years of experience in AI and machine learning'
      }
    },
    {
      date: '2024-05-20',
      name: 'Virtual Marketing Summit',
      location: 'Online',
      type: 'Virtual',
      info: 'Learn about the latest digital marketing strategies',
      speaker: {
        name: 'John Smith',
        bio: 'Digital marketing guru and bestselling author'
      }
    }
  ];

  selectedEvent: any;
  showingRejectReason: boolean = false;
  rejectReason: string = '';

  constructor() { }

  ngOnInit() {
  }

  hasEvent(date: string): boolean {
    return this.events.some(event => event.date === date);
  }

  isToday(date: string): boolean {
    const today = new Date();
    const checkDate = new Date(date);
    return today.toDateString() === checkDate.toDateString();
  }

  openEventModal(date: string) {
    this.selectedEvent = this.events.find(e => e.date === date);
    if (this.selectedEvent) {
      this.eventModal.present();
    }
  }

  attendEvent() {
    console.log('Attending event:', this.selectedEvent.name);
    this.eventModal.dismiss();
  }

  showRejectReason() {
    this.showingRejectReason = true;
  }

  rejectEvent() {
    if (this.rejectReason.trim()) {
      console.log('Rejecting event:', this.selectedEvent.name);
      console.log('Reason:', this.rejectReason);
      this.eventModal.dismiss();
      this.resetRejectState();
    } else {
      // Show an alert or message that a reason is required
      console.log('Please provide a reason for rejecting the event.');
    }
  }

  resetRejectState() {
    this.showingRejectReason = false;
    this.rejectReason = '';
  }
}