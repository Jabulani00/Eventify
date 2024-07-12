import { Component, OnInit } from '@angular/core';
import { ComsService } from '../services/coms.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';

interface UserDetails {
  address: string;
  bio: string;
  countActivity: number;
  email: string;
  facebook: string;
  fullName: string;
  gender: string;
  instagram: string;
  joinDate: string;
  maritalStatus: string;
  membershipID: string;
  phoneNumber: string;
  profilePictureURL: string;
  role: string;
  status: string;
  tiktok: string;
  twitter: string;
  uid: string;
}

interface Community {
  name: string;
  description: string;
  // Add any other properties if needed
}

@Component({
  selector: 'app-coms',
  templateUrl: './coms.page.html',
  styleUrls: ['./coms.page.scss'],
})
export class ComsPage implements OnInit {
  admin: UserDetails = {} as UserDetails;
  selectedSegment = 'chats';
  users: UserDetails[] = [];
  groups: any[] = [];
  calls: any[] = [];
  communities: any[] = [];
  newCommunity = { name: '', description: '', users: [] };

  constructor(
    private comsService: ComsService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const adminEmail = user.email!;
          return this.afs.collection<UserDetails>('users', ref => ref.where('email', '==', adminEmail)).valueChanges();
        }
        return [];
      })
    ).subscribe(adminData => {
      if (adminData.length) {
        this.admin = adminData[0];
      }
    });

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
  openCommunityChat(community: Community) {
    // You can pass additional parameters if needed
    this.router.navigate(['/chat', community.name]);
  }

  createCommunity() {
    if (this.newCommunity.name.trim().length && this.newCommunity.description.trim().length) {
      this.afs.collection('communities').add({
        name: this.newCommunity.name,
        description: this.newCommunity.description,
        users: this.newCommunity.users
      }).then(() => {
        this.newCommunity = { name: '', description: '', users: [] };
      });
    }
  }
}
