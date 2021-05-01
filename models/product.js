const mongoose = require('mongoose');
const validator = require('validator');
const AppError = require('../Utils/appError');

const ProductSchema = new mongoose.Schema({
    product_name:String,
	product_id:String,
	category:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
      },
	price:Number,
	variant:[
		{	color_variant:String,
			size_variant:Array,
			quantity:Array
		}
	],	
	weight:String,
	delivery_charge:Number,
	 
	
},{
  timestamps: true
});

module.exports = mongoose.model('product', ProductSchema);
