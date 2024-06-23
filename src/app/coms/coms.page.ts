import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coms',
  templateUrl: './coms.page.html',
  styleUrls: ['./coms.page.scss'],
})
export class ComsPage implements OnInit {
  messages = [
    { sender: 'John Doe', content: 'Hey, are we still on for the event tonight?', time: '10:30 AM' },
    { sender: 'Jane Smith', content: 'I have a question about the venue. Can someone help?', time: '11:45 AM' },
    { sender: 'Event Bot', content: 'Reminder: Team meeting at 2 PM today!', time: '12:15 PM' },
  ];

  constructor() { }

  ngOnInit() { }
}