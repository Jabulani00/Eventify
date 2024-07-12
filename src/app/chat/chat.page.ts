import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

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

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  userEmail: string = '';
  userName: string = '';
  messages: Observable<any[]> = new Observable<any[]>();
  newMessage: string = '';

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userEmail = user.email!;
          return this.afs.collection<UserDetails>('users', ref => ref.where('email', '==', this.userEmail)).valueChanges();
        }
        return [];
      })
    ).subscribe((userDetails: UserDetails[]) => {
      if (userDetails.length) {
        this.userName = userDetails[0].fullName;
        this.loadMessages();
      }
    });
  }

  loadMessages() {
    this.messages = this.afs
      .collection('community_chat', ref => ref.orderBy('timestamp'))
      .valueChanges()
      .pipe(
        map((messages: any[]) => messages.map(message => {
          return {
            ...message,
            timestamp: message.timestamp ? (message.timestamp as firebase.firestore.Timestamp).toDate() : null
          };
        }).filter(message => message.timestamp))
      );
  }

  sendMessage() {
    if (this.newMessage.trim().length) {
      this.afs.collection('community_chat').add({
        sender: this.userName,
        content: this.newMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      this.newMessage = '';
    }
  }
}
