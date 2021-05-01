const mongoose = require('mongoose');
const validator = require('validator');
const AppError = require('../Utils/appError');

const CategorySchema = new mongoose.Schema({
    category_name:String,
	category_id:String,
},{
  timestamps: true
});

module.exports = mongoose.model('category', CategorySchema);
