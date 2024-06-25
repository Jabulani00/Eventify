import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app'; // Import firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  userEmail: string = ''; // Initialize userEmail
  messages: Observable<any[]> = new Observable<any[]>(); // Initialize messages
  newMessage: string = ''; // Initialize newMessage

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth // Inject AngularFireAuth
  ) {}

  ngOnInit() {
    // Get the current user's email
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email!;
        this.loadMessages();
      }
    });
  }

  loadMessages() {
    this.messages = this.afs
      .collection('messages', ref => ref.orderBy('timestamp'))
      .valueChanges()
      .pipe(
        map((messages: any[]) => messages.map(message => {
          return {
            ...message,
            timestamp: message.timestamp ? (message.timestamp as firebase.firestore.Timestamp).toDate() : null
          };
        }).filter(message => message.timestamp)) // Filter out messages with null timestamp
      );
  }

  sendMessage() {
    if (this.newMessage.trim().length) {
      this.afs.collection('messages').add({
        userEmail: this.userEmail, // Use userEmail instead of userId
        content: this.newMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      this.newMessage = '';
    }
  }
}
