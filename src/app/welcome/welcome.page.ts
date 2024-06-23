import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild('slider', { static: true }) slider!: ElementRef;
  @ViewChild('authOptions', { static: true }) authOptions!: ElementRef;

  slides = [
    {
      image: 'assets/ent.jpg',
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
  autoScrollInterval: any;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.setupSlider();
    this.startAutoScroll();
  }

  setupSlider() {
    const slider = this.slider.nativeElement;
    slider.addEventListener('transitionend', () => {
      this.updateActiveDot();
    });
  }

  updateActiveDot() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
      (dot as HTMLElement).classList.toggle('active', index === this.currentSlide);
    });
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.updateBackgroundSlider();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  updateBackgroundSlider() {
    const slider = this.slider.nativeElement;
    slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }

  scrollToSlide(index: number) {
    this.stopAutoScroll(); // Stop auto-scrolling when manually changing slides
    this.currentSlide = index;
    this.updateBackgroundSlider();
    this.startAutoScroll(); // Restart auto-scrolling after manual change
  }

  onGetStarted() {
    this.stopAutoScroll(); // Stop auto-scrolling when showing auth options
    if (this.authOptions && this.authOptions.nativeElement) {
      this.authOptions.nativeElement.style.display = 'flex';
    }
  }

  onExploreFeatures() {
    // Implement your explore features functionality here
    // For example, you could scroll to a specific slide or open a modal
    console.log('Explore features clicked');
  }

  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  // Lifecycle hooks
  ngOnDestroy() {
    this.stopAutoScroll(); // Ensure interval is cleared when component is destroyed
  }
}