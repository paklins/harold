import { Component, HostListener, ElementRef } from '@angular/core';
import { Table } from './shared/models/table';

@Component({
    selector: 'au-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    title = 'harold';
    private debugMode: boolean = false;

    public table: Table;

    @HostListener('document:contextmenu', ['$event'])
    public onRightClick(event: any): boolean
    {
        const target: ElementRef = event.target;

        return !this.debugMode;
    }

    constructor()
    {
        this.table = new Table();

        this.table.addColumn("test");
        this.table.addColumn("test2");

        let data: any[] = [];

        for (let index = 1; index < 1261; index+=2) {
            data.push({ "test": index, "test2": index + 1 });
        }

        this.table.upload(data);
    }
}
