export class Table{
    constructor(
        public tableId: string,
        public diners: number, // if 0 - table is empty
        public ordersList, // list of all orders of the table
        public tableSum: number, // total bill
        public waiterId: string
        ) {}
}