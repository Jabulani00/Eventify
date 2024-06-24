import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {
  admin = {
    name: 'Sarah Johnson',
    role: 'Super Admin',
    email: 'sarah.johnson@eventify.com',
    phone: '+1 (555) 123-4567',
    profileImage: 'https://i.pravatar.cc/300?img=47',
    joinDate: 'March 15, 2022',
    eventsManaged: 42,
    totalAttendees: 12500,
    recentActivity: [
      { action: 'Created new event', date: '2024-06-20', event: 'Tech Conference 2024' },
      { action: 'Updated event details', date: '2024-06-18', event: 'Music Festival' },
      { action: 'Sent bulk notification', date: '2024-06-15', event: 'Startup Meetup' },
    ]
  };

  constructor() { }

  ngOnInit() {
  }

  editProfile() {
    console.log('Edit profile');
  }

  logout() {
    console.log('Logout');
  }
}