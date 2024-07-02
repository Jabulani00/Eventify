import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComsService {
  constructor(private firestore: AngularFirestore) { }

  getMessages(): Observable<any[]> {
    return this.firestore.collection('messages').valueChanges();
  }

  getGroups(): Observable<any[]> {
    return this.firestore.collection('groups').valueChanges();
  }

  getCalls(): Observable<any[]> {
    return this.firestore.collection('calls').valueChanges();
  }

  getCommunities(): Observable<any[]> {
    return this.firestore.collection('communities').valueChanges();
  }

  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }

  getUserByEmail(email: string): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }


}
