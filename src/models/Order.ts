const Orders = [{id: 1, user_id: 2, products_id: [], status: 1, amount: 2}];

export class Order {

    id: number;
    user_id: number;
    status: number;
    amount: number;


    find(id: number){
        const order =  Orders.find(order => order.id === id);

        if(order){
            this.id = order.id;
            this.amount = order.amount;
            this.status = order.status;
            this.user_id = order.user_id;

            return this;
        }

        return null;
    }
}