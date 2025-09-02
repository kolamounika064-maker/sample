import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // initial state for CSS reveal
    this.renderer.addClass(this.el.nativeElement, 'before-animate');

    // On the server, bail out (no IntersectionObserver).
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      // Optional: make SSR markup already "revealed" to avoid flash/mismatch.
      // If you prefer reveal only on client, comment the next line.
      this.renderer.addClass(this.el.nativeElement, 'animate');
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'animate');
            this.observer?.unobserve(this.el.nativeElement);
          }
        }
      },
      { threshold: 0.2 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
