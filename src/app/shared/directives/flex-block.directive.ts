import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[auFlexBlock]'
})
export class FlexBlockDirective implements OnInit
{
    private element: ElementRef;

    @Input()
    public auFlexBlock: any;

    constructor(element: ElementRef)
    {
        this.element = element;
    }

    public ngOnInit(): void
    {
        this.element.nativeElement.style.flex = 1;
        this.element.nativeElement.style.display="flex";

        if(this.auFlexBlock === "vertical")
        {
            this.element.nativeElement.style.flexDirection = "column";
        }
        else
        {
            this.element.nativeElement.style.flexDirection = "row";
        }
    }
}
