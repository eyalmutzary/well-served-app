export class Product{
    constructor(
        public title: string, // unique
        public price: number,
        public category: string,
        public imageUrl: string, // url
        public status: boolean = true, // true = in-stock, false = out of order
        public description?: string,
    ) {}
}