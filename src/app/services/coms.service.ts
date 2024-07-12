import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComsService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  getUsers(): Observable<any[]> {
    return this.afs.collection('users').valueChanges();
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

  getCommunityChats(communityName: string): Observable<any[]> {
    return this.afs.collection('communities').doc(communityName).collection('community_chat', ref => ref.orderBy('timestamp'))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
}
