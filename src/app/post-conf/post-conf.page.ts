import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-post-conf',
  templateUrl: './post-conf.page.html',
  styleUrls: ['./post-conf.page.scss'],
})
export class PostConfPage implements OnInit {

  eventForm: FormGroup;
  isVirtual: boolean = true;
  people: any = ['Alice', 'Bob', 'Charlie', 'David']; // Example list of people

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private fb: FormBuilder,
    private eventsService: EventsService,
    private userService: UserService
  ) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      eventDate: ['', Validators.required],
      endTime: ['', Validators.required],
      eventType: ['virtual', Validators.required],
      location: [''],
      privacy: ['public', Validators.required],
      invitees: [''],
      speakers: this.fb.array([]),
      registered: true,
      invited: false,
    });

    this.eventForm.get('eventType')?.valueChanges.subscribe(value => {
      this.isVirtual = value === 'virtual';
      if (this.isVirtual) {
        this.eventForm.get('location')?.clearValidators();
      } else {
        this.eventForm.get('location')?.setValidators(Validators.required);
      }
      this.eventForm.get('location')?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  get speakers(): FormArray {
    return this.eventForm.get('speakers') as FormArray;
  }

  addSpeaker() {
    const speakerForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      linkedin: [''],
      biography: ['']
    });
    this.speakers.push(speakerForm);
  }

  removeSpeaker(index: number) {
    this.speakers.removeAt(index);
  }

  setDate($event: any) {
    const date = $event.detail.value.split('T')[0]; // Extract the date part
    this.eventForm.patchValue({ eventDate: date });
  }

  setStartTime($event: any) {
    const time = $event.detail.value.split('T')[1]; // Extract the time part
    this.eventForm.patchValue({ startTime: time });
  }

  setEndTime($event: any) {
    const time = $event.detail.value.split('T')[1]; // Extract the time part
    this.eventForm.patchValue({ endTime: time });
  }

  createEvent() {
    if (true) {
      //this.eventForm.valid
      const eventData = this.eventForm.value;


      this.eventsService.addEvent(eventData)
        .then(async () => {
          console.log('Event Created and saved to Firestore');
          try {
            for (const speaker of eventData.speakers) {
              if (speaker.email && speaker.name) {
                const userCredential = await this.authService.register(speaker.email, speaker.name);
                const uid = userCredential.user?.uid!;
                const userData = {
                  uid:uid,
                  email: speaker.email,
                  fullName:speaker.name,
                  role:"Attendee" ,
                  countActivity: 0, // Initialize countActivity
                  status: 'Active',
                };
                console.log(`Speaker registered successfully: ${speaker.email}`);
                await this.firestoreService.addDocumentWithId('users', uid?.toString(), userData);
                console.log("save to firestore");
              }
            }
          } catch (authError) {
            console.error('Error registering speaker:', authError);
          }
        })
        .catch(error => {
          console.error('Error adding event to Firestore:', error);
        });
    } else {
      console.log('Form is not valid');
      this.eventForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  loadUsers(): void {
    this.people = this.userService.getUsers();
  }

  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
