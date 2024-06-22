import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild('slider', { static: true }) slider!: ElementRef;
  @ViewChild('getInBtn', { static: true }) getInBtn!: ElementRef;
  @ViewChild('authOptions', { static: true }) authOptions!: ElementRef;

  slides = [
    {
      image: 'assets/slide1.jpg',
      icon: 'information-circle-outline',
      title: 'Welcome to Eventify',
      description: 'Eventify is your ultimate solution for managing and attending events seamlessly.',
    },
    {
      image: 'assets/slide2.jpg',
      icon: 'key-outline',
      title: 'User Authentication',
      description: 'Secure sign-up and login with email and password, and role-based access for attendees, hosts, and administrators.',
    },
    {
      image: 'assets/slide3.jpg',
      icon: 'calendar-outline',
      title: 'Event Management',
      description: 'Create, edit, and delete events, manage detailed event information, and track profiles of guest speakers.',
    },
    {
      image: 'assets/slide4.jpg',
      icon: 'qr-code-outline',
      title: 'QR Code Attendance',
      description: 'Utilize QR codes to register and verify attendance, ensuring only invited users can register.',
    },
    {
      image: 'assets/slide5.jpg',
      icon: 'analytics-outline',
      title: 'Analytics and Reporting',
      description: 'Gain insights on event attendance and engagement with detailed reports on event participation.',
    },
    {
      image: 'assets/slide6.jpg',
      icon: 'notifications-outline',
      title: 'Notifications',
      description: 'Send timely notifications for event updates, reminders, and new invitations to keep users informed.',
    },
    {
      image: 'assets/slide7.jpg',
      icon: 'chatbubbles-outline',
      title: 'Communication Center',
      description: 'Facilitate in-app messaging and announcements between attendees and organizers.',
    },
  ];

  currentSlide = 0;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.setupSlider();
  }

 
  setupSlider() {
    const slider = this.slider.nativeElement;
    const dots = document.querySelectorAll('.nav-dot');

    slider.addEventListener('scroll', () => {
      const slideHeight = slider.children[0].offsetHeight;
      this.currentSlide = Math.round(slider.scrollTop / slideHeight);
      this.updateDots();
    });

    dots.forEach((dot, index) => {
      (dot as HTMLElement).addEventListener('click', () => {
        this.scrollToSlide(index);
      });
    });
  }

  updateDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
      (dot as HTMLElement).classList.toggle('active', index === this.currentSlide);
    });
  }

  scrollToSlide(index: number) {
    const slider = this.slider.nativeElement;
    const slideHeight = slider.children[0].offsetHeight;
    slider.scrollTo({
      top: index * slideHeight,
      behavior: 'smooth'
    });
  }

  onGetIn() {
    (this.getInBtn.nativeElement as HTMLElement).style.display = 'none';
    (this.authOptions.nativeElement as HTMLElement).style.display = 'flex';
  }

  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }
}