import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      membershipID: ['', Validators.required],
      address: ['', Validators.required], // New field
      maritalStatus: ['', Validators.required], // New field
      terms: [false, Validators.requiredTrue] // Checkbox for Terms and Conditions
    });
  }

  ngOnInit() {}

  async onRegister() {
    if (this.registerForm.valid) {
      const { email, password, fullName, role, gender, phoneNumber, membershipID, address, maritalStatus } = this.registerForm.value;
      try {
        const userCredential = await this.authService.register(email, password);
        const uid = userCredential.user?.uid;

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
          status: 'Pending' // Default status
        };

        await this.firestoreService.addDocumentWithId('users', membershipID, userData);
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

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
