import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-eventify',
  templateUrl: './eventify.page.html',
  styleUrls: ['./eventify.page.scss'],
})
export class EventifyPage implements OnInit {
  selectedSegment = 'registered';
  events = [
    {
      eventName: 'Tech Conference 2024',
      eventType: 'physical',
      eventDate: 'July 15, 2024',
      startTime: "",
      endTime: "",
      location: 'Durban Convention Center, Durban',
      description: 'A conference to explore the latest in tech innovations.',
      registered: true,
      invited: false,
      latitude: -29.8579,
      longitude: 31.0292,
      speakers: [
        {
          name: 'John Doe',
          biography: 'Tech enthusiast and speaker.',
          email: 'john.doe@example.com',
          facebook: '',
          instagram: '',
          linkedin: '',
          twitter: ''
        }
      ]
    },
    {
      eventName: 'Virtual Marketing Summit',
      eventType: 'virtual',
      eventDate: 'August 20, 2024',
      location: 'Online',
      description: 'Join marketing experts from around the world for an online summit.',
      registered: false,
      invited: true,
      speakers: []
    },
    {
      eventName: 'Local Startup Meetup',
      eventType: 'physical',
      eventDate: 'September 10, 2024',
      location: 'Durban Tech Hub, Durban',
      description: 'Meet local startup founders and network with industry professionals.',
      registered: true,
      invited: true,
      latitude: -29.8579,
      longitude: 31.0100,
      speakers: [
        {
          name: 'Jane Smith',
          biography: 'Startup founder and entrepreneur.',
          email: 'jane.smith@example.com',
          facebook: '',
          instagram: '',
          linkedin: '',
          twitter: ''
        }
      ]
    }
  ];

  isSpeakerModalOpen = false;
  selectedSpeaker: any = null;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.loadEvents();
  }

  get filteredEvents() {
    return this.events.filter(event =>
      this.selectedSegment === 'registered' ? event.registered : event.invited
    );
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  getEventTypeIcon(type: string): string {
    return type === 'virtual' ? 'laptop-outline' : 'business-outline';
  }

  viewMap(latitude: number, longitude: number) {
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
  }

  loadEvents(): void {
    this.eventsService.getEvents().subscribe((events: any[]) => {
      this.events = events;
      console.log(this.events);
    }, error => {
      console.error('Error fetching events from Firestore:', error);
    });
  }

  viewSpeakerDetails(speaker: any) {
    this.selectedSpeaker = speaker;
    this.isSpeakerModalOpen = true;
  }

  closeSpeakerModal() {
    this.isSpeakerModalOpen = false;
    this.selectedSpeaker = null;
  }
}