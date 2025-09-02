import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, AnimateOnScrollDirective], // ← added
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class LandingComponent {
  /** Feature tiles displayed on the landing page */
  features = [
    { img: '/assets/images/agi.png',          title: 'AGI Safety & Transparency' },
    { img: '/assets/images/experimental.png', title: 'Experimental AI Models' },
    { img: '/assets/images/datasets.png',     title: 'Open Datasets & Evaluation Tools' },
    { img: '/assets/images/challenges.png',   title: 'Open Research Challenges' },
    { img: '/assets/images/collab.png',       title: 'Academic Collaborations' },
    { img: '/assets/images/ethics.png',       title: 'Ethics & Governance' },
  ];

  /** FAQ list + open/close state */
  openId: number | null = null;
  faqs = [
    {
      q: 'What is Violetis® Workplace HR Management?',
      a: 'A unified platform for employee records, attendance, leaves, payroll-ready exports, and workflows—built to scale with your org.'
    },
    {
      q: 'How secure is my employee data?',
      a: 'Data is encrypted in transit and at rest. RBAC, audit trails, and SSO keep access tightly controlled.'
    },
    {
      q: 'Can it integrate with other tools we already use?',
      a: 'Yes—connect calendars, email, WhatsApp, accounting, and more via native integrations and REST APIs.'
    },
    {
      q: 'Do I need technical expertise to set it up?',
      a: 'No. Guided onboarding and sensible defaults help you go live quickly. Our team can assist with migration.'
    }
  ];

  /** Toggle FAQ item open/closed */
  toggle(i: number) {
    this.openId = this.openId === i ? null : i;
  }

  /** Modal state for feature details */
  open = false;
  selectedIndex: number | null = null;

  /** Currently selected feature (if any) */
  get selectedFeature() {
    return this.selectedIndex !== null ? this.features[this.selectedIndex] : null;
  }

  /** Open modal for selected feature */
  openFeature(i: number) {
    this.selectedIndex = i;
    this.open = true;
  }

  /** Close modal and reset state */
  closeModal() {
    this.open = false;
    this.selectedIndex = null;
  }
}
