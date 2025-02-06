import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[red]',
    standalone: true
})

export class RedDirective {
    color = 'red';
    textTransform = 'lowercase';

    @HostBinding('style.backgroundColor')
    get backgroundColor() {
        return this.color;
    }

    @HostBinding('style.textTransform')
    get textTransformGetter() {
        return this.textTransform;
    }


    @HostListener('mouseenter')
    mouseenter() {
        this.color = 'red';
        this.textTransform = 'uppercase';
        console.log('red');
    }

    @HostListener('mouseleave')
    mouseleave() {
        this.color = 'black';
        this.textTransform = 'lowercase';
        console.log('white');
    }
} 