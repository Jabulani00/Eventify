import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventsCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.eventsCollection = this.firestore.collection('events');
  }

  // Method to get all events
  getEvents(): Observable<any[]> {
    return this.eventsCollection.snapshotChanges().pipe(
      map((actions: any[]) => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Method to add a new event
  addEvent(eventData: any): Promise<any> {
    // Generate UUID for event ID field
    const eventId = this.firestore.createId();

    // Include event ID in the eventData to be saved to Firestore
    const eventDataWithId = {
      eventId: eventId, // Save the UUID as a field
      ...eventData,
    };

    return this.eventsCollection.doc(eventId).set(eventDataWithId);
  }

  // Method to update an existing event
  updateEvent(eventId: string, eventData: any): Promise<void> {
    return this.eventsCollection.doc(eventId).update(eventData);
  }

  // Method to delete an event
  deleteEvent(eventId: string): Promise<void> {
    return this.eventsCollection.doc(eventId).delete();
  }

}