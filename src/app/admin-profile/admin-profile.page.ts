import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {
  admin: any = {}; // Initialize admin as an empty object

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private toastController: ToastController,
    private afAuth: AngularFireAuth // Inject AngularFireAuth
  ) { }

  ngOnInit() {
    // Fetch the admin profile data when the component initializes
    this.getAdminProfile();
  }

  getAdminProfile() {
    // Get the currently logged-in user's email
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userEmail = user.email;

        // Fetch all user documents from Firestore
        this.firestoreService.getDocuments('users').subscribe(users => {
          // Find the user document with the matching email
          const matchedUser = users.find(u => u.email === userEmail);

          if (matchedUser) {
            this.admin = {
              name: matchedUser.fullName,
              role: matchedUser.role,
              email: matchedUser.email,
              phone: matchedUser.phoneNumber,
              joinDate: matchedUser.joinDate, // Ensure this field exists and is correctly formatted in Firebase
              eventsManaged: matchedUser.eventsManaged || 0, // Use default value if not available
              totalAttendees: matchedUser.totalAttendees || 0, // Use default value if not available
              recentActivity: matchedUser.recentActivity || [] // Ensure this matches the structure in Firebase
            };

            // Check if the profile picture URL is present and fetch the image from storage
            if (matchedUser.profilePictureURL) {
              const storage = getStorage();
              const profilePicRef = ref(storage, matchedUser.profilePictureURL);
              getDownloadURL(profilePicRef).then(url => {
                this.admin.profileImage = url;
              }).catch(error => {
                console.error('Error fetching profile picture:', error);
                this.admin.profileImage = 'assets/default-profile.png'; // Use default image in case of error
              });
            } else {
              this.admin.profileImage = 'assets/default-profile.png'; // Use default image if no URL is provided
            }
          } else {
            // Handle case when no document is found for the email
            console.error('No profile found for the user');
          }
        });
      } else {
        // Handle case when user is not logged in
        console.error('User not logged in');
      }
    });
  }

  editProfile() {
    console.log('Edit profile');
    // Implement navigation or functionality to edit profile
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      const toast = await this.toastController.create({
        message: 'You have successfully logged out.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      this.router.navigate(['/login']); // Navigate to the login page or home page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      const toast = await this.toastController.create({
        message: 'Error logging out. Please try again.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }
}
