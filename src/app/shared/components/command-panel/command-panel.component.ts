import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'au-command-panel',
  templateUrl: './command-panel.component.html',
  styleUrls: ['./command-panel.component.scss']
})
export class CommandPanelComponent implements OnInit, AfterViewInit {

    private bindingSideClass: string = '';

    @Input()
    public direction: string;

    @Input()
    public bindingSide: string;

    constructor() { }

    ngOnInit()
    {
    }

    public ngAfterViewInit(): void
    {
        if(this.bindingSide === 'left')
        {
            this.bindingSideClass = 'au-command-panel-binding-left'
        }
        else if(this.bindingSide === 'rigth')
        {
            this.bindingSideClass = 'au-command-panel-binding-right';
        }
        else if(this.bindingSide === 'top')
        {
            this.bindingSideClass = 'au-command-panel-binding-top';
        }
        else if(this.bindingSide === 'bottom')
        {
            this.bindingSideClass = 'au-command-panel-binding-bottom';
        }
    }

    public panelClasses(): object
    {
        let classes: object = 
        {
            'au-command-panel-vertical': this.direction === 'vertical',
            'au-command-panel-horizontal': this.direction !== 'vertical'
        }

        if(this.bindingSideClass)
        {
            classes[this.bindingSideClass] = true;
        }

        return classes;
    }
}
