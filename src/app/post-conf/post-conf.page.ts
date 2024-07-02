import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-post-conf',
  templateUrl: './post-conf.page.html',
  styleUrls: ['./post-conf.page.scss'],
})
export class PostConfPage implements OnInit {


  ngOnInit() {
    this.loadUsers();
  }


  eventForm: FormGroup;
  isVirtual: boolean = true;
  people :any = ['Alice', 'Bob', 'Charlie', 'David']; // Example list of people



  constructor(private authService: AuthService,private fb: FormBuilder, private eventsService: EventsService,private UsersService: UserService) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      eventType: ['virtual', Validators.required],
      location: [''],
      privacy: ['public', Validators.required],
      invitees: [''],
      speakers: this.fb.array([]),
    });

    // Update location field validity based on event type
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


  createEvent() {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;

      // Call service method to add event
      this.eventsService.addEvent(eventData)
        .then(() => {
          console.log('Event Created and saved to Firestore');
          // Optionally, navigate to a success page or perform other actions
        })
        .catch(error => {
          console.error('Error adding event to Firestore:', error);
          // Handle error as needed
        });
    } else {
      console.log('Form is not valid');
    }
  }
  

  // loadUsers(): void {
  //   this.authService.getUser().subscribe((user:any) => {
  //     if (user) {
  //       this.people =  this.UsersService.getUsers();
  //       console.log( this.people)
  //     }
  //   });
  // }

  loadUsers(): void {
    this.people = this.UsersService.getUsers();
  }
  

  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}