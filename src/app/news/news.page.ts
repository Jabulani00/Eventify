import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  @ViewChild('newsSlider', { static: false }) slider!: ElementRef;

  selectedSegment = 'announcements';

  newsSlides = [
    { image: 'assets/audience.jpg', title: 'Breaking News', description: 'Major event happening now!' },
    { image: 'assets/auths.jpg', title: 'Technology Update', description: 'New gadget released today.' },
    { image: 'assets/k.jpg', title: 'Sports Highlight', description: 'Team wins championship.' },
    { image: 'assets/j.jpg', title: 'Sports Highlight', description: 'Team wins championship.' },
    { image: 'assets/v.jpg', title: 'Local News', description: 'Community event this weekend.' },
    { image: 'assets/n.jpg', title: 'Global News', description: 'World leaders meet for summit.' }
  ];

  announcements = [
    { title: 'Important Notice', date: new Date('2024-07-15'), content: 'Office closed for renovation.' },
    { title: 'New Policy', date: new Date('2024-07-20'), content: 'Updated work-from-home guidelines.' }
  ];

  events = [
    { title: 'Annual Conference', date: new Date('2024-08-10'), time: '9:00 AM', location: 'Convention Center' },
    { title: 'Charity Run', date: new Date('2024-08-15'), time: '7:00 AM', location: 'City Park' }
  ];

  currentSlide = 0;
  autoScrollInterval: any;

  constructor() {}

  ngOnInit() {
    this.startAutoScroll();
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.newsSlides.length;
      this.updateSlider();
    }, 3000); // Change slide every 3 seconds
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  updateSlider() {
    if (this.slider && this.slider.nativeElement) {
      const slider = this.slider.nativeElement;
      slider.style.transform = `translateX(-${this.currentSlide * (100 / 5)}%)`; // 5 cards
    }
  }

  scrollToSlide(index: number) {
    this.stopAutoScroll(); // Stop auto-scrolling when manually changing slides
    this.currentSlide = index;
    this.updateSlider();
    this.startAutoScroll(); // Restart auto-scrolling after manual change
  }

  segmentChanged() {
    console.log('Segment changed to:', this.selectedSegment);
  }

  ngOnDestroy() {
    this.stopAutoScroll(); // Ensure interval is cleared when component is destroyed
  }

  handleImageError(event: any) {
    event.target.src = 'assets/placeholder-image.jpg'; // Path to a default placeholder image
  }
}
