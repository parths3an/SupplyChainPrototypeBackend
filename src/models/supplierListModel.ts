import { Schema, model } from 'mongoose';

let SupplierListSchema: Schema = new Schema({
name: 
{
type: String, 
required: true
},
price: { 
	type: Number
},
date:
{
	 type: Date 
	}
});
export default model('SupplierList', SupplierListSchema);
