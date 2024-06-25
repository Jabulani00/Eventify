// src/app/coms/coms.page.ts
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

    // Assuming you have a method to fetch the admin data
    // this.userService.getUser('dGPFXc1pXNdkCHkEnFullxP9jmu2').subscribe(adminData => {
    //   this.admin = adminData;
    // });
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
    this.router.navigate(['/chat', user.uid]);
  }
}
