import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'au-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit
{
    @Input()
    public source: string = '';

    constructor(){ }

    ngOnInit(){}
}
