import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'au-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit
{
    @Input()
    public icon: string;

    @Input()
    public noSpace: boolean;

    @Input()
    public transparent: boolean;

    @Input()
    public text: string;

    @Input()
    public hidden: boolean;

    @Input()
    public rotatedIcon: boolean;

    constructor(){}

    ngOnInit()
    {}

    public layoutClasses(): object
    {
        let classes: object = 
        {
            'au-button-layout': !this.noSpace,
            'au-layout-no-space': this.noSpace,
            'au-layout-transparent': this.transparent,
            'au-layout-hidden': this.hidden
        };

        return classes;
    }

    public iconClasses(): object
    {
        let classes: object = 
        {
            'au-button-icon': true,
            'au-button-rotated-icon': this.rotatedIcon
        };

        return classes;
    }
}
