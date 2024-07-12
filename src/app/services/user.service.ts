import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'; // Import AngularFirestore and AngularFirestoreDocument
import { Observable } from 'rxjs';

export interface User {
  address: string;
  countActivity: number;
  email: string;
  fullName: string;
  gender: string;
  maritalStatus: string;
  membershipID: string;
  phoneNumber: string;
  profilePictureURL: string;
  role: string;
  status: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').valueChanges();
  }

  getUserByEmail(email: string): AngularFirestoreDocument<User> {
    return this.firestore.collection('users').doc<User>(email);
  }

  updateUserStatus(email: string, newStatus: string): Promise<void> {
    const userRef = this.getUserByEmail(email);
    return userRef.update({ status: newStatus });
  }

  // getUserByCondition(collectionName: string, email: string): Observable<any[]> {
  //   return this.firestore.collection(collectionName, ref => ref.where('email', '==', email)).valueChanges();
  // }
}
