import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventify',
  templateUrl: './eventify.page.html',
  styleUrls: ['./eventify.page.scss'],
})
export class EventifyPage implements OnInit {
  selectedSegment = 'registered';

  events = [
    {
      name: 'Tech Conference 2024',
      type: 'physical',
      date: 'July 15, 2024',
      location: 'Durban Convention Center, Durban',
      bio: 'A conference to explore the latest in tech innovations.',
      registered: true,
      invited: false,
      latitude: -29.8579,
      longitude: 31.0292
    },
    {
      name: 'Virtual Marketing Summit',
      type: 'virtual',
      date: 'August 20, 2024',
      location: 'Online',
      bio: 'Join marketing experts from around the world for an online summit.',
      registered: false,
      invited: true
    },
    {
      name: 'Local Startup Meetup',
      type: 'physical',
      date: 'September 10, 2024',
      location: 'Durban Tech Hub, Durban',
      bio: 'Meet local startup founders and network with industry professionals.',
      registered: true,
      invited: true,
      latitude: -29.8579,
      longitude: 31.0100
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  getEventTypeIcon(type: string): string {
    return type === 'virtual' ? 'laptop-outline' : 'location-outline';
  }

  viewMap(latitude: number, longitude: number) {
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
  }
}
