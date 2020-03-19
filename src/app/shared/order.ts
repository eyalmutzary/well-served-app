export class Order{
    constructor(
        public orderStatus: number, // 0 - waiting to confirm, 1 - getting ready, 2 - ready, 3 - done
        public orderSum: number,
        public productsList?: [{position: number, title: string, price: number, note: string}], //array of products
        public orderId?: string,
        public waiterId?: string
        ) {}
}