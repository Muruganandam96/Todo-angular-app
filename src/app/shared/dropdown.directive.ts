import { asNativeElements, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    constructor(private elRef: ElementRef) {
    }

    @HostBinding('class.active') isActive = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event): void {
        this.isActive = this.elRef.nativeElement.contains(event.target) ? !this.isActive : false;
    }
}
