import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.getUser().subscribe(user => {
        if (user) {
          // User is authenticated
          resolve(true);
        } else {
          // User is not authenticated
          this.showToast('Please login to access this page.');
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
