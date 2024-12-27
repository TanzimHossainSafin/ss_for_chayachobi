import mongoose, { Model,Schema } from "mongoose";
const userSchema=new Schema({
    username:{type:String,require:true,unique:true},
    password:{type:String,require:true}
});
export const userModel = mongoose.model("User", userSchema);
const contentSchema=new Schema({
    link:String,
    type:String,
    userId:[{type:mongoose.Types.ObjectId,ref:"User",required:true}],
    tag:[{type:mongoose.Types.ObjectId,ref:"Tag"}]
})
export const contentModel=mongoose.model("Content",contentSchema)