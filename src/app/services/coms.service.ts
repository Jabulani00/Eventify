import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class ComsService {
  constructor(private afs: AngularFirestore) {}

  getUsers(): Observable<UserDetails[]> {
    return this.afs.collection<UserDetails>('users').valueChanges();
  }

  getGroups(): Observable<any[]> {
    return this.afs.collection('groups').valueChanges();
  }

  getCalls(): Observable<any[]> {
    return this.afs.collection('calls').valueChanges();
  }

  getCommunities(): Observable<any[]> {
    return this.afs.collection('communities').valueChanges();
  }

  getUserByEmail(email: string): Observable<UserDetails[]> {
    return this.afs.collection<UserDetails>('users', ref => ref.where('email', '==', email)).valueChanges();
  }


}
