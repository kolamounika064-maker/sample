import {
  Component, AfterViewInit,
  ViewChild, ViewChildren, ElementRef, QueryList,
  signal, Inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements AfterViewInit {
  // Reactive state
  mobileOpen = signal(false);

  private readonly isBrowser: boolean;

  // Template refs
  @ViewChild('indicator', { static: false }) indicatorRef?: ElementRef<HTMLElement>;
  @ViewChild('menu',      { static: false }) menuRef?: ElementRef<HTMLElement>;
  @ViewChildren('navLink') links?: QueryList<ElementRef<HTMLAnchorElement>>;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          this.mobileOpen.set(false);
          setTimeout(() => this.snapIndicatorToActive(), 0);
        });
    }
  }

  // Lifecycle
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    setTimeout(() => this.snapIndicatorToActive(), 0);
    window.addEventListener('resize', this.onResize, { passive: true });
  }

  private onResize = () => {
    if (!this.isBrowser) return;
    this.snapIndicatorToActive();
  };

  // Public API (template)
  toggleMobile() {
    this.mobileOpen.update(v => !v);
  }

  closeMobile() {
    this.mobileOpen.set(false);
  }

  // Indicator helpers
  private getActiveLink(): HTMLAnchorElement | null {
    const els = this.links?.map(l => l.nativeElement) ?? [];
    if (!els.length) return null;
    return els.find(el => el.classList.contains('is-active'))
        ?? els.find(el => el.classList.contains('emph'))
        ?? els[0]
        ?? null;
  }

  private canMoveIndicator(el: HTMLElement | null): el is HTMLElement {
    return !!(this.isBrowser && el && this.indicatorRef?.nativeElement && this.menuRef?.nativeElement);
  }

  private hasRects(menu: HTMLElement, el: HTMLElement) {
    const m = menu.getBoundingClientRect?.();
    const b = el.getBoundingClientRect?.();
    return m && b ? { menuBox: m, box: b } : null;
  }

  private setIndicatorTransition(indicator: HTMLElement, animate: boolean) {
    indicator.style.transition = animate
      ? `transform var(--nav-speed) var(--nav-ease), width var(--nav-speed) var(--nav-ease), opacity .2s ease`
      : 'none';
  }

  private moveIndicatorTo(el: HTMLElement | null, animate = true) {
    if (!this.canMoveIndicator(el)) return;

    const indicator = this.indicatorRef!.nativeElement;
    const menu = this.menuRef!.nativeElement;

    const rects = this.hasRects(menu, el);
    if (!rects) return;

    const left = Math.max(0, rects.box.left - rects.menuBox.left);
    const width = Math.max(12, rects.box.width);

    this.setIndicatorTransition(indicator, animate);
    indicator.style.opacity = '1';
    indicator.style.width = `${width}px`;
    indicator.style.transform = `translate3d(${left}px, 0, 0)`;
  }

  private snapIndicatorToActive() {
    this.moveIndicatorTo(this.getActiveLink(), false);
    if (this.isBrowser) {
      requestAnimationFrame(() => {
        const indicator = this.indicatorRef?.nativeElement;
        if (indicator) indicator.style.transition = '';
      });
    }
  }

  hoverIndicator(ev: MouseEvent) {
    if (!this.isBrowser) return;
    const target = ev.currentTarget as HTMLElement | null;
    this.moveIndicatorTo(target, true);
  }

  unhoverIndicator() {
    this.moveIndicatorTo(this.getActiveLink(), true);
  }
}
