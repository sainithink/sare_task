const http = require('http');
const db = require('../models/index');
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../Utils/apiResponse");
const moment = require('moment');
const multer = require('multer');
const path = require('path');




exports.add_category = [
    // validate movie_title
	async (req, res) => {
		try {
            let category  = await db.category.create(req.body);
            if (category ) {
                 return apiResponse.successResponseWithData(res,"Added Success.", category);
            }else{
                return apiResponse.ErrorResponse(res, "error unable to create customer")
            }
		} catch (error) {
			return apiResponse.ErrorResponse(res, error);
		}
	}];

exports.list_category =[async(req,res) => {
	try {
		let category = await db.category.find();
		if (category.length>0) {
			return apiResponse.successResponseWithData(res,"Categories Foud Success.", category);
		}else{
			return apiResponse.notFoundResponse(res,"No Categories found")
		}
	} catch (error) {
		return apiResponse.ErrorResponse(res, error);
	}
}]






