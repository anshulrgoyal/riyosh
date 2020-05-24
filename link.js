const {Schema,model}= require("mongoose")

const sch=new Schema({
    code:String,
    language:String,
    shortId:String
})

module.exports=model("links",sch)