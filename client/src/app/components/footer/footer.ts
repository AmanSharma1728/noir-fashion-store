import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  // Fake list of social links
  socials = [
    { name: 'INSTAGRAM', url: '#' },
    { name: 'TIKTOK', url: '#' },
    { name: 'TWITTER', url: '#' }
  ];
}