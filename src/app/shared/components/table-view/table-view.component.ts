import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Table } from '../../models/table';
import { TableRow } from '../../models/table-row';

@Component({
    selector: 'au-table-view',
    templateUrl: './table-view.component.html',
    styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, AfterViewInit
{
    private hoveredRowId: number;
    private selectedRowId: number;
    private virtualRows: TableRow[];

    @Input()
    public source: Table;

    @ViewChild('table')
    public table: ElementRef;

    @ViewChild('tableHeader')
    public theader: ElementRef;

    @ViewChild('tableBody')
    public tbody: ElementRef;

    public get Rows(): TableRow[]
    {
        return this.virtualRows;
    }

    constructor()
    {
        this.virtualRows = [];
    }

    private moveNextVirtualRow(): number
    {
        let rowId: number;

        if(this.virtualRows.length)
        {
            const lastVirtualRow: TableRow = this.virtualRows[this.virtualRows.length - 1];
            const lastRow: TableRow = this.source.Rows[this.source.Rows.length - 1];

            if (lastVirtualRow && lastRow && lastVirtualRow.id < lastRow.id)
            {
                const nextRow: TableRow = this.source.findRowById(lastVirtualRow.id + 1);

                if (nextRow)
                {
                    this.virtualRows.splice(0, 1);
                    this.virtualRows.push(nextRow);

                    rowId = nextRow.id;
                }
            }
        }

        return rowId;
    }

    private movePrevVirtualRow(): number
    {
        let rowId: number;

        if(this.virtualRows.length)
        {
            const firstVirtualRow: TableRow = this.virtualRows[0];
            const firstRow: TableRow = this.source.Rows[0];

            if (firstVirtualRow && firstRow && firstVirtualRow.id > firstRow.id)
            {
                const prevRow: TableRow = this.source.findRowById(firstVirtualRow.id - 1);

                if (prevRow)
                {
                    this.virtualRows.splice(this.virtualRows.length - 1, 1);
                    this.virtualRows.unshift(prevRow);

                    rowId = prevRow.id;
                }
            }
        }

        return rowId;
    }

    public ngOnInit(): void
    {
        if(this.source)
        {
            this.virtualRows = this.source.Rows.slice(0, 40);
        }
    }

    public ngAfterViewInit(): void
    {
        const headerHeight: number = this.theader.nativeElement.clientHeight;
        const tableStyle: any = this.table.nativeElement.currentStyle 
            || window.getComputedStyle(this.table.nativeElement);

        if(tableStyle)
        {
            
            this.theader.nativeElement.style.width =
                `calc(100% 
                    - ${tableStyle.marginLeft} 
                    - ${tableStyle.marginRight}
                    - ${tableStyle.borderLeftWidth} 
                    - ${tableStyle.borderRightWidth})`;
        }

        this.tbody.nativeElement.style.marginTop = headerHeight + "px";
    }

    public tableBodyScroll(event: any): void
    {
        const scrollableElement: any = event.target;
        const currentScroll: number = scrollableElement.clientHeight + scrollableElement.scrollTop;

        if(scrollableElement.scrollTop === 0)
        {
            if(this.movePrevVirtualRow() !== undefined)
            {
                scrollableElement.scrollTop = 1;
            }
        }
        else if(currentScroll === scrollableElement.scrollHeight)
        {
            this.moveNextVirtualRow();
        }
    }

    public rowMouseOver(rowId: number): void
    {
        this.hoveredRowId = rowId;
    }

    public rowSelect(rowId: number): void
    {
        this.selectedRowId = this.selectedRowId === rowId ? undefined : rowId;
    }

    public rowClasses(rowId: number): object
    {
        const isSelectedRow: boolean = (this.selectedRowId === rowId);

        let classes: object = 
        {
            'au-body-row-hovered': !isSelectedRow && this.hoveredRowId === rowId,
            'au-body-row-selected': isSelectedRow
        };

        return classes;
    }

    public cellClasses(rowId: number): object
    {
        const isSelectedRow: boolean = (this.selectedRowId === rowId);

        let classes: object = 
        {
            'au-body-cell-hovered': !isSelectedRow && this.hoveredRowId === rowId,
            'au-body-cell-selected': isSelectedRow
        };

        return classes;
    }
}