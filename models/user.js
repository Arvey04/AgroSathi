const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required : true,
		trim:true
	},
	password:{
		type:String,
	
		unique:true,
		trim:true,
		required : true
	
	},
	email:{
		type:String,
		required : true,
		unique:true,
		
	},
	phoneno:{
		type:String,
		required : true
	},
	
	
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = {  User };