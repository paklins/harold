import { TableColumnType } from './table-column-type';

export class TableColumn
{
    public id: number = -1;
    public name: string;
    public header: string;
    public type: TableColumnType;
    public sortable: boolean = false;
    public sortType: string = 'asc';
}
