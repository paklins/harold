import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'au-command-panel',
  templateUrl: './command-panel.component.html',
  styleUrls: ['./command-panel.component.scss']
})
export class CommandPanelComponent implements OnInit {

    @Input()
    public direction: string;

    constructor() { }

    ngOnInit()
    {
    }

    public panelClasses(): object
    {
        let classes: object = 
        {
            'au-command-panel-vertical': this.direction === 'vertical',
            'au-command-panel-horizontal': this.direction !== 'vertical'
        }

        return classes;
    }
}
