import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface User {
  membershipID: string;
  joinDate: string;
  gender: string;
  maritalStatus: string;
  phoneNumber: string;
  uid: string;
  fullName: string;
  email: string;
  profilePictureURL?: string;
  status: string;
  role: string;
  countActivity?: number;
  isTopUser?: boolean; // Add isTopUser property
}


@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.page.html',
  styleUrls: ['./role-manager.page.scss'],
})
export class RoleManagerPage implements OnInit {

  @ViewChild('userModal') userModal!: IonModal;
  selectedUser: User | null = null;

  users: User[] = [];
  filteredUsers: User[] = [];
  selectedRole: string = 'All';
  selectedStatus: string = 'All';
  maxActivity: number = 0;
  

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore.collection('users').valueChanges().subscribe((data: any[]) => {
      this.users = data as User[];
      this.filterUsers(); // Update filteredUsers whenever users change
      this.calculateStats();
      this.updateMaxActivity();
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      return (this.selectedRole === 'All' || user.role === this.selectedRole) &&
             (this.selectedStatus === 'All' || user.status === this.selectedStatus);
    });
    this.sortUsersByActivity(); // Ensure filteredUsers is always sorted after filtering
    this.updateTopUser(); // Update top user after filtering
  }

  openUserModal(user: User) {
    this.selectedUser = user;
    this.userModal.present();
  }

  calculateStats() {
    // Calculate stats based on the filteredUsers list
    // For example:
    // Count users with specific statuses
    const pendingCount = this.countUsersWithStatus('Pending');
    const activeCount = this.countUsersWithStatus('Active');
    const suspendedCount = this.countUsersWithStatus('Suspended');

    console.log('Pending:', pendingCount, 'Active:', activeCount, 'Suspended:', suspendedCount);
  }

  getBadgeColor(status: string | undefined): string {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Approved':
      case 'Active':
        return 'success';
      case 'Suspended':
        return 'danger';
      default:
        return 'medium';
    }
  }

  approveUser(user: User) {
    const usersRef = this.firestore.collection('users', ref =>
      ref.where('email', '==', user.email)
    );

    usersRef.get().toPromise().then(querySnapshot => {
      if (querySnapshot && !querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDocRef = this.firestore.collection('users').doc(docId);

        userDocRef.update({ status: 'Active' })
          .then(() => {
            console.log('User approved successfully');
            // Update status locally
            user.status = 'Active';
            // Update countActivity if applicable
            if (user.countActivity) {
              user.countActivity++; // Example: Increment activity count
            }
            // Reapply filters and recalculate stats
            this.filterUsers();
            this.calculateStats();
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
      } else {
        console.error('User document with the provided email does not exist');
      }
    }).catch(error => {
      console.error('Error fetching user document:', error);
    });
  }

  declineUser(user: User) {
    const usersRef = this.firestore.collection('users', ref =>
      ref.where('email', '==', user.email)
    );

    usersRef.get().toPromise().then(querySnapshot => {
      if (querySnapshot && !querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDocRef = this.firestore.collection('users').doc(docId);

        userDocRef.update({ status: 'Denied' })
          .then(() => {
            console.log('User declined successfully');
            // Update status locally
            user.status = 'Denied';
            // Reapply filters and recalculate stats
            this.filterUsers();
            this.calculateStats();
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
      } else {
        console.error('User document with the provided email does not exist');
      }
    }).catch(error => {
      console.error('Error fetching user document:', error);
    });
  }

  suspendUser(user: User) {
    const usersRef = this.firestore.collection('users', ref =>
      ref.where('email', '==', user.email)
    );

    usersRef.get().toPromise().then(querySnapshot => {
      if (querySnapshot && !querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDocRef = this.firestore.collection('users').doc(docId);

        userDocRef.update({ status: 'Suspended' })
          .then(() => {
            console.log('User suspended successfully');
            // Update status locally
            user.status = 'Suspended';
            // Reapply filters and recalculate stats
            this.filterUsers();
            this.calculateStats();
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
      } else {
        console.error('User document with the provided email does not exist');
      }
    }).catch(error => {
      console.error('Error fetching user document:', error);
    });
  }

  activateUser(user: User) {
    const usersRef = this.firestore.collection('users', ref =>
      ref.where('email', '==', user.email)
    );

    usersRef.get().toPromise().then(querySnapshot => {
      if (querySnapshot && !querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const userDocRef = this.firestore.collection('users').doc(docId);

        userDocRef.update({ status: 'Active' })
          .then(() => {
            console.log('User activated successfully');
            // Update status locally
            user.status = 'Active';
            // Update countActivity if applicable
            if (user.countActivity) {
              user.countActivity++; // Example: Increment activity count
            }
            // Reapply filters and recalculate stats
            this.filterUsers();
            this.calculateStats();
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
      } else {
        console.error('User document with the provided email does not exist');
      }
    }).catch(error => {
      console.error('Error fetching user document:', error);
    });
  }

  countUsersWithStatus(status: string): number {
    return this.users.filter(user => user.status === status).length;
  }

  updateTopUser() {
    if (this.filteredUsers.length === 0) return;
  
    // Sort users to ensure top user is correctly identified
    this.sortUsersByActivity();
  
    // Check if the first user is still the top user
    const currentTopUser = this.filteredUsers[0];
    this.filteredUsers.forEach(user => {
      user.isTopUser = user === currentTopUser;
    });
  }
  

  updateUserActivity(user: User, newActivity: number) {
    user.countActivity = newActivity;
    this.updateTopUser();
    this.sortUsersByActivity();
    this.updateMaxActivity();
  }

  sortUsersByActivity() {
    this.filteredUsers.sort((a, b) => (b.countActivity ?? 0) - (a.countActivity ?? 0));
  }

  updateMaxActivity() {
    this.maxActivity = Math.max(1, ...this.users.map(user => user.countActivity ?? 0));
  }
}
