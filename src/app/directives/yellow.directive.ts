import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[yellow]',
    standalone: true
})

export class YellowDirective {
    color = '';

    @HostBinding('style.backgroundColor')
    get backgroundColor() {
        return this.color;
    }

    @HostListener('mouseenter')
    mouseenter() {
        this.color = 'yellow';
    }

    @HostListener('mouseleave')
    mouseleave() {
        this.color = '';
    }
}