import { TableColumn } from './table-column';
import { TableColumnType } from './table-column-type';
import { TableRow } from './table-row';
import { TableCell } from './table-cell';

export class Table
{
    private columns: TableColumn[];
    private rows: TableRow[];
    private columnsIds: { [name: string]: number } = {};
    
    private rowId: number = 0;

    public get Columns(): TableColumn[]
    {
        return this.columns;
    }

    public get Rows(): TableRow[]
    {
        return this.rows;
    }

    constructor()
    {
        this.columns = [];
        this.rows = [];
    }

    private getColumnId(): number
    {
        return this.columns.length;
    }

    private getRowId(): number
    {
        return ++this.rowId;
    }

    private newCell(columnId: number, rowCellId: number, row: any, index: any): TableCell
    {
        let cell: TableCell = new TableCell();
        cell.columnId = columnId;
        cell.id = rowCellId + columnId;
        cell.value = row[index];

        return cell;
    }

    private newRow(): TableRow
    {
        let row: TableRow = new TableRow();
        row.id = this.getRowId();
        row.cells = [];

        return row;
    }

    public addColumn(name: string, header: string = "", type: TableColumnType = TableColumnType.String): void
    {
        let column: TableColumn = new TableColumn();
        column.id = this.getColumnId();
        column.name = name;
        column.header = header.length ? header : name;
        column.type = type;

        this.columnsIds[name] = column.id;

        this.columns.push(column);
    }

    public findRowById(id: number, length: number = 1): TableRow[]
    {
        let maxRows: number = id + length;
        const rows: TableRow[] = this.rows.filter(row => row.id >= id && row.id < maxRows);

        return rows;
    }

    public addRow(row: any): void
    {
        let newRow: TableRow = this.newRow();

        let rowCellId: number = newRow.id * 10;

        if(typeof row === 'object')
        {
            let properties = Object.getOwnPropertyNames(row);

            for (let index = 0; index < properties.length; index++) {
                const columnName: string = properties[index];
                const columnId: number = this.columnsIds[columnName];

                if(columnId === undefined)
                {
                    throw new Error(`Unhandled column name "${columnName}"`);
                }

                newRow.cells[columnId] = this.newCell(columnId, rowCellId, row, columnName);
            }
        }
        else
        {
            for (let index = 0; index < row.length; index++)
            {
                newRow.cells.push(this.newCell(index, rowCellId, row, index));
            }
        }

        if(newRow.cells.length)
        {
            this.rows.push(newRow);
        }
    }

    public upload(data: any): void
    {
        if(data instanceof Array)
        {
            for (let index = 0; index < data.length; index++) {
                const row = data[index];
                
                this.addRow(row);
            }
        }
    }
}
