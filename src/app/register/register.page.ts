import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  profilePicture!: File;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private toastController: ToastController,
    private storageService: StorageService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      membershipID: ['', Validators.required],
      address: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      profilePicture: [''] // Add profile picture control
    });
  }

  ngOnInit() {}

  async onRegister() {
    if (this.registerForm.valid) {
      const { email, password, fullName, role, gender, phoneNumber, membershipID, address, maritalStatus } = this.registerForm.value;
      try {
        // Register user with authentication service
        const userCredential = await this.authService.register(email, password);
        const uid = userCredential.user?.uid;

        // Initialize profile picture URL as an empty string
        let profilePictureURL: string = '';

        // Upload profile picture if selected
        if (this.profilePicture) {
          const filePath = `profile_pictures/${uid}`;
          await this.storageService.uploadFile(filePath, this.profilePicture).toPromise();
          profilePictureURL = await this.storageService.getDownloadURL(filePath).toPromise() ?? ''; // Get the downloadable URL
        }

        // Prepare the registration date
        const today = new Date();
        const registrationDate = today.toISOString().split('T')[0]; // ISO 8601 format

        // Prepare user data including profile picture URL and registration date
        const userData = {
          uid,
          email,
          fullName,
          role,
          gender,
          phoneNumber,
          membershipID,
          address,
          maritalStatus,
          profilePictureURL, // Save the downloadable URL
          countActivity: 0, // Initialize countActivity
          status: 'Pending',
          joinDate: registrationDate // Add the registration date
        };

        // Add user data to Firestore
        await this.firestoreService.addDocumentWithId('users', membershipID, userData);

        // Show success message and navigate to login page
        this.showToast('Registration successful');
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Registration error:', error);
        this.showToast('Registration failed. Please try again.');
      }
    } else {
      this.showToast('Please fill out all required fields and agree to the Terms and Conditions.');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.profilePicture = file;
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
