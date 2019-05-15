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
    public text: string;

    constructor(){}

    ngOnInit(){}
}
