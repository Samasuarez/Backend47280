import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const cartSchema = new Schema({
    products: [{
        id_prod: {
            type: Schema.Types.ObjectId, 
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true 
        }
    }]
})
cartSchema.plugin(mongoosePaginate)
const cartModel = model('carts', cartSchema)
export default cartModel