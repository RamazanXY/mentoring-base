import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[hover-shadow]',
    standalone: true
})

export class HoverShadowDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
        console.log('HoverShadowDirective');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');
    }
}