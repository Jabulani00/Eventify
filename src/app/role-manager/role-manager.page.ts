import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



export interface User {
  uid: string;
  fullName: string;
  email: string;
  profilePictureURL?: string;
  status: string;
  role: string;
  countActivity?: number; // Add countActivity property if it's part of your data
}


@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.page.html',
  styleUrls: ['./role-manager.page.scss'],
})
export class RoleManagerPage implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  selectedRole: string = 'All';
  selectedStatus: string = 'All';
  maxActivity: number = 0;
  

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore.collection('users').valueChanges().subscribe((data: any[]) => {
      this.users = data;
      this.filteredUsers = data;
      this.filterUsers(); // Initial filter users
      this.calculateStats(); // Calculate stats initially
      this.updateMaxActivity(); // Update maxActivity initially
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      return (this.selectedRole === 'All' || user.role === this.selectedRole) &&
             (this.selectedStatus === 'All' || user.status === this.selectedStatus);
    });
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

  getBadgeColor(status: string): string {
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
            console.log('User approved successfully');
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
            console.log('User approved successfully');
            // Update status locally
            user.status = 'Active';
  
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

  updateMaxActivity() {
    this.maxActivity = Math.max(1, ...this.users.map(user => user.countActivity ?? 0));
  }

  sortUsersByActivity() {
    this.filteredUsers.sort((a, b) => (b.countActivity ?? 0) - (a.countActivity ?? 0));
  }
  

  getMostActiveUser(): User | undefined {
    if (this.users.length === 0) return undefined;
  
    return this.users.reduce((mostActive, current) =>
      (current.countActivity ?? 0) > (mostActive.countActivity ?? 0) ? current : mostActive
    );
  }
  
  
  
}
