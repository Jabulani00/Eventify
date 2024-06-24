import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { ToastController, IonModal } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { query, where, getDocs, collection } from 'firebase/firestore';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {
  admin: any = {}; // Initialize admin as an empty object
  @ViewChild('editProfileModal', { static: true }) editProfileModal!: IonModal;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private toastController: ToastController,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.getAdminProfile();
  }

  getAdminProfile() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userEmail = user.email;
        this.firestoreService.getDocuments('users').subscribe(users => {
          const matchedUser = users.find(u => u.email === userEmail);
          if (matchedUser) {
            this.admin = {
              name: matchedUser.fullName,
              role: matchedUser.role,
              email: matchedUser.email,
              phone: matchedUser.phoneNumber,
              bio: matchedUser.bio || '',
              joinDate: matchedUser.joinDate,
              eventsManaged: matchedUser.eventsManaged || 0,
              totalAttendees: matchedUser.totalAttendees || 0,
              recentActivity: matchedUser.recentActivity || [],
              profilePictureURL: matchedUser.profilePictureURL,
              facebook: matchedUser.facebook || '',
              instagram: matchedUser.instagram || '',
              twitter: matchedUser.twitter || '',
              tiktok: matchedUser.tiktok || ''
            };

            if (matchedUser.profilePictureURL) {
              const storage = getStorage();
              const profilePicRef = ref(storage, matchedUser.profilePictureURL);
              getDownloadURL(profilePicRef).then(url => {
                this.admin.profileImage = url;
              }).catch(error => {
                console.error('Error fetching profile picture:', error);
                this.admin.profileImage = 'assets/default-profile.png';
              });
            } else {
              this.admin.profileImage = 'assets/default-profile.png';
            }
          } else {
            console.error('No profile found for the user');
          }
        });
      } else {
        console.error('User not logged in');
      }
    });
  }

  openEditModal() {
    this.editProfileModal.present();
  }

  closeEditModal() {
    this.editProfileModal.dismiss();
  }

  changeProfilePicture() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const storage = getStorage();
        const profilePicRef = ref(storage, `profile_pictures/${this.admin.email}`);
        await uploadBytes(profilePicRef, file);
        const newProfilePicURL = await getDownloadURL(profilePicRef);
        this.admin.profileImage = newProfilePicURL;
        this.admin.profilePictureURL = `profile_pictures/${this.admin.email}`;
        this.updateProfileData(); // Update profile data after changing picture
      }
    };
    fileInput.click();
  }

  async updateProfileData() {
    try {
      const dataToUpdate = {
        fullName: this.admin.name,
        phoneNumber: this.admin.phone,
        bio: this.admin.bio,
        profilePictureURL: this.admin.profilePictureURL,
        facebook: this.admin.facebook,
        instagram: this.admin.instagram,
        twitter: this.admin.twitter,
        tiktok: this.admin.tiktok
      };
  
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('email', '==', this.admin.email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = userDoc.ref;
  
        await updateDoc(userRef, dataToUpdate);
  
        const toast = await this.toastController.create({
          message: 'Profile updated successfully.',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      } else {
        console.error('No document to update');
        const toast = await this.toastController.create({
          message: 'No profile found to update.',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const toast = await this.toastController.create({
        message: 'Error updating profile. Please try again.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
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
      this.router.navigate(['/login']);
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
