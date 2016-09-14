import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
    selector: '[MathJax]'
})

export class MathJaxDirective implements OnChanges {
    @Input() MathJax: string;

    constructor(private elementRef: ElementRef) { }

    ngOnChanges() {
        let MathJax = window['MathJax'];
        this.elementRef.nativeElement.innerHTML = this.MathJax;
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.elementRef.nativeElement]);
    }
}
