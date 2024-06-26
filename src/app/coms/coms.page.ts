import { Component, OnInit } from '@angular/core';
import { ComsService } from '../services/coms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coms',
  templateUrl: './coms.page.html',
  styleUrls: ['./coms.page.scss'],
})
export class ComsPage implements OnInit {
  admin: any = {};
  selectedSegment = 'chats';
  users: any[] = [];
  groups: any[] = [];
  calls: any[] = [];
  communities: any[] = [];

  constructor(private comsService: ComsService, private router: Router) { }

  ngOnInit() {
    this.comsService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.comsService.getGroups().subscribe(groups => {
      this.groups = groups;
    });

    this.comsService.getCalls().subscribe(calls => {
      this.calls = calls;
    });

    this.comsService.getCommunities().subscribe(communities => {
      this.communities = communities;
    });

    // Assuming the admin email is stored in localStorage or another service
    const adminEmail = localStorage.getItem('adminEmail');
    if (adminEmail) {
      this.comsService.getUserByEmail(adminEmail).subscribe(adminData => {
        this.admin = adminData[0]; // Assuming the email query returns an array with one element
      });
    }
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  editProfile() {
    console.log('Edit profile clicked');
  }

  logout() {
    console.log('Logout clicked');
  }

  openChat(user: any) {
    this.router.navigate(['/chat', user.email]);
  }
}
