import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coms',
  templateUrl: './coms.page.html',
  styleUrls: ['./coms.page.scss'],
})
export class ComsPage implements OnInit {
  messages = [
    { sender: 'Khalula', content: 'Hey, are we still on for the event tonight?', time: '10:30 AM', avatar: 'assets/k.jpg' },
    { sender: 'Nkululeko', content: 'I have a question about the venue. Can someone help?', time: '11:45 AM', avatar: 'assets/n.jpg' },
    { sender: 'Vigie', content: 'Reminder: Team meeting at 2 PM today!', time: '12:15 PM', avatar: 'assets/v.jpg' },
  ];

  groups = [
    { name: 'Organizers', description: 'Event organizers group chat' },
    { name: 'Attendees', description: 'Chat with all event attendees' }
  ];

  calls = [
    { title: 'Team Meeting', time: '2:00 PM' },
    { title: 'Client Call', time: '3:30 PM' }
  ];

  communities = [
    { name: 'Tech Community', description: 'Group for tech enthusiasts' },
    { name: 'Marketing Community', description: 'Marketing professionals group' }
  ];

  selectedSegment = 'chats';

  admin = {
    profileImage: 'assets/j.jpg',
    name: 'Jabulani Gwala',
    role: 'Administrator',
    email: 'gwala@admin.com',
    phone: '+27-456-7890',
    joinDate: 'January 1, 2020',
    eventsManaged: 42,
    totalAttendees: 1050,
    recentActivity: [
      { description: 'Updated event details', time: '2 hours ago' },
      { description: 'Sent reminder email', time: '1 day ago' },
    ]
  };

  constructor() { }

  ngOnInit() { }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  editProfile() {
    console.log('Edit profile clicked');
  }

  logout() {
    console.log('Logout clicked');
  }
}
