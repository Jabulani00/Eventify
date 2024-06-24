import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Host Admin';
  status: 'Pending' | 'Approved' | 'Suspended' | 'Active';
  activityScore: number;
}

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.page.html',
  styleUrls: ['./role-manager.page.scss'],
})
export class RoleManagerPage implements OnInit {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Super Admin', status: 'Active', activityScore: 95 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Host Admin', status: 'Pending', activityScore: 0 },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Host Admin', status: 'Approved', activityScore: 78 },
    { id: 4, name: 'Bob Williams', email: 'bob@example.com', role: 'Super Admin', status: 'Suspended', activityScore: 30 },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Host Admin', status: 'Active', activityScore: 88 },
  ];

  filteredUsers: User[] = [];
  selectedRole: string = 'All';
  selectedStatus: string = 'All';

  activeUsersCount: number = 0;
  pendingUsersCount: number = 0;
  suspendedUsersCount: number = 0;

  constructor() { }

  ngOnInit() {
    this.filterUsers();
    this.updateUserCounts();
  }
  updateUserCounts() {
    this.activeUsersCount = this.users.filter(u => u.status === 'Active').length;
    this.pendingUsersCount = this.users.filter(u => u.status === 'Pending').length;
    this.suspendedUsersCount = this.users.filter(u => u.status === 'Suspended').length;
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => 
      (this.selectedRole === 'All' || user.role === this.selectedRole) &&
      (this.selectedStatus === 'All' || user.status === this.selectedStatus)
    );
  }


  getBadgeColor(status: string): string {
    switch(status) {
      case 'Active': return 'success';
      case 'Pending': return 'warning';
      case 'Suspended': return 'danger';
      case 'Approved': return 'primary';
      default: return 'medium';
    }
  }

  approveUser(user: User) {
    user.status = 'Approved';
    this.filterUsers();
    this.updateUserCounts();
  }

  declineUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.filterUsers();
      this.updateUserCounts();
    }
  }

  suspendUser(user: User) {
    user.status = 'Suspended';
    this.filterUsers();
    this.updateUserCounts();
  }

  activateUser(user: User) {
    user.status = 'Active';
    this.filterUsers();
    this.updateUserCounts();
  }

  getMostActiveUsers(): User[] {
    return [...this.users]
      .sort((a, b) => b.activityScore - a.activityScore)
      .slice(0, 5);
  }
}