import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComsService } from '../services/coms.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  communityName: string = '';
  newMessage: string = '';
  messages: any[] = [];
  currentUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private comsService: ComsService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.communityName = this.route.snapshot.paramMap.get('name')!;
    if (this.communityName) {
      this.comsService.getCommunityChats(this.communityName).subscribe(messages => {
        this.messages = messages;
      });
    } else {
      console.error('Community name is not defined in the route parameters.');
    }

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        console.error('User is not authenticated.');
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim().length && this.currentUser && this.communityName) {
      const message = {
        text: this.newMessage,
        timestamp: new Date(),
        sender: this.currentUser.email
      };
      this.afs.collection('communities').doc(this.communityName).collection('community_chat').add(message)
        .then(() => {
          this.newMessage = '';
        })
        .catch(error => {
          console.error('Error sending message: ', error);
        });
    } else {
      console.error('Message text is empty or user/community name is not defined.');
    }
  }
}
