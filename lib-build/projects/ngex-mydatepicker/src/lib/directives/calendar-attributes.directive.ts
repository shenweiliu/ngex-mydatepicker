import {Directive, ElementRef, AfterViewInit, Input} from "@angular/core";

@Directive({
    selector: "[calendarAttributes]"
})
export class CalendarAttributesDirective implements AfterViewInit {
    @Input() calendarAttributes!: any;

    constructor(private el: ElementRef) { }

    ngAfterViewInit(): void {
        const { inline, selectorHeight, selectorWidth, selectorPos } = this.calendarAttributes;
        const {style} = this.el.nativeElement;
    
        style.height = selectorHeight;
        style.width = selectorWidth;
        style.top = !inline ? selectorPos.top : "0";
        style.left = !inline ? selectorPos.left : "0";
    }
}
