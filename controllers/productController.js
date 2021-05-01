const http = require('http');
const db = require('../models/index');
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../Utils/apiResponse");
const moment = require('moment');
const multer = require('multer');
const path = require('path');








exports.add_product= [
    // validate movie_title
	async (req, res) => {
		try {
            let add_product  = await db.product.create(req.body);
            if (add_product ) {
                 return apiResponse.successResponseWithData(res,"Added Success.", add_product);
            }else{
                return apiResponse.ErrorResponse(res, "error unable to create product")
            }
		} catch (error) {
			return apiResponse.ErrorResponse(res, error);
		}
	}];

exports.cart_product = [ async(req,res) => {
	try {
		let _id = req.params.id;
		let product_list = await db.product.findOne({_id:_id})
		let category_name = await db.category.findOne({_id:product_list.category});
		let data ={
			product_name:product_list.product_name,
			category_name:category_name.category_name,
			product_id:product_list.product_id,
			original_price:product_list.price
		}
		for (let i = 0; i < product_list.variant.length; i++) {
		// for (let i = 0; i < product_list.variant[j].color_variant.length; i++) {			
			if (req.query.color_variant == product_list.variant[i].color_variant) {
				data.color_variant = product_list.variant[i].color_variant
				data.size_variant = product_list.variant[i].size_variant[i]
				data.quantity = product_list.variant[i].quantity[i]
			}
		// }			
	}
	if (data.quantity >= 25 && product_list.price > 100) {
		data.price = product_list.price - 100
		
		data.delivery_charge = product_list.delivery_charge * data.quantity
	}
	else if(data.quantity >= 20 && product_list.price > 80){
		data.price = product_list.price - 80
		data.delivery_charge = product_list.delivery_charge * data.quantity
	}
	else if(data.quantity >= 15 && product_list.price > 60){
		data.price = product_list.price - 60
		data.delivery_charge = product_list.delivery_charge * data.quantity
	}
	else if(data.quantity >= 10 && product_list.price > 40){
		data.price = product_list.price - 40
		data.delivery_charge = product_list.delivery_charge * data.quantity
	}else if(data.quantity >= 5 && product_list.price > 20){
		data.price = product_list.price - 20
		data.delivery_charge = product_list.delivery_charge * data.quantity
	}
	else{
		
		data.price = product_list.price
		data.delivery_charge = product_list.delivery_charge * data.quantity
	}
	return apiResponse.successResponseWithData(res,"Found.", data);

	} catch (error) {
		return apiResponse.ErrorResponse(res, error);
	}
}]

exports.list_product =[async(req,res) => {
	try {
		let data;
		if (req.query.category) {
		data = await db.product.find({"category":req.query.category});
		}if (req.query.price) {
			data = await db.product.find({"price":req.query.price});
		}if (req.query.size) {
			data = await db.product.find({"variant.size_variant":req.query.size});
		}if (req.query.quantity) {
			data = await db.product.find({"variant.quantity":req.query.quantity});
		}		
		if (data.length>0) {
			return apiResponse.successResponseWithData(res,"Categories Foud Success.", data);
		}else{
			return apiResponse.notFoundResponse(res,"Nothing found")
		}
	} catch (error) {
		return apiResponse.ErrorResponse(res, error);
	}
}]






